import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, Users, ThumbsUp, ChevronRight } from 'lucide-react';

const MOCK_ENDED_CHALLENGES = [
  {
    id: 'ended-1',
    subtitle: '11월의 여행지 – 교토',
    title: '고즈넉한 교토의 정취와 음식',
    period: '2024.10.01 ~ 2024.10.28',
    participants: 4,
    totalVotes: 349,
    coverImage: 'https://cdn.pixabay.com/photo/2021/11/28/03/48/travel-6829291_1280.jpg',
  },
  {
    id: 'ended-2',
    subtitle: '10월의 여행지 – 파리',
    title: '낭만과 예술의 도시, 파리를 걷다',
    period: '2024.09.01 ~ 2024.09.28',
    participants: 8,
    totalVotes: 782,
    coverImage: 'https://www.visakorea.com/dam/VCOM/regional/ap/images/travel-with-visa/paris/marquee-travel-paris-800x450.jpg',
  },
  {
    id: 'ended-3',
    subtitle: '9월의 여행지 – 제주',
    title: '바람과 돌이 머무는 섬, 제주 한 바퀴',
    period: '2024.08.01 ~ 2024.08.28',
    participants: 12,
    totalVotes: 1024,
    coverImage: 'https://cdn.jejusori.net/news/photo/202210/409023_415016_382.jpg',
  },
];

const EndedChallengeCard: React.FC<{ challenge: typeof MOCK_ENDED_CHALLENGES[0] }> = ({ challenge }) => (
    <Link to={`/app/plan-challenge/ended/${challenge.id}`} className="block group bg-slate-800 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/20">
        <div className="relative">
            <img src={challenge.coverImage} alt={challenge.title} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <p className="text-sm font-semibold text-blue-300 drop-shadow">{challenge.subtitle}</p>
                <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md mt-1">{challenge.title}</h3>
            </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <span>{challenge.period}</span>
                </div>
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5" />
                    <span>{challenge.participants}개 플랜</span>
                </div>
            </div>
            
            <div className="mt-auto pt-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-300">
                        <ThumbsUp className="w-4 h-4 mr-1.5 text-blue-400" />
                        <span>총 <span className="font-bold">{challenge.totalVotes.toLocaleString()}</span> 추천</span>
                    </div>
                     <div className="flex items-center font-semibold text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                        결과 보기
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </div>
    </Link>
);


const PlanChallengeEnded: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">종료된 챌린지</h1>
            <p className="text-gray-400 mt-1">지난 챌린지의 우승 플랜들을 확인하고 여행 영감을 얻어보세요.</p>
        </div>
        
        {MOCK_ENDED_CHALLENGES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_ENDED_CHALLENGES.map((challenge, index) => (
                    <div key={challenge.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                        <EndedChallengeCard challenge={challenge} />
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-slate-800 rounded-lg">
                <div className="inline-block bg-slate-700 p-6 rounded-full mb-6">
                    <Award className="w-16 h-16 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">아직 종료된 챌린지가 없습니다.</h2>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">
                    첫 번째 챌린지가 종료되면 이곳에서 명예의 전당을 확인하실 수 있습니다.
                </p>
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
                animation: fade-in-up 0.5s ease-out forwards;
                opacity: 0;
            }
        `}</style>
    </div>
  );
};

export default PlanChallengeEnded;