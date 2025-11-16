
import React, { useState } from 'react';
import { MOCK_BOARD_POSTS, MOCK_USER } from '../constants';
import { BoardCategory, BoardPost } from '../types';
import { Edit, Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreatePostModal from '../components/community/CreatePostModal';

const CATEGORY_COLORS: { [key in BoardCategory]: string } = {
    [BoardCategory.General]: 'text-slate-400',
    [BoardCategory.Question]: 'text-blue-400',
    [BoardCategory.Review]: 'text-green-400',
    [BoardCategory.Tip]: 'text-yellow-400',
};

const BoardPostCard: React.FC<{ post: BoardPost }> = ({ post }) => (
    <Link to={`/app/community/${post.id}`} className="group block h-full">
        <div className="bg-slate-800 rounded-lg p-5 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                        <span className={`text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}>
                            {post.category}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2 mb-1 transition-colors group-hover:text-blue-400 leading-tight">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-500">{post.createdAt}</p>
                    </div>
                    {post.thumbnail && (
                        <img src={post.thumbnail} alt={post.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gray-300 text-[10px] mr-2">
                            {post.author.name.charAt(0)}
                        </div>
                        <span className="text-gray-400">{post.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center" title="댓글">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.commentsCount}
                        </span>
                        <span className="flex items-center" title="추천">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);


const Community: React.FC = () => {
    const [posts, setPosts] = useState<BoardPost[]>(MOCK_BOARD_POSTS);
    const [activeCategory, setActiveCategory] = useState<BoardCategory | '전체'>('전체');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredPosts = activeCategory === '전체'
        ? posts
        : posts.filter(post => post.category === activeCategory);

    const categories: ('전체' | BoardCategory)[] = ['전체', ...Object.values(BoardCategory)];

    const handleAddPost = (postData: { category: BoardCategory; title: string; content: string; thumbnail?: string; }) => {
        const newPost: BoardPost = {
            id: String(Date.now()),
            ...postData,
            author: MOCK_USER,
            createdAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').slice(0, -1),
            views: 0,
            likes: 0,
            commentsCount: 0,
            comments: [],
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setIsModalOpen(false);
    };

    return (
        <>
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddPost={handleAddPost}
            />
            <div className="max-w-[1100px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">게시판</h1>
                        <p className="text-gray-400 mt-1">여행에 대한 이야기를 자유롭게 나눠보세요.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center mt-4 md:mt-0 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        글쓰기
                    </button>
                </div>

                <div className="flex space-x-1 sm:space-x-2 mb-6 border-b border-slate-700 overflow-x-auto pb-px">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-3 sm:px-4 py-2 text-base font-semibold transition-colors duration-200 rounded-t-md ${
                                activeCategory === cat
                                    ? 'border-b-2 border-blue-500 text-white'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div>
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map(post => (
                                <BoardPostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-20 bg-slate-800 rounded-lg">
                            <p>해당 카테고리에 게시글이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Community;