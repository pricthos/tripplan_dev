
import React, { useState } from 'react';
import { useNavigate, Link, useLocation, Navigate } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';
import PolicyModal from '../components/common/PolicyModal';
import { useAuth } from '../contexts/AuthContext';

const KakaoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.04 2 11.015c0 3.345 2.122 6.33 5.213 7.825L6 22l4.63-2.45c.44.06.89.1 1.37.1 5.52 0 10-4.04 10-9.015C22 6.04 17.52 2 12 2z"/>
    </svg>
);

const NaverIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.273 12.845 7.727 0H0v24h7.727V11.155L16.273 24H24V0h-7.727v12.845z"/>
    </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg className={className} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);


const Login: React.FC = () => {
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [policyModalView, setPolicyModalView] = useState<'terms' | 'privacy'>('terms');

    const from = location.state?.from?.pathname || '/app/main';

    const handleLogin = () => {
        login();
    };

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }
    
    const openPolicyModal = (view: 'terms' | 'privacy') => {
        setPolicyModalView(view);
        setIsPolicyModalOpen(true);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
                 <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
                 <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>

                <div className="w-full max-w-sm text-center z-10">
                    <Link to="/app/main" className="inline-block transition-transform hover:scale-105">
                        <PlaneTakeoff className="w-16 h-16 text-blue-500 mb-2 inline-block" />
                        <h1 className="text-4xl font-bold text-white mb-2">TripPlan</h1>
                    </Link>
                    <p className="text-gray-400 mb-10">나만의 여행을 계획하고 공유하세요.</p>

                    <div className="space-y-4">
                        <button onClick={handleLogin} className="w-full flex items-center justify-center py-3 px-4 bg-[#FEE500] text-black rounded-lg font-semibold text-base transition-all duration-200 hover:scale-105">
                            <KakaoIcon className="w-6 h-6 mr-3" />
                            카카오로 시작하기
                        </button>
                        <button onClick={handleLogin} className="w-full flex items-center justify-center py-3 px-4 bg-[#03C75A] text-white rounded-lg font-semibold text-base transition-all duration-200 hover:scale-105">
                            <NaverIcon className="w-5 h-5 mr-3" />
                            네이버로 시작하기
                        </button>
                        <button onClick={handleLogin} className="w-full flex items-center justify-center py-3 px-4 bg-white text-gray-700 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-105 border border-gray-200">
                            <GoogleIcon className="w-5 h-5 mr-3" />
                            Google로 시작하기
                        </button>
                    </div>
                     <div className="mt-8 text-xs text-gray-400">
                        로그인하시면{' '}
                        <button type="button" onClick={() => openPolicyModal('terms')} className="text-blue-400 hover:underline">
                            이용약관
                        </button>
                        <span> 및 </span>
                        <button type="button" onClick={() => openPolicyModal('privacy')} className="text-blue-400 hover:underline">
                            개인정보처리방침
                        </button>
                        <span>에 동의하는 것으로 간주합니다.</span>
                    </div>
                </div>
            </div>
            <PolicyModal
                isOpen={isPolicyModalOpen}
                onClose={() => setIsPolicyModalOpen(false)}
                initialView={policyModalView}
            />
        </>
    );
};

export default Login;