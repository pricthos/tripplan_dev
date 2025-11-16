
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Plane, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(true);

    return (
        <div className="flex h-screen bg-slate-900">
            <Sidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setSidebarOpen} 
            />

            {/* Fixed Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-20 bg-slate-800 shadow-lg h-16 flex items-center px-4">
                <button 
                    onClick={() => setSidebarOpen(!isSidebarOpen)} 
                    className="text-white p-2 -ml-2 rounded-md hover:bg-slate-700 mr-2"
                    aria-label="메뉴 열기"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-white text-md font-bold">TripPlan</h1>
            </header>

            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
                <div className="p-4 sm:p-8">
                    <Outlet />
                </div>
            </main>

            {isToastVisible && (
                <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 rounded-lg overflow-hidden shadow-2xl shadow-black/50 animate-slide-in-up transition-transform hover:scale-105">
                     <a href="#" target="_blank" rel="noopener noreferrer" aria-label="이벤트 배너">
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTECAgvDCACmyaSnRVOlNJKbiooR8hz1vpPwA&s" 
                            alt="Event Banner" 
                            className="w-full max-w-[250px] sm:max-w-[280px] h-auto block"
                        />
                    </a>
                    <button
                        onClick={() => setIsToastVisible(false)}
                        className="absolute top-1.5 right-1.5 p-1 bg-black/40 text-white/80 hover:text-white hover:bg-black/60 rounded-full transition-colors focus:outline-none"
                        aria-label="배너 닫기"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
            
            <style>{`
                @keyframes slide-in-up {
                    from { 
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to { 
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-up {
                    animation: slide-in-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
            `}</style>
        </div>
    );
};

export default Layout;
