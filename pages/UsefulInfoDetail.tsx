
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { USEFUL_INFO_POSTS } from '../data/usefulInfoData';
import { ChevronLeft, Send } from 'lucide-react';
import { Comment, User } from '../types';
import { MOCK_USER } from '../constants';

// 댓글 섹션 컴포넌트
const CommentSection: React.FC<{
    comments: Comment[];
    onAddComment: (text: string) => void;
    currentUser: User;
}> = ({ comments, onAddComment, currentUser }) => {
    const [newComment, setNewComment] = useState('');
    const commentsEndRef = useRef<HTMLDivElement>(null);

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


const UsefulInfoDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const initialPost = USEFUL_INFO_POSTS.find(p => p.id === postId);

    const [post, setPost] = useState(initialPost);
    
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
                comments: [...(prevPost.comments || []), newComment],
            };
        });
    };

    if (!post) {
        return (
            <div className="text-center text-white py-20">
                <h2 className="text-2xl font-bold">포스트를 찾을 수 없습니다.</h2>
                <Link to="/app/useful-info" className="mt-4 inline-block text-blue-400 hover:underline">
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
                <Link to="/app/useful-info" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    유용한 정보 목록으로
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12">
                {/* Main Content */}
                <article className="w-full lg:flex-1 lg:max-w-[66.666%]">
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{post.title}</h1>
                        <p className="text-gray-400 text-sm">{post.date}</p>
                    </header>
                    
                    <img src={post.thumbnail} alt={post.title} className="w-full rounded-lg mb-8 object-cover aspect-video" />

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                        {renderContent(post.content)}
                    </div>
                </article>

                {/* Comment Section */}
                <aside className="w-full lg:w-1/3 mt-12 lg:mt-0">
                    <div className="sticky top-8 h-[calc(100vh-48px)]">
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

export default UsefulInfoDetail;
