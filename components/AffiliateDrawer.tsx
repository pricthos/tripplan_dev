
import React from 'react';
import { Trip } from '../types';
import { X, ChevronRight, Plane, BedDouble, Ticket, Bus, Wifi, Shield } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface AffiliateDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    trip?: Trip | null;
}

const AffiliateDrawer: React.FC<AffiliateDrawerProps> = ({ isOpen, onClose, trip }) => {
    
    const tripDetailsText = trip ? `${trip.startDate.replace(/-/g, '.')} ~ ${trip.endDate.replace(/-/g, '.')} / ${trip.destination.split(',')[1]?.trim() || trip.destination} / 성인 ${trip.members.length}명` : undefined;

    let skyscannerUrl = '#';
    if (trip) {
        const destinationParts = trip.destination.split(',').map(s => s.trim());
        const country = destinationParts[0];
        const city = destinationParts[1];

        const destinationInfo = DESTINATIONS.find(d => d.country === country && d.city === city);
        const airportCode = destinationInfo ? destinationInfo.airportCode.toLowerCase() : '';

        if (airportCode) {
            const departureAirport = 'icn'; // 출발지는 인천으로 고정
            const arrivalAirport = airportCode;
            
            const formatDateForSkyscanner = (dateString: string) => {
                const date = new Date(dateString);
                const year = date.getFullYear().toString().slice(-2);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year}${month}${day}`;
            };

            const startDateFormatted = formatDateForSkyscanner(trip.startDate);
            const endDateFormatted = formatDateForSkyscanner(trip.endDate);
            
            const numberOfAdults = trip.members.length;

            skyscannerUrl = `https://www.skyscanner.co.kr/transport/flights/${departureAirport}/${arrivalAirport}/${startDateFormatted}/${endDateFormatted}/?adultsv2=${numberOfAdults}&cabinclass=economy`;
        }
    }

    const affiliateItems = [
        {
            icon: <Plane className="w-6 h-6 text-blue-400" />,
            title: '항공권예약을 알아보세요',
            description: '다양한 항공편의 가격을 확인해보세요.',
            details: tripDetailsText,
            url: skyscannerUrl,
        },
        {
            icon: <BedDouble className="w-6 h-6 text-purple-400" />,
            title: '숙소 예약이 필요하신가요?',
            description: '지금바로 최저가 숙박을 확인해보세요.',
            details: tripDetailsText,
            url: '#',
        },
        {
            icon: <Ticket className="w-6 h-6 text-orange-400" />,
            title: '관광지입장권 및 액티비티 티켓을 확인하세요.',
            description: '미리 예약하면 더욱 저렴하게 이용가능해요.',
            url: '#',
        },
        {
            icon: <Bus className="w-6 h-6 text-green-400" />,
            title: '현지 교통준비는 어떻게 하세요?',
            description: '버스,지하철,기차 패스로 편리하게 이용하세요.',
            url: '#',
        },
        {
            icon: <Wifi className="w-6 h-6 text-yellow-400" />,
            title: '현지 유심 또는 이심을 사용하실꺼면?',
            description: '사용일수 및 용량을 나에게 맞게 선택해보세요.',
            url: '#',
        },
        {
            icon: <Shield className="w-6 h-6 text-teal-400" />,
            title: '여행보험 가입은 하셨나요?',
            description: '예상치 못한 상황에 대비해 안전한 여행을 준비하세요.',
            url: '#',
        },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

            {/* Drawer */}
            <div
                className={`absolute top-0 right-0 h-full bg-slate-800 shadow-2xl w-[90vw] max-w-md transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                        <h2 className="text-lg font-bold text-white">여행 필수 체크</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="닫기">
                            <X size={24} />
                        </button>
                    </header>

                    {/* Content */}
                    <main className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-3">
                            {affiliateItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
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
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AffiliateDrawer;
