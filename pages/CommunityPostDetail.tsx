
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BOARD_POSTS, MOCK_USER } from '../constants';
import { ChevronLeft, Send, Heart } from 'lucide-react';
import { Comment, User, BoardPost, BoardCategory } from '../types';

const CATEGORY_TEXT_COLORS: { [key in BoardCategory]: string } = {
    [BoardCategory.General]: 'text-slate-400',
    [BoardCategory.Question]: 'text-blue-400',
    [BoardCategory.Review]: 'text-green-400',
    [BoardCategory.Tip]: 'text-yellow-400',
};

// 댓글 섹션 컴포넌트
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


const CommunityPostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    // As per requirement, all post links will show the details of the first mock post with content.
    const initialPost = MOCK_BOARD_POSTS.find(p => p.content);

    const [post, setPost] = useState(initialPost);
    const [isLiked, setIsLiked] = useState(false);
    
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
            const updatedComments = [...(prevPost.comments || []), newComment];
            return {
                ...prevPost,
                comments: updatedComments,
                commentsCount: updatedComments.length
            };
        });
    };
    
    const handleLike = () => {
        if (!post) return;
        const newLikes = isLiked ? post.likes - 1 : post.likes + 1;
        setIsLiked(!isLiked);
        setPost(prevPost => {
            if (!prevPost) return undefined;
            return {
                ...prevPost,
                likes: newLikes,
            };
        });
    };

    if (!post) {
        return (
            <div className="text-center text-white py-20">
                <h2 className="text-2xl font-bold">포스트를 찾을 수 없습니다.</h2>
                <Link to="/app/community" className="mt-4 inline-block text-blue-400 hover:underline">
                    목록으로 돌아가기
                </Link>
            </div>
        );
    }

    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, index) => {
            if (line.trim() === '') {
                return <br key={index} />;
            }
            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        });
    };

    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="mb-8">
                <Link to="/app/community" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    게시판 목록으로
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12">
                {/* Main Content */}
                <article className="w-full lg:flex-1 lg:max-w-[66.666%]">
                    <header className="mb-6 border-b border-slate-700 pb-6">
                         <span className={`text-sm font-semibold ${CATEGORY_TEXT_COLORS[post.category]}`}>{post.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4 leading-tight">{post.title}</h1>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gray-300 mr-3">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{post.author.name}</p>
                                    <p className="text-xs text-gray-400">{post.createdAt}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors duration-200 ${
                                        isLiked
                                            ? 'border-red-500/50 bg-red-500/10 text-red-400'
                                            : 'border-slate-600 text-gray-400 hover:border-slate-500 hover:bg-slate-700/50 hover:text-white'
                                    }`}
                                    aria-pressed={isLiked}
                                    title="추천"
                                >
                                    <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-current' : ''}`} />
                                    <span className="font-medium">{post.likes}</span>
                                </button>
                            </div>
                        </div>
                    </header>
                    
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-8">
                        {renderContent(post.content || '')}
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

            <style>{`
                .prose strong {
                    color: #f1f5f9;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default CommunityPostDetail;
