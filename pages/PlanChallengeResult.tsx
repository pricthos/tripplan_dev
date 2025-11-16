import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import { ChevronLeft, ThumbsUp, Award, Eye } from 'lucide-react';
import { User } from '../types';

interface ChallengePlan {
    id: string;
    title: string;
    coverImage: string;
    author: User;
    votes: number;
}

const MOCK_CHALLENGE_RESULTS: { [key: string]: { challenge: any; plans: ChallengePlan[] } } = {
  'ended-1': { 
    challenge: {
      id: 'ended-1',
      subtitle: '11월의 여행지 – 교토',
      title: '고즈넉한 교토의 정취와 음식',
      period: '2024.10.01 ~ 2024.10.28',
      coverImage: 'https://cdn.pixabay.com/photo/2021/11/28/03/48/travel-6829291_1280.jpg',
    },
    plans: [
      {
        id: 'eval-1',
        title: '단풍과 함께하는 교토 3박 4일',
        coverImage: 'https://imgcp.aacdn.jp/img-a/1440/auto/global-aaj-front/article/2016/10/5801c7626c1d2_5801c746564cc_1104936929.png',
        author: { name: '김여행', email: 'traveler.kim@example.com', avatar: 'https://i.pravatar.cc/150?u=traveler.kim@example.com' },
        votes: 128,
      },
      {
        id: 'eval-2',
        title: '교토 미식 탐방: 숨겨진 맛집을 찾아서',
        coverImage: 'https://rimage.savorjapan.com/svj/image/discover_oishii_japan/2656/article_350912_w640z.jpg',
        author: { name: '이맛잘', email: 'foodie.lee@example.com', avatar: 'https://i.pravatar.cc/150?u=foodie.lee@example.com' },
        votes: 95,
      },
      {
        id: 'eval-3',
        title: '자전거로 즐기는 교토의 가을',
        coverImage: 'https://digjapan.travel/files/topics/7910_ext_02_2.jpg',
        author: { name: '박라이더', email: 'rider.park@example.com', avatar: 'https://i.pravatar.cc/150?u=rider.park@example.com' },
        votes: 72,
      },
      {
        id: 'eval-4',
        title: '교토의 고즈넉한 사찰 순례',
        coverImage: 'https://t1.daumcdn.net/brunch/service/user/3fy/image/tMUlbNs-YpiFJmSbY-Zd_3lKoVA.jpeg',
        author: MOCK_USER,
        votes: 54,
      },
    ].sort((a, b) => b.votes - a.votes)
  },
};

const RankCard: React.FC<{ plan: ChallengePlan; rank: number; challengeId: string | undefined }> = ({ plan, rank, challengeId }) => {
    const medals = ['🥇', '🥈', '🥉'];
    const rankColors = [
        'border-yellow-400/50 bg-yellow-400/10',
        'border-slate-400/50 bg-slate-400/10',
        'border-orange-400/50 bg-orange-400/10',
    ];

    const isWinner = rank < 3;
    const cardClass = isWinner
        ? `border-2 ${rankColors[rank]}`
        : 'border border-slate-700';

    return (
        <div className={`bg-slate-800 rounded-lg overflow-hidden flex items-center p-4 transition-transform hover:scale-105 ${cardClass}`}>
            <div className="flex items-center justify-center w-12 text-center text-xl font-bold">
                {isWinner ? (
                    <span className="text-3xl">{medals[rank]}</span>
                ) : (
                    <span className="text-gray-400">{rank + 1}</span>
                )}
            </div>
            <img src={plan.coverImage} alt={plan.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0 mx-4" />
            <div className="flex-grow min-w-0">
                <h3 className="font-bold text-white truncate text-lg">{plan.title}</h3>
                <p className="text-sm text-gray-400 mt-1">by {plan.author.name}</p>
                <div className="flex items-center gap-1.5 text-sm text-yellow-300 mt-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold">{plan.votes}</span>
                </div>
            </div>
            <Link 
                to={`/app/plan-challenge/ended/${challengeId}/plan/${plan.id}`}
                className="ml-4 flex-shrink-0 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
                <Eye className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">플랜 보기</span>
            </Link>
        </div>
    );
};


const PlanChallengeResult: React.FC = () => {
    const { challengeId } = useParams<{ challengeId: string }>();
    const resultData = challengeId ? MOCK_CHALLENGE_RESULTS[challengeId] : null;

    if (!resultData) {
        return (
            <div className="text-center text-white py-20">
                <div className="inline-block bg-slate-700 p-6 rounded-full mb-6">
                    <Award className="w-16 h-16 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">챌린지 결과를 찾을 수 없습니다.</h2>
                <Link to="/app/plan-challenge/ended" className="mt-4 inline-block text-blue-400 hover:underline">
                    종료된 챌린지 목록으로 돌아가기
                </Link>
            </div>
        );
    }

    const { challenge, plans } = resultData;

    return (
        <div className="max-w-[1100px] mx-auto">
            <div className="mb-8">
                <Link to="/app/plan-challenge/ended" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    종료된 챌린지 목록으로
                </Link>
            </div>
            
            <header 
                className="relative rounded-2xl mb-8 text-center overflow-hidden bg-cover bg-center p-8 md:p-12"
                style={{ backgroundImage: `url(${challenge.coverImage})` }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="relative z-10">
                    <p className="font-semibold text-blue-400">{challenge.subtitle}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow-lg">{challenge.title}</h1>
                    <p className="text-gray-300 mt-2 text-sm">{challenge.period}</p>
                </div>
            </header>
            
            <div className="space-y-4">
                {plans.map((plan, index) => (
                    <div key={plan.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                        <RankCard plan={plan} rank={index} challengeId={challengeId} />
                    </div>
                ))}
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
                    animation: fade-in-up 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default PlanChallengeResult;