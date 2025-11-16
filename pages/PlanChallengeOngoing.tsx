import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, CalendarDays, Trophy, Clock, Award, Rocket } from 'lucide-react';

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


const PlanChallengeOngoing: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-white">진행중인 챌린지</h1>
            <p className="text-gray-400 mt-1">현재 진행 중인 챌린지에 참여하고 우승에 도전해보세요!</p>
          </div>
      </div>
      
      <div className="bg-slate-800/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div 
            className="relative h-64 bg-cover bg-center flex flex-col justify-center items-center text-center p-8 animate-fade-in-up"
            style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2021/11/28/03/48/travel-6829291_1280.jpg')", animationDelay: '0.1s' }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
            <div className="relative z-10">
                <p className="text-lg font-semibold text-white drop-shadow-md">✈️ 11월의 여행지 – 교토</p>
                <h2 className="text-4xl font-extrabold text-white mt-2 drop-shadow-lg">고즈넉한 교토의 정취와 음식</h2>
                <div className="mt-4 bg-red-500/80 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full inline-block">
                    응모 마감까지 D-10
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
            <div className="space-y-12">
                {/* Description */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                
                {/* Apply Button */}
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link
                        to="/app/plan-challenge/submit"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transform hover:scale-105"
                    >
                        <Rocket className="w-5 h-5 mr-2" />
                        응모하기
                    </Link>
                </div>

                {/* Details */}
                <div className="bg-slate-900/50 p-6 rounded-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-xl font-bold text-white mb-6">📌 챌린지 정보</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                        <DetailItem icon={<CalendarDays className="w-5 h-5 text-blue-300" />} label="여행 기간" value="11/19 ~ 11/22" />
                        <DetailItem icon={<MapPin className="w-5 h-5 text-green-300" />} label="챌린지 여행지" value="교토" />
                        <DetailItem icon={<Users className="w-5 h-5 text-purple-300" />} label="여행 인원" value="4명" />
                        <DetailItem icon={<Clock className="w-5 h-5 text-yellow-300" />} label="챌린지 응모기간" value="10/1 ~ 10/15" />
                        <DetailItem icon={<Trophy className="w-5 h-5 text-orange-300" />} label="챌린지 평가기간" value="10/16 ~ 10/28" />
                        <DetailItem icon={<Award className="w-5 h-5 text-teal-300" />} label="챌린지 결과발표" value="10/30" />
                    </div>
                </div>
            </div>
            
            {/* Prize Section */}
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-xl font-bold text-white mb-4">🏆 시상 안내</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 p-6 rounded-lg text-center transition-transform hover:scale-105">
                        <span className="text-4xl">🥇</span>
                        <p className="font-bold text-white text-lg mt-2">1등</p>
                        <p className="font-semibold text-yellow-300 mt-1">네이버페이 5만원권</p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-lg text-center transition-transform hover:scale-105">
                        <span className="text-4xl">🥈</span>
                        <p className="font-bold text-white text-lg mt-2">2등</p>
                        <p className="font-semibold text-yellow-300 mt-1">네이버페이 3만원권</p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-lg text-center transition-transform hover:scale-105">
                        <span className="text-4xl">🥉</span>
                        <p className="font-bold text-white text-lg mt-2">3등</p>
                        <p className="font-semibold text-yellow-300 mt-1">네이버페이 1만원권</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
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

export default PlanChallengeOngoing;