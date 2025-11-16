
import React from 'react';
import { Link } from 'react-router-dom';
import { USEFUL_INFO_POSTS } from '../data/usefulInfoData';

const UsefulInfo: React.FC = () => {
    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">유용한 정보</h1>
                <p className="text-gray-400 mt-1">여행에 도움이 되는 다양한 정보들을 확인하세요.</p>
            </div>
             
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {USEFUL_INFO_POSTS.map(post => (
                    <Link key={post.id} to={`/app/useful-info/${post.id}`} className="block group">
                        <div className="bg-slate-800 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20">
                            <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-2 flex-grow">{post.title}</h3>
                                <p className="text-sm text-gray-400 mb-4">{post.excerpt}</p>
                                <div className="mt-auto">
                                    <p className="text-xs text-gray-500">{post.date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UsefulInfo;
