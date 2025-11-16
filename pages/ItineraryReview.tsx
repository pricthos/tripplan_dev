
import React, { useState } from 'react';
import { MOCK_COMMUNITY_POSTS, MOCK_USER } from '../constants';
import { CommunityPost, Trip } from '../types';
import { MessageSquare, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreateItineraryReviewModal from '../components/community/CreateItineraryReviewModal';

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const CommunityPostCard: React.FC<{ post: CommunityPost }> = ({ post }) => {
    return (
        <Link to={`/app/itinerary-review/${post.id}`} className="block group h-full">
            <div className="bg-slate-800 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20 h-full flex flex-col">
                <img src={post.trip.coverImage} alt={post.trip.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">{post.title}</h3>
                    
                    <div className="bg-slate-900/40 rounded-lg px-3 py-2">
                        <p className="text-sm text-blue-400">{post.trip.destination}</p>
                        <p className="font-semibold text-white truncate" title={post.trip.title}>{post.trip.title}</p>
                        <p className="text-xs text-gray-500">{formatDate(post.trip.startDate)} - {formatDate(post.trip.endDate)}</p>
                    </div>

                    <div className="mt-auto pt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm">
                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gray-300 text-[10px] mr-2">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="text-gray-400">{post.author.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ItineraryReview: React.FC = () => {
    const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPost = (postData: { title: string; content: string; trip: Trip }) => {
        const newPost: CommunityPost = {
            id: String(Date.now()),
            author: MOCK_USER,
            createdAt: new Date().toLocaleString('sv-SE').slice(0, 16).replace('T', ' '),
            comments: [],
            ...postData,
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setIsModalOpen(false);
    };

    return (
        <>
            <CreateItineraryReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddPost={handleAddPost}
            />
            <div className="max-w-[1100px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">일정 조언/평가</h1>
                        <p className="text-gray-400 mt-1">다른 여행자들의 일정을 보고 조언을 구하거나 영감을 얻어보세요.</p>
                    </div>
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center mt-4 md:mt-0 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        글쓰기
                    </button>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map(post => (
                        <CommunityPostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ItineraryReview;