
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COMMUNITY_POSTS, MOCK_USER } from '../constants';
import { ChevronLeft, Send, ChevronRight } from 'lucide-react';
import { Comment, User, CommunityPost, ItineraryDay } from '../types';
import ItineraryItemCard from '../components/itinerary/ItineraryItem';
import ImageGalleryModal from '../components/common/ImageGalleryModal';

// Comment Section
const CommentSection: React.FC<{
    comments: Comment[];
    onAddComment: (text: string) => void;
    currentUser: User;
}> = ({ comments, onAddComment, currentUser }) => {
    const [newComment, setNewComment] = useState('');
    const commentsEndRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [comments]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg w-full flex flex-col h-full">
            <div className="p-4 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold text-white mb-4">댓글 ({comments.length})</h2>
                <form onSubmit={handleSubmit} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                        {currentUser.name.charAt(0)}
                    </div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        className="w-full bg-slate-700 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                        rows={2}
                        autoComplete="off"
                        aria-label="새 댓글 입력"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2.5 transition-colors flex-shrink-0 disabled:bg-slate-600 h-10"
                        disabled={!newComment.trim()}
                        aria-label="댓글 보내기"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                        <p>아직 댓글이 없습니다.</p>
                        <p className="text-sm mt-1">가장 먼저 댓글을 남겨보세요!</p>
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm mr-3 flex-shrink-0">
                                {comment.user.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm mb-1 text-white">{comment.user.name}</p>
                                <p className="text-gray-300 text-sm break-words">{comment.text}</p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={commentsEndRef} />
            </main>
        </div>
    );
};


const ItineraryReviewDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const initialPost = MOCK_COMMUNITY_POSTS.find(p => p.id === postId);

    const [post, setPost] = useState(initialPost);
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const checkScrollButtons = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const isScrollable = el.scrollWidth > el.clientWidth;
            setShowLeftScroll(isScrollable && el.scrollLeft > 5);
            setShowRightScroll(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
        }
    }, []);

    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            checkScrollButtons();
            scrollContainer.addEventListener('scroll', checkScrollButtons, { passive: true });
            const resizeObserver = new ResizeObserver(checkScrollButtons);
            resizeObserver.observe(scrollContainer);

            return () => {
                scrollContainer.removeEventListener('scroll', checkScrollButtons);
                resizeObserver.disconnect();
            };
        }
    }, [post, checkScrollButtons]);

    const handleScroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.7;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    useEffect(() => {
        const mainContainer = document.querySelector('main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
    }, [postId]);

    const handleAddComment = (text: string) => {
        if (!text.trim() || !post) return;
        const newComment: Comment = {
            id: String(Date.now()),
            user: MOCK_USER,
            text: text.trim(),
            timestamp: new Date().toISOString(),
        };
        setPost(prevPost => {
            if (!prevPost) return undefined;
            return {
                ...prevPost,
                comments: [...prevPost.comments, newComment],
            };
        });
    };

    const handleOpenGallery = (images: string[], startIndex: number) => {
        setGalleryImages(images);
        setGalleryStartIndex(startIndex);
        setIsGalleryOpen(true);
    };

    if (!post || !post.trip) {
        return (
            <div className="text-center text-white py-20">
                <h2 className="text-2xl font-bold">포스트를 찾을 수 없습니다.</h2>
                <Link to="/app/itinerary-review" className="mt-4 inline-block text-blue-400 hover:underline">
                    목록으로 돌아가기
                </Link>
            </div>
        );
    }
    
    const formatDateForTab = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const dayOfMonth = date.getDate();
        const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date).replace('요일','');
        return `${month}/${dayOfMonth}(${dayOfWeek})`;
    };
    
    const { trip } = post;
    const activeDay: ItineraryDay | undefined = trip.itinerary[activeDayIndex];
    
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="mb-8">
                <Link to="/app/itinerary-review" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    일정 조언/평가 목록으로
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12">
                {/* Main Content */}
                <article className="w-full lg:flex-1 lg:max-w-[66.666%]">
                    <header className="mb-6">
                         <p className="text-gray-400 mb-2">
                            {trip.destination} {trip.startDate} ~ {trip.endDate}
                        </p>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gray-300 mr-1 text-sm">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="font-semibold text-white">{post.author.name}</span>
                            <span className="text-sm text-gray-400 ml-3">{post.createdAt}</span>
                        </div>
                    </header>

                    {post.content && (
                        <p className="text-gray-300 leading-relaxed">{post.content}</p>
                    )}

                    {/* Itinerary Section */}
                    <div className="mt-12">
                        <div className="relative mb-6">
                            <div className="bg-slate-800 rounded-full p-1.5 flex items-center w-full">
                                {showLeftScroll && (
                                    <button 
                                        onClick={() => handleScroll('left')}
                                        className="hidden md:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-slate-700 transition-colors"
                                        aria-label="이전 날짜로 스크롤"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                )}
                                <div 
                                    ref={scrollContainerRef}
                                    className="flex-grow flex items-center overflow-x-auto no-scrollbar space-x-1"
                                >
                                    {trip.itinerary.map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveDayIndex(index)}
                                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                                activeDayIndex === index
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'text-gray-400 hover:text-white hover:bg-slate-700/60'
                                            }`}
                                        >
                                            {formatDateForTab(day.date)}
                                        </button>
                                    ))}
                                </div>
                                {showRightScroll && (
                                    <button 
                                        onClick={() => handleScroll('right')}
                                        className="hidden md:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-slate-700 transition-colors"
                                        aria-label="다음 날짜로 스크롤"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            {activeDay && activeDay.items.length > 0 ? (
                                 <div className="space-y-4">
                                    {activeDay.items.map(item => (
                                        <ItineraryItemCard key={item.id} item={item} onOpenGallery={handleOpenGallery} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-slate-800 rounded-lg">
                                    <p className="text-gray-400">이 날짜에 대한 일정이 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </article>

                {/* Comment Section */}
                <aside className="w-full lg:w-1/3 mt-12 lg:mt-0">
                    <div className="sticky top-8 h-[calc(100vh-4rem-2rem)]">
                        <CommentSection
                            comments={post.comments || []}
                            onAddComment={handleAddComment}
                            currentUser={MOCK_USER}
                        />
                    </div>
                </aside>
            </div>

            <ImageGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={galleryImages}
                startIndex={galleryStartIndex}
            />
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default ItineraryReviewDetail;