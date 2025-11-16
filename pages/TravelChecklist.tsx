
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Trip } from '../types';
import { ChevronRight, Plane, BedDouble, Ticket, Bus, Wifi, Shield, ChevronLeft } from 'lucide-react';

const TravelChecklist: React.FC = () => {
    const location = useLocation();
    const trip = (location.state?.trip as Trip) || null;

    const tripDetailsText = trip 
        ? `${trip.startDate.replace(/-/g, '.')} ~ ${trip.endDate.replace(/-/g, '.')} / ${trip.destination.split(',')[1]?.trim() || trip.destination} / 성인 ${trip.members.length}명` 
        : undefined;

    const affiliateItems = [
        { icon: <Plane className="w-6 h-6 text-blue-400" />, title: '항공권예약을 알아보세요', description: '다양한 항공편의 가격을 확인해보세요.', details: tripDetailsText, url: 'https://www.skyscanner.co.kr/' },
        { icon: <BedDouble className="w-6 h-6 text-purple-400" />, title: '숙소 예약이 필요하신가요?', description: '지금바로 최저가 숙박을 확인해보세요.', details: tripDetailsText, url: '#' },
        { icon: <Ticket className="w-6 h-6 text-orange-400" />, title: '관광지입장권 및 액티비티 티켓을 확인하세요.', description: '미리 예약하면 더욱 저렴하게 이용가능해요.', url: '#' },
        { icon: <Bus className="w-6 h-6 text-green-400" />, title: '현지 교통준비는 어떻게 하세요?', description: '버스,지하철,기차 패스로 편리하게 이용하세요.', url: '#' },
        { icon: <Wifi className="w-6 h-6 text-yellow-400" />, title: '현지 유심 또는 이심을 사용하실꺼면?', description: '사용일수 및 용량을 나에게 맞게 선택해보세요.', url: '#' },
        { icon: <Shield className="w-6 h-6 text-teal-400" />, title: '여행보험 가입은 하셨나요?', description: '예상치 못한 상황에 대비해 안전한 여행을 준비하세요.', url: '#' },
    ];

    return (
        <div className="max-w-[1100px] mx-auto">
             {trip && (
                 <div className="mb-8">
                    <Link to={`/app/trip/${trip.id}`} className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-4">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        '{trip.title}' 여행으로 돌아가기
                    </Link>
                </div>
            )}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">여행 필수 체크</h1>
                <p className="text-gray-400 mt-1">여행을 떠나기 전 필요한 모든 것을 확인하고 준비하세요.</p>
            </div>
            <div className="space-y-3">
                {affiliateItems.map((item, index) => (
                    <a 
                        key={index} 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group animate-fade-in-up"
                        style={{ animationDelay: `${index * 75}ms` }}
                    >
                        <div className="mr-4 flex-shrink-0">{item.icon}</div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white">{item.title}</h3>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                            {item.details && <p className="text-xs text-blue-300 mt-2">{item.details}</p>}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 ml-4 group-hover:text-white transition-colors" />
                    </a>
                ))}
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default TravelChecklist;
