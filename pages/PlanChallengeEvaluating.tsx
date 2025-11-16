
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import { ThumbsUp, Eye, Info, X, MapPin, Users, CalendarDays, Trophy, Clock, Award, ArrowDownUp } from 'lucide-react';

const MOCK_EVALUATING_PLANS = [
    {
        id: 'eval-1',
        title: '단풍과 함께하는 교토 3박 4일',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://imgcp.aacdn.jp/img-a/1440/auto/global-aaj-front/article/2016/10/5801c7626c1d2_5801c746564cc_1104936929.png',
        members: [{ name: '김여행', email: 'traveler.kim@example.com', avatar: 'https://i.pravatar.cc/150?u=traveler.kim@example.com' }],
        votes: 128,
    },
    {
        id: 'eval-2',
        title: '교토 미식 탐방: 숨겨진 맛집을 찾아서',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/2656/article_350912_w640z.jpg',
        members: [{ name: '이맛잘', email: 'foodie.lee@example.com', avatar: 'https://i.pravatar.cc/150?u=foodie.lee@example.com' }],
        votes: 95,
    },
    {
        id: 'eval-3',
        title: '자전거로 즐기는 교토의 가을',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://digjapan.travel/files/topics/7910_ext_02_2.jpg',
        members: [{ name: '박라이더', email: 'rider.park@example.com', avatar: 'https://i.pravatar.cc/150?u=rider.park@example.com' }],
        votes: 72,
    },
    {
        id: 'eval-4',
        title: '교토의 고즈넉한 사찰 순례',
        destination: '일본, 교토',
        startDate: '2024-11-19',
        endDate: '2024-11-22',
        coverImage: 'https://t1.daumcdn.net/brunch/service/user/3fy/image/tMUlbNs-YpiFJmSbY-Zd_3lKoVA.jpeg',
        members: [MOCK_USER], // My plan
        votes: 54,
    },
];

const PlanCard = ({ plan }: { plan: typeof MOCK_EVALUATING_PLANS[0] }) => {
    const author = plan.members[0];

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20">
            <div className="relative">
                <img src={plan.coverImage} alt={plan.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                     <div className="flex items-center text-sm">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-gray-300 mr-2 border-2 border-slate-600">
                           {author.name.charAt(0)}
                        </div>
                        <span className="text-white font-semibold drop-shadow-md">{author.name}</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-white truncate text-lg">{plan.title}</h3>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <ThumbsUp className="w-4 h-4 text-blue-400" />
                        <span className="font-medium">{plan.votes}</span>
                    </div>
                    <Link
                        to={`/app/plan-challenge/evaluating/${plan.id}`}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        플랜 보기
                    </Link>
                </div>
            </div>
        </div>
    );
};

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 mr-4 mt-1">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);


const PlanChallengeEvaluating: React.FC = () => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    const sortedPlans = [...MOCK_EVALUATING_PLANS].sort((a, b) => {
        return sortOrder === 'desc' ? b.votes - a.votes : a.votes - b.votes;
    });

    return (
        <div className="max-w-[1100px] mx-auto">
             <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 animate-fade-in-up">
                <div>
                    <h1 className="text-3xl font-bold text-white">진행중 챌린지 (평가)</h1>
                    <p className="text-gray-400 mt-1">마음에 드는 플랜에 투표하고 우승자를 가려주세요!</p>
                </div>
                <button 
                    onClick={() => setIsDetailsModalOpen(true)}
                    className="flex items-center justify-center mt-4 md:mt-0 bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-600 transition-colors duration-200">
                    <Info className="w-4 h-4 mr-2" />
                    챌린지 내용 확인
                </button>
            </div>

            <div className="bg-slate-800/50 rounded-2xl shadow-2xl overflow-hidden">
                <div 
                    className="relative h-64 bg-cover bg-center flex flex-col justify-center items-center text-center p-8 animate-fade-in-up"
                    style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2021/11/28/03/48/travel-6829291_1280.jpg')", animationDelay: '0.1s' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
                    <div className="relative z-10">
                        <p className="text-lg font-semibold text-white drop-shadow-md">✈️ 11월의 여행지 – 교토</p>
                        <h2 className="text-4xl font-extrabold text-white mt-2 drop-shadow-lg">고즈넉한 교토의 정취와 음식</h2>
                        <div className="mt-4 bg-purple-500/80 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full inline-block">
                            평가 마감까지 D-3
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-end mb-6">
                        <div className="bg-slate-900/50 rounded-lg p-1 flex items-center space-x-1">
                             <button
                                onClick={() => setSortOrder('desc')}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${sortOrder === 'desc' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700'}`}
                            >
                                추천 많은 순
                            </button>
                            <button
                                onClick={() => setSortOrder('asc')}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${sortOrder === 'asc' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-700'}`}
                            >
                                추천 적은 순
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedPlans.map((plan, index) => (
                            <div key={plan.id} className="animate-fade-in-up" style={{ animationDelay: `${(index * 100) + 200}ms` }}>
                                <PlanCard plan={plan} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isDetailsModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsDetailsModalOpen(false)}
                >
                    <div 
                        className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl relative text-white animate-fade-in max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="flex-shrink-0">
                            <button onClick={() => setIsDetailsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold">챌린지 상세 정보</h2>
                            <p className="text-sm text-blue-400">11월의 여행지 – 교토</p>
                        </header>
                        <main className="mt-6 overflow-y-auto flex-1 pr-2 space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">🍁 챌린지 소개</h3>
                                <div className="text-gray-300 space-y-4 leading-relaxed">
                                    <p>
                                        이번 챌린지의 여행 도시는 바로 교토입니다!
                                        오랜 시간 사랑받아온 이 도시는, 걷기만 해도 마음이 차분해지는 고즈넉한 분위기로 가득하죠.
                                    </p>
                                    <p>
                                        전통이 살아 숨 쉬는 골목과 사찰을 천천히 거닐면, 사계절이 만들어내는 색감과 향기가 자연스럽게 여행에 스며듭니다.
                                        걷다 보면 어느 순간, 교토의 맛을 담은 음식들이 하루를 더욱 특별하게 채워줄 거예요.
                                    </p>
                                    <p className="font-semibold text-blue-300">
                                        플래너님이 담아낼 교토만의 감성, 그리고 창의적인 여행 루트가 벌써부터 기대됩니다!
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-900/50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-white mb-6">📌 챌린지 정보</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                                    <DetailItem icon={<CalendarDays className="w-5 h-5 text-blue-300" />} label="여행 기간" value="11/19 ~ 11/22" />
                                    <DetailItem icon={<MapPin className="w-5 h-5 text-green-300" />} label="챌린지 여행지" value="교토" />
                                    <DetailItem icon={<Users className="w-5 h-5 text-purple-300" />} label="여행 인원" value="4명" />
                                    <DetailItem icon={<Clock className="w-5 h-5 text-yellow-300" />} label="챌린지 응모기간" value="10/1 ~ 10/15" />
                                    <DetailItem icon={<Trophy className="w-5 h-5 text-orange-300" />} label="챌린지 평가기간" value="10/16 ~ 10/28" />
                                    <DetailItem icon={<Award className="w-5 h-5 text-teal-300" />} label="챌린지 결과발표" value="10/30" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">🏆 시상 안내</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-slate-900/50 p-6 rounded-lg text-center">
                                        <span className="text-4xl">🥇</span>
                                        <p className="font-bold text-white text-lg mt-2">1등</p>
                                        <p className="font-semibold text-yellow-300 mt-1">네이버페이 5만원권</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-lg text-center">
                                        <span className="text-4xl">🥈</span>
                                        <p className="font-bold text-white text-lg mt-2">2등</p>
                                        <p className="font-semibold text-yellow-300 mt-1">네이버페이 3만원권</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-lg text-center">
                                        <span className="text-4xl">🥉</span>
                                        <p className="font-bold text-white text-lg mt-2">3등</p>
                                        <p className="font-semibold text-yellow-300 mt-1">네이버페이 1만원권</p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <style>{`
                        @keyframes fade-in {
                            from { opacity: 0; transform: scale(0.95); }
                            to { opacity: 1; transform: scale(1); }
                        }
                        .animate-fade-in {
                            animation: fade-in 0.2s ease-out forwards;
                        }
                    `}</style>
                </div>
            )}

             <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default PlanChallengeEvaluating;