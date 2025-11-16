
import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import { Trip, ItineraryDay, ItineraryItem } from '../types';
import { Plus, Calendar, Users, ChevronLeft, Pencil, ChevronRight, Trophy } from 'lucide-react';
import ItineraryItemCard from '../components/itinerary/ItineraryItem';
import AddItineraryItemModal from '../components/itinerary/AddItineraryItemModal';
// FIX: Corrected import path for EditItineraryItemModal. The component exists in `components/` not `components/itinerary/`.
import EditItineraryItemModal from '../components/EditItineraryItemModal';
import ImageGalleryModal from '../components/common/ImageGalleryModal';
import EditChallengePlanModal from '../components/challenge/EditChallengePlanModal';


const MOCK_CHALLENGE_PLAN_TEMPLATE: Trip = {
  id: 'challenge-kyoto-1',
  title: '나만의 교토 힐링 여행', // Default title, user can change
  destination: '일본, 교토', // Fixed
  startDate: '2024-11-19', // Fixed
  endDate: '2024-11-22', // Fixed
  members: [MOCK_USER], // Fixed
  itinerary: [
      { date: '2024-11-19', items: [] },
      { date: '2024-11-20', items: [] },
      { date: '2024-11-21', items: [] },
      { date: '2024-11-22', items: [] },
  ],
  isPublic: false,
  coverImage: 'https://cdn.pixabay.com/photo/2021/11/28/03/48/travel-6829291_1280.jpg', // Default image
  comments: [],
};


interface UpdatedPlanData {
    title: string;
    coverImage: string;
}


const PlanChallengeSubmit: React.FC = () => {
    const [plan, setPlan] = useState<Trip | null>(JSON.parse(JSON.stringify(MOCK_CHALLENGE_PLAN_TEMPLATE)));
    const [activeDayIndex, setActiveDayIndex] = useState(0);

    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const checkScrollButtons = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const isScrollable = el.scrollWidth > el.clientWidth;
            setShowLeftScroll(isScrollable && el.scrollLeft > 5);
            setShowRightScroll(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
        }
    }, []);

    useLayoutEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            checkScrollButtons();
            scrollContainer.addEventListener('scroll', checkScrollButtons, { passive: true });
            const resizeObserver = new ResizeObserver(checkScrollButtons);
            resizeObserver.observe(scrollContainer);

            return () => {
                scrollContainer.removeEventListener('scroll', checkScrollButtons);
                resizeObserver.disconnect();
            };
        }
    }, [plan, checkScrollButtons]);
    
    const handleScroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.7;
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    const handleOpenGallery = (images: string[], startIndex: number) => {
        setGalleryImages(images);
        setGalleryStartIndex(startIndex);
        setIsGalleryOpen(true);
    };

    const handleAddItem = (newItemData: Omit<ItineraryItem, 'id'>) => {
        if (!plan || activeDayIndex < 0) return;

        const newItem: ItineraryItem = {
            id: String(Date.now()),
            ...newItemData
        };
        
        setPlan(prevPlan => {
            if (!prevPlan) return null;
            const newItinerary = [...prevPlan.itinerary];
            if (newItinerary[activeDayIndex]) {
                 newItinerary[activeDayIndex] = {
                    ...newItinerary[activeDayIndex],
                    items: [...newItinerary[activeDayIndex].items, newItem].sort((a, b) => a.time.localeCompare(b.time))
                 };
            }
            return { ...prevPlan, itinerary: newItinerary };
        });
        setIsAddItemModalOpen(false);
    };

    const handleOpenEditItemModal = (item: ItineraryItem) => {
        setEditingItem(item);
        setIsEditItemModalOpen(true);
    };

    const handleUpdateItem = (updatedItem: ItineraryItem) => {
        if (!plan) return;
        setPlan(prevPlan => {
            if (!prevPlan) return null;
            const newItinerary = prevPlan.itinerary.map(day => {
                const activeDay = prevPlan.itinerary[activeDayIndex];
                if (day.date === activeDay?.date) {
                    const newItems = day.items.map(item => item.id === updatedItem.id ? updatedItem : item).sort((a, b) => a.time.localeCompare(b.time));
                    return { ...day, items: newItems };
                }
                return day;
            });
            return { ...prevPlan, itinerary: newItinerary };
        });
        setIsEditItemModalOpen(false);
        setEditingItem(null);
    };

    const handleUpdatePlan = (updatedPlanData: UpdatedPlanData) => {
        setPlan(prevPlan => {
            if (!prevPlan) return null;
            return { ...prevPlan, ...updatedPlanData };
        });
        setIsEditPlanModalOpen(false);
    };

    if (!plan) {
        return <div className="text-center text-white">플랜 정보를 불러오는 중...</div>;
    }
    
    const formatDateForTab = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const dayOfMonth = date.getDate();
        const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date).replace('요일','');
        return `${month}/${dayOfMonth}(${dayOfWeek})`;
    };

    const activeDay: ItineraryDay | undefined = plan.itinerary[activeDayIndex];

    return (
        <div className="max-w-[1100px] mx-auto">
            <div 
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-slate-800 bg-cover bg-center"
                style={{ backgroundImage: `url(${plan.coverImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                <div className="absolute top-4 left-4 z-10">
                    <Link to="/app/plan-challenge/ongoing" className="flex items-center bg-slate-900/50 backdrop-blur-sm text-white hover:bg-slate-800/70 text-sm py-2 px-3 rounded-full transition-all">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        진행중인 챌린지로
                    </Link>
                </div>
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                    <button 
                        onClick={() => setIsEditPlanModalOpen(true)}
                        className="flex items-center justify-center w-10 h-10 bg-slate-900/50 backdrop-blur-sm text-white hover:bg-slate-800/70 rounded-full transition-all"
                        aria-label="플랜 정보 수정"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    <div>
                        <span className="inline-flex items-center bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                            <Trophy className="w-3 h-3 mr-1.5" />
                            챌린지
                        </span>
                        <p className="text-gray-200 font-semibold">{plan.destination}</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 drop-shadow-lg">{plan.title}</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-4 text-gray-200 text-sm gap-2 sm:gap-0">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{plan.startDate} ~ {plan.endDate}</span>
                            </div>
                            <div className="hidden sm:block border-l border-slate-400 h-4 mx-4"></div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                <span>인원: 4명</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mb-6">
                <div className="bg-slate-800 rounded-full p-1.5 flex items-center w-full">
                    {showLeftScroll && (
                        <button 
                            onClick={() => handleScroll('left')}
                            className="hidden md:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-slate-700 transition-colors"
                            aria-label="이전 날짜로 스크롤"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                    <div 
                        ref={scrollContainerRef}
                        className="flex-grow flex items-center overflow-x-auto no-scrollbar space-x-1"
                    >
                        {plan.itinerary.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveDayIndex(index)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                    activeDayIndex === index
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-400 hover:text-white hover:bg-slate-700/60'
                                }`}
                            >
                                {formatDateForTab(day.date)}
                            </button>
                        ))}
                    </div>
                    {showRightScroll && (
                        <button 
                            onClick={() => handleScroll('right')}
                            className="hidden md:flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-slate-700 transition-colors"
                            aria-label="다음 날짜로 스크롤"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="pb-28">
                {activeDay && activeDay.items.length > 0 ? (
                     <div className="space-y-4">
                        {activeDay.items.map(item => (
                            <ItineraryItemCard key={item.id} item={item} onOpenGallery={handleOpenGallery} onEdit={handleOpenEditItemModal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800 rounded-lg">
                        <p className="text-gray-400">이 날짜에 대한 일정이 없습니다.</p>
                        <p className="text-gray-500 text-sm mt-1">일정을 추가하여 플랜을 채워보세요.</p>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-20 md:left-64">
                <div className="bg-slate-900/80 backdrop-blur-sm p-4 border-t border-slate-700">
                    <div className="max-w-[1100px] mx-auto text-center">
                        <p className="text-sm text-gray-400">
                            응모마감 기간까지 언제든지 수정하실 수 있으며 응모기간이 지나면 자동으로 등록된 내용이 제출됩니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <button
                onClick={() => setIsAddItemModalOpen(true)}
                className="fixed bottom-24 right-8 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 z-20"
                aria-label="일정 추가"
            >
                <Plus className="w-7 h-7" />
            </button>
            
            <AddItineraryItemModal
                isOpen={isAddItemModalOpen}
                onClose={() => setIsAddItemModalOpen(false)}
                onAddItem={handleAddItem}
                dayDate={activeDay?.date}
            />

            <EditItineraryItemModal
                isOpen={isEditItemModalOpen}
                onClose={() => {
                    setIsEditItemModalOpen(false);
                    setEditingItem(null);
                }}
                onUpdateItem={handleUpdateItem}
                itemToEdit={editingItem}
                dayDate={activeDay?.date}
            />

            <EditChallengePlanModal
                isOpen={isEditPlanModalOpen}
                onClose={() => setIsEditPlanModalOpen(false)}
                onUpdatePlan={handleUpdatePlan}
                planToEdit={plan}
            />

            <ImageGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={galleryImages}
                startIndex={galleryStartIndex}
            />
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default PlanChallengeSubmit;
