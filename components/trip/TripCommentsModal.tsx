
import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Comment, User } from '../../types';

interface TripCommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
    onAddComment: (text: string) => void;
    currentUser: User;
}

const TripCommentsModal: React.FC<TripCommentsModalProps> = ({ isOpen, onClose, comments, onAddComment, currentUser }) => {
    const [newComment, setNewComment] = useState('');
    const commentsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
           setTimeout(() => scrollToBottom(), 100);
        }
    }, [comments, isOpen]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="comment-modal-title"
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-md text-white flex flex-col h-full sm:h-[70vh] sm:max-h-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 id="comment-modal-title" className="text-lg font-bold">의견공유</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="닫기">
                        <X size={24} />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p>아직 공유된 의견이 없습니다.</p>
                            <p className="text-sm mt-1">가장 먼저 의견을 남겨보세요!</p>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className={`flex items-start ${comment.user.email === currentUser.email ? 'justify-end' : ''}`}>
                                <div className={`flex items-start max-w-[80%] ${comment.user.email === currentUser.email ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm mx-3 flex-shrink-0">
                                        {comment.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-sm mb-1 ${comment.user.email === currentUser.email ? 'text-right' : ''}`}>{comment.user.name}</p>
                                        <p className={`text-gray-200 px-3 py-2 rounded-lg inline-block break-words ${comment.user.email === currentUser.email ? 'bg-blue-600' : 'bg-slate-700'}`}>{comment.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={commentsEndRef} />
                </main>

                <footer className="p-4 border-t border-slate-700 flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                         <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                            {currentUser.name.charAt(0)}
                        </div>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="의견을 입력하세요..."
                            className="w-full bg-slate-700 rounded-full px-4 py-2 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                            aria-label="새 의견 입력"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2.5 transition-colors flex-shrink-0 disabled:bg-slate-600" disabled={!newComment.trim()} aria-label="의견 보내기">
                            <Send size={18} />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default TripCommentsModal;
