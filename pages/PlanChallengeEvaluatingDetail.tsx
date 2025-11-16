
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_USER, CATEGORY_ICONS } from '../constants';
import { ChevronLeft, Send, ChevronRight, ThumbsUp, CalendarDays, MapPin, Users, Clock, Trophy, Award } from 'lucide-react';
import { Comment, User, ItineraryDay, ItineraryItem, Category } from '../types';
import ItineraryItemCard from '../components/itinerary/ItineraryItem';
import ImageGalleryModal from '../components/common/ImageGalleryModal';


const MOCK_EVALUATING_PLANS_DETAILS = [
    {
        id: 'eval-1',
        title: '단풍과 함께하는 교토 3박 4일',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://imgcp.aacdn.jp/img-a/1440/auto/global-aaj-front/article/2016/10/5801c7626c1d2_5801c746564cc_1104936929.png',
        author: { name: '김여행', email: 'traveler.kim@example.com', avatar: 'https://i.pravatar.cc/150?u=traveler.kim@example.com' },
        votes: 128,
        itinerary: [
          { date: '2024-11-19', items: [{ id: '1-1', time: '14:00', category: Category.Transport, title: '간사이 공항 도착', description: '하루카 티켓 구매 후 교토로 이동' }, { id: '1-2', time: '16:00', category: Category.Lodging, title: '교토역 근처 호텔 체크인', description: '짐 풀고 잠시 휴식' }] },
          { date: '2024-11-20', items: [{ id: '2-1', time: '09:00', category: Category.Place, title: '기요미즈데라 & 산넨자카', description: '단풍이 아름다운 청수사와 주변 거리 산책' }, { id: '2-2', time: '13:00', category: Category.Meal, title: '점심: 두부 요리', description: '전통적인 교토의 맛' }, { id: '2-3', time: '15:00', category: Category.Place, title: '아라시야마 치쿠린', description: '대나무 숲에서 힐링 타임' }] },
          { date: '2024-11-21', items: [{ id: '3-1', time: '10:00', category: Category.Place, title: '금각사(킨카쿠지)', description: '황금빛으로 빛나는 사찰 감상' }, { id: '3-2', time: '12:00', category: Category.Shopping, title: '니시키 시장', description: '교토의 부엌 구경 및 길거리 음식' }] },
          { date: '2024-11-22', items: [{ id: '4-1', time: '10:00', category: Category.Transport, title: '간사이 공항으로 이동' }] },
        ],
        comments: [
            { id: 'c1', user: { name: '박서준', email: 'seojun@example.com', avatar: 'https://i.pravatar.cc/150?u=seojun@example.com' }, text: '단풍 시즌에 딱 맞는 완벽한 일정이네요! 저도 가을에 교토가는데 참고할게요~', timestamp: new Date('2024-10-20T10:00:00Z').toISOString() },
        ]
    },
    {
        id: 'eval-2',
        title: '교토 미식 탐방: 숨겨진 맛집을 찾아서',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/2656/article_350912_w640z.jpg',
        author: { name: '이맛잘', email: 'foodie.lee@example.com', avatar: 'https://i.pravatar.cc/150?u=foodie.lee@example.com' },
        votes: 95,
        itinerary: [],
        comments: []
    },
     {
        id: 'eval-3',
        title: '자전거로 즐기는 교토의 가을',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://digjapan.travel/files/topics/7910_ext_02_2.jpg',
        author: { name: '박라이더', email: 'rider.park@example.com', avatar: 'https://i.pravatar.cc/150?u=rider.park@example.com' },
        votes: 72,
        itinerary: [],
        comments: []
    },
    {
        id: 'eval-4',
        title: '교토의 고즈넉한 사찰 순례',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://t1.daumcdn.net/brunch/service/user/3fy/image/tMUlbNs-YpiFJmSbY-Zd_3lKoVA.jpeg',
        author: MOCK_USER,
        votes: 54,
        itinerary: [],
        comments: []
    },
];

const CommentSection: React.FC<{ comments: Comment[]; onAddComment: (text: string) => void; currentUser: User; }> = ({ comments, onAddComment, currentUser }) => {
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
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글을 입력하세요..." className="w-full bg-slate-700 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm" rows={2} autoComplete="off" aria-label="새 댓글 입력" />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2.5 transition-colors flex-shrink-0 disabled:bg-slate-600 h-10" disabled={!newComment.trim()} aria-label="댓글 보내기">
                        <Send size={18} />
                    </button>
                </form>
            </div>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                        <p>아직 댓글이 없습니다.</p><p className="text-sm mt-1">가장 먼저 댓글을 남겨보세요!</p>
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

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 mr-4 mt-1">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);


const PlanChallengeEvaluatingDetail: React.FC = () => {
    const { planId } = useParams<{ planId: string }>();
    const initialPlan = MOCK_EVALUATING_PLANS_DETAILS.find(p => p.id === planId);

    const [plan, setPlan] = useState(initialPlan);
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [isRecommended, setIsRecommended] = useState(false);
    
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
    }, [plan, checkScrollButtons]);

    const handleScroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            el.scrollBy({ left: direction === 'left' ? -el.clientWidth * 0.7 : el.clientWidth * 0.7, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const mainContainer = document.querySelector('main');
        if (mainContainer) mainContainer.scrollTop = 0;
    }, [planId]);

    const handleAddComment = (text: string) => {
        if (!text.trim() || !plan) return;
        const newComment: Comment = {
            id: String(Date.now()),
            user: MOCK_USER,
            text: text.trim(),
            timestamp: new Date().toISOString(),
        };
        setPlan(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : undefined);
    };

    const handleRecommend = () => {
        if (!plan) return;
        setPlan(prev => {
            if (!prev) return undefined;
            return { ...prev, votes: isRecommended ? prev.votes - 1 : prev.votes + 1 };
        });
        setIsRecommended(!isRecommended);
    };

    const handleOpenGallery = (images: string[], startIndex: number) => {
        setGalleryImages(images);
        setGalleryStartIndex(startIndex);
        setIsGalleryOpen(true);
    };

    if (!plan) {
        return (
            <div className="text-center text-white py-20">
                <h2 className="text-2xl font-bold">플랜을 찾을 수 없습니다.</h2>
                <Link to="/app/plan-challenge/evaluating" className="mt-4 inline-block text-blue-400 hover:underline">목록으로 돌아가기</Link>
            </div>
        );
    }
    
    const formatDateForTab = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}(${new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date).replace('요일','')})`;
    };
    
    const activeDay: ItineraryDay | undefined = plan.itinerary[activeDayIndex];
    
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="mb-8">
                <Link to="/app/plan-challenge/evaluating" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    플랜 목록으로
                </Link>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
                <main className="w-full lg:w-2/3 space-y-8">
                     <div 
                        className="relative h-56 md:h-64 rounded-2xl overflow-hidden bg-slate-800 bg-cover bg-center"
                        style={{ backgroundImage: `url(${plan.coverImage})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                            <div>
                                <p className="text-gray-200 font-semibold">{plan.destination} / {plan.startDate} ~ {plan.endDate}</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 drop-shadow-lg">{plan.title}</h1>
                                <div className="flex items-center mt-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gray-300 mr-2 text-sm border-2 border-slate-500">
                                        {plan.author.name.charAt(0)}
                                    </div>
                                    <span className="font-semibold text-white drop-shadow-sm">{plan.author.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-2xl">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                            <DetailItem icon={<CalendarDays className="w-5 h-5 text-blue-300" />} label="여행 기간" value="11/19 ~ 11/22" />
                            <DetailItem icon={<MapPin className="w-5 h-5 text-green-300" />} label="챌린지 여행지" value="교토" />
                            <DetailItem icon={<Users className="w-5 h-5 text-purple-300" />} label="여행 인원" value="4명" />
                            <DetailItem icon={<Clock className="w-5 h-5 text-yellow-300" />} label="챌린지 응모기간" value="10/1 ~ 10/15" />
                            <DetailItem icon={<Trophy className="w-5 h-5 text-orange-300" />} label="챌린지 평가기간" value="10/16 ~ 10/28" />
                            <DetailItem icon={<Award className="w-5 h-5 text-teal-300" />} label="챌린지 결과발표" value="10/30" />
                        </div>
                    </div>

                    <div>
                        <div className="relative mb-6">
                            <div className="bg-slate-800 rounded-full p-1.5 flex items-center w-full">
                                {showLeftScroll && <button onClick={() => handleScroll('left')} className="hidden md:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-slate-700 transition-colors" aria-label="이전 날짜로 스크롤"><ChevronLeft className="w-5 h-5" /></button>}
                                <div ref={scrollContainerRef} className="flex-grow flex items-center overflow-x-auto no-scrollbar space-x-1">
                                    {plan.itinerary.map((day, index) => (
                                        <button key={index} onClick={() => setActiveDayIndex(index)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeDayIndex === index ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-700/60'}`}>
                                            {formatDateForTab(day.date)}
                                        </button>
                                    ))}
                                </div>
                                {showRightScroll && <button onClick={() => handleScroll('right')} className="hidden md:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-slate-700 transition-colors" aria-label="다음 날짜로 스크롤"><ChevronRight className="w-5 h-5" /></button>}
                            </div>
                        </div>
                        <div>
                            {activeDay && activeDay.items.length > 0 ? (
                                <div className="space-y-4">
                                    {activeDay.items.map(item => <ItineraryItemCard key={item.id} item={item} onOpenGallery={handleOpenGallery} />)}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-slate-800 rounded-lg"><p className="text-gray-400">이 날짜에 대한 일정이 없습니다.</p></div>
                            )}
                        </div>
                    </div>
                </main>

                <aside className="w-full lg:w-1/3 mt-12 lg:mt-0">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-slate-800 p-6 rounded-lg text-center">
                            <h3 className="text-lg font-bold text-white mb-4">이 플랜이 마음에 드시나요?</h3>
                            <button onClick={handleRecommend} className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 ${isRecommended ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}>
                                <ThumbsUp className={`w-6 h-6 transition-transform ${isRecommended ? 'scale-110' : ''}`} />
                                <span>추천하기 ({plan.votes})</span>
                            </button>
                        </div>
                        <div className="h-[calc(100vh-16rem)]">
                            <CommentSection comments={plan.comments || []} onAddComment={handleAddComment} currentUser={MOCK_USER} />
                        </div>
                    </div>
                </aside>
            </div>

            <ImageGalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} images={galleryImages} startIndex={galleryStartIndex} />
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
};

export default PlanChallengeEvaluatingDetail;