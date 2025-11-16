
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MOCK_USER } from '../../constants';
import { Calendar, PlaneTakeoff, Trophy, CheckSquare, Coffee, Info, Users, ChevronDown, ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const isCommunityRouteActive = location.pathname.startsWith('/app/community') || location.pathname.startsWith('/app/itinerary-review');
    const isPlanChallengeRouteActive = location.pathname.startsWith('/app/plan-challenge');

    const [isCommunityOpen, setCommunityOpen] = useState(isCommunityRouteActive);
    const [isPlanChallengeOpen, setPlanChallengeOpen] = useState(isPlanChallengeRouteActive);

    useEffect(() => {
        if (isCommunityRouteActive) {
            setCommunityOpen(true);
        }
    }, [isCommunityRouteActive, location.pathname]);

    useEffect(() => {
        if (isPlanChallengeRouteActive) {
            setPlanChallengeOpen(true);
        }
    }, [isPlanChallengeRouteActive, location.pathname]);


    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClasses = "flex items-center px-4 py-3 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200";
        if (isActive) {
            return `${baseClasses} bg-slate-700/50 text-blue-400 shadow-inner`;
        }
        return `${baseClasses} text-gray-300`;
    };

    const getSubNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClasses = "flex items-center w-full px-4 py-2.5 text-sm hover:bg-slate-700/60 rounded-md transition-colors duration-200";
        if (isActive) {
            return `${baseClasses} text-white bg-slate-700`;
        }
        return `${baseClasses} text-gray-400 hover:text-gray-200`;
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
            <aside className={`absolute md:relative flex flex-col w-64 bg-slate-800 h-full p-4 transition-transform z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <Link to="/app/main" className="flex items-center mb-4" onClick={() => setIsOpen(false)}>
                    <PlaneTakeoff className="w-6 h-6 mr-2 text-blue-400"/>
                    <h1 className="text-white text-xl font-bold mt-1">TripPlan</h1>
                </Link>

                <nav className="flex-1">
                    <ul>
                        <li>
                            <NavLink to="/app/my-trips" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                                <Calendar className="w-5 h-5 mr-3" />
                                내 여행
                            </NavLink>
                        </li>
                         <li>
                            <button
                                onClick={() => setCommunityOpen(!isCommunityOpen)}
                                className={`flex items-center justify-between w-full px-4 py-3 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200 ${isCommunityRouteActive ? 'bg-slate-700/50 text-blue-400 shadow-inner' : 'text-gray-300'}`}
                            >
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-3" />
                                    <span>커뮤니티</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isCommunityOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCommunityOpen && (
                                <ul className="pl-5 mt-1 space-y-1">
                                    <li>
                                        <NavLink to="/app/community" className={getSubNavLinkClass} onClick={() => setIsOpen(false)}>
                                            게시판
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/app/itinerary-review" className={getSubNavLinkClass} onClick={() => setIsOpen(false)}>
                                            일정 조언/평가
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button
                                onClick={() => setPlanChallengeOpen(!isPlanChallengeOpen)}
                                className={`flex items-center justify-between w-full px-4 py-3 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200 ${isPlanChallengeRouteActive ? 'bg-slate-700/50 text-blue-400 shadow-inner' : 'text-gray-300'}`}
                            >
                                <div className="flex items-center">
                                    <Trophy className="w-5 h-5 mr-3" />
                                    <span>플랜 챌린지</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isPlanChallengeOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isPlanChallengeOpen && (
                                <ul className="pl-5 mt-1 space-y-1">
                                    <li>
                                        <NavLink to="/app/plan-challenge/about" className={getSubNavLinkClass} onClick={() => setIsOpen(false)}>
                                            플랜 챌린지란?
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/app/plan-challenge/ongoing" className={getSubNavLinkClass} onClick={() => setIsOpen(false)}>
                                            진행중 챌린지
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/app/plan-challenge/evaluating" className={getSubNavLinkClass} onClick={() => setIsOpen(false)}>
                                            진행중 챌린지 (평가)
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/app/plan-challenge/ended" className={getSubNavLinkClass} onClick={() => setIsOpen(false)}>
                                            종료된 챌린지
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                           <NavLink to="/app/travel-checklist" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                                <CheckSquare className="w-5 h-5 mr-3" />
                                여행필수체크
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/app/useful-info" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                                <Info className="w-5 h-5 mr-3" />
                                유용한정보
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/app/support" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                                <Coffee className="w-5 h-5 mr-3" />
                                고객센터
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div>
                    <div className="border-t border-slate-700 mb-4 -mx-4"></div>
                    {isAuthenticated ? (
                        <NavLink 
                            to="/app/my-page" 
                            className={({ isActive }) => 
                                `flex items-center w-full text-left p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200 ${isActive ? 'bg-slate-700/50' : ''}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex items-center flex-1">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white mr-3">
                                    {MOCK_USER.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{MOCK_USER.name}</p>
                                    <p className="text-xs text-gray-400">{MOCK_USER.email}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </NavLink>
                    ) : (
                        <Link 
                            to="/login"
                            className="flex items-center w-full text-left p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="flex items-center flex-1">
                                <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-3">
                                    <LogIn className="w-5 h-5 text-gray-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">로그인</p>
                                    <p className="text-xs text-gray-400">로그인하고 모든 기능을 이용하세요</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </Link>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
