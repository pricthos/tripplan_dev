
import React, { useState, useRef } from 'react';
import { MOCK_USER } from '../constants';
import { Camera, Edit2, ChevronRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const KakaoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.04 2 11.015c0 3.345 2.122 6.33 5.213 7.825L6 22l4.63-2.45c.44.06.89.1 1.37.1 5.52 0 10-4.04 10-9.015C22 6.04 17.52 2 12 2z"/>
    </svg>
);

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [nickname, setNickname] = useState(MOCK_USER.name);
    const [avatar, setAvatar] = useState(MOCK_USER.avatar);
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [tempNickname, setTempNickname] = useState(MOCK_USER.name);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempNickname(e.target.value);
    };
    
    const saveNickname = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempNickname.trim()) {
            setNickname(tempNickname.trim());
            setIsEditingNickname(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };
    
    const menuItems = [
        { label: '내가 쓴 게시글', path: '#' },
        { label: '내가 쓴 조언/일정', path: '#' },
        { label: '내가 쓴 댓글', path: '#' },
        { label: '내가 좋아요한 게시글', path: '#' },
        { label: '푸시 알림 설정', path: '#' },
    ];

    return (
        <div className="max-w-[1100px] mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">마이페이지</h1>

            {/* User Info Section */}
            <div className="flex items-center mb-10">
                <div className="relative mr-6">
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-slate-700"
                    />
                    <button
                        onClick={handleAvatarClick}
                        className="absolute bottom-0 right-0 bg-slate-600 hover:bg-slate-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        aria-label="프로필 사진 변경"
                    >
                        <Camera size={16} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>
                
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-white">{nickname}</h2>
                        <button 
                            onClick={() => {
                                setTempNickname(nickname);
                                setIsEditingNickname(true);
                            }} 
                            className="text-gray-400 hover:text-white transition-colors p-1"
                            aria-label="닉네임 수정"
                        >
                            <Edit2 size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <KakaoIcon className="w-4 h-4 text-[#FEE500]" />
                        <span>{MOCK_USER.email}</span>
                    </div>
                </div>
            </div>

            {/* Nickname Edit Modal */}
            {isEditingNickname && (
                <div 
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsEditingNickname(false)}
                >
                    <div 
                        className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-sm relative text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setIsEditingNickname(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        <h3 className="text-lg font-bold mb-4">닉네임 변경</h3>
                        <form onSubmit={saveNickname}>
                            <input
                                type="text"
                                value={tempNickname}
                                onChange={handleNicknameChange}
                                className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />
                            <div className="flex justify-end mt-4 space-x-2">
                                <button type="button" onClick={() => setIsEditingNickname(false)} className="px-4 py-2 rounded-md text-gray-300 bg-slate-700 hover:bg-slate-600 transition-colors">취소</button>
                                <button type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">저장</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Menu Section */}
            <div className="bg-slate-800 rounded-lg">
                <ul className="divide-y divide-slate-700/50">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path} className="flex justify-between items-center p-5 hover:bg-slate-700/50 transition-colors group">
                                <span className="text-white font-medium">{item.label}</span>
                                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Footer Section */}
            <div className="flex justify-between mt-8 px-2">
                <Link to="/app/withdrawal" className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                    회원탈퇴
                </Link>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-white transition-colors">
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MyPage;
