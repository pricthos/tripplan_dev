
import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_TRIPS, MOCK_USER } from '../constants';
import { Trip, ItineraryDay, Comment, User, ItineraryItem } from '../types';
import { Plus, Calendar, Users, ChevronLeft, Share2, MessageSquare, SearchCheck, Pencil, ChevronRight } from 'lucide-react';
import ItineraryItemCard from '../components/itinerary/ItineraryItem';
import TripCommentsModal from '../components/trip/TripCommentsModal';
import MemberManagementModal from '../components/trip/MemberManagementModal';
import AddItineraryItemModal from '../components/itinerary/AddItineraryItemModal';
import EditItineraryItemModal from '../components/itinerary/EditItineraryItemModal';
import ImageGalleryModal from '../components/common/ImageGalleryModal';
import EditTripModal from '../components/trip/EditTripModal';
import AffiliateDrawer from '../components/trip/AffiliateDrawer';

interface UpdatedTripData {
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    coverImage: string;
}


const TripDetail: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    const [isAffiliateDrawerOpen, setIsAffiliateDrawerOpen] = useState(false);

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const affiliateMessages = [
        "항공권 예약이 필요하신가요?",
        "숙소 예약을 하셨나요?",
        "액티비티 할인을 알아보세요",
        "유심 또는 이심 준비 하셨어요?",
        "현지 교통 알아보셨어요?",
        "관광지티켓 할인받고 즐기세요",
    ];

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
    }, [trip, checkScrollButtons]);
    
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


    useEffect(() => {
        const foundTrip = MOCK_TRIPS.find(t => t.id === tripId);
        if (foundTrip) {
            setTrip(JSON.parse(JSON.stringify(foundTrip)));
        } else {
            setTrip(null);
        }
    }, [tripId]);
    
    useEffect(() => {
        const interval = window.setInterval(() => {
            setCurrentMessageIndex(prevIndex => (prevIndex + 1) % affiliateMessages.length);
        }, 3000);
        
        return () => {
            clearInterval(interval);
        };
    }, [affiliateMessages.length]);
    
    const handleOpenGallery = (images: string[], startIndex: number) => {
        setGalleryImages(images);
        setGalleryStartIndex(startIndex);
        setIsGalleryOpen(true);
    };

    const handleCloseGallery = () => {
        setIsGalleryOpen(false);
    };

    const handleAddItem = (newItemData: Omit<ItineraryItem, 'id'>) => {
        if (!trip || activeDayIndex < 0) return;

        const newItem: ItineraryItem = {
            id: String(Date.now()),
            ...newItemData
        };
        
        setTrip(prevTrip => {
            if (!prevTrip) return null;

            const newItinerary = [...prevTrip.itinerary];
            if (newItinerary[activeDayIndex]) {
                 newItinerary[activeDayIndex] = {
                    ...newItinerary[activeDayIndex],
                    items: [...newItinerary[activeDayIndex].items, newItem].sort((a, b) => a.time.localeCompare(b.time))
                 };
            }

            return {
                ...prevTrip,
                itinerary: newItinerary
            };
        });

        setIsAddItemModalOpen(false);
    };

    const handleOpenEditItemModal = (item: ItineraryItem) => {
        setEditingItem(item);
        setIsEditItemModalOpen(true);
    };

    const handleUpdateItem = (updatedItem: ItineraryItem) => {
        if (!trip) return;

        setTrip(prevTrip => {
            if (!prevTrip) return null;

            const newItinerary = prevTrip.itinerary.map(day => {
                const activeDay = prevTrip.itinerary[activeDayIndex];
                if (day.date === activeDay?.date) {
                    const newItems = day.items.map(item =>
                        item.id === updatedItem.id ? updatedItem : item
                    ).sort((a, b) => a.time.localeCompare(b.time));
                    return { ...day, items: newItems };
                }
                return day;
            });

            return { ...prevTrip, itinerary: newItinerary };
        });
        setIsEditItemModalOpen(false);
        setEditingItem(null);
    };

    const handleUpdateTrip = (updatedTripData: UpdatedTripData) => {
        if (!trip) return;

        const newItinerary: ItineraryDay[] = [];
        const start = new Date(updatedTripData.startDate);
        const end = new Date(updatedTripData.endDate);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start <= end) {
            let current = new Date(start);
            while (current <= end) {
                const dateStr = current.toISOString().split('T')[0];
                const existingDay = trip.itinerary.find(day => day.date === dateStr);
                newItinerary.push({
                    date: dateStr,
                    items: existingDay ? existingDay.items : [],
                });
                current.setDate(current.getDate() + 1);
            }
        }

        setTrip(prevTrip => {
            if (!prevTrip) return null;
            return {
                ...prevTrip,
                ...updatedTripData,
                itinerary: newItinerary,
            };
        });

        // This would be where you'd make an API call in a real app
        const tripIndex = MOCK_TRIPS.findIndex(t => t.id === tripId);
        if (tripIndex !== -1) {
            MOCK_TRIPS[tripIndex] = {
                ...MOCK_TRIPS[tripIndex],
                ...updatedTripData,
                itinerary: newItinerary,
            };
        }
        setIsEditTripModalOpen(false);
    };


    const handleAddComment = (text: string) => {
        if (!text.trim() || !trip) return;
        const newComment: Comment = {
            id: String(Date.now()),
            user: MOCK_USER,
            text: text.trim(),
            timestamp: new Date().toISOString(),
        };
        setTrip(prevTrip => {
            if (!prevTrip) return null;
            return {
                ...prevTrip,
                comments: [...prevTrip.comments, newComment],
            };
        });
    };
    
    const handleInviteMember = (email: string) => {
        if (!email.trim() || !trip) return;
    
        if (trip.members.some(m => m.email.toLowerCase() === email.trim().toLowerCase())) {
            alert('이미 초대된 멤버입니다.');
            return;
        }
    
        const newUser: User = {
            name: email.split('@')[0],
            email: email.trim(),
            avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email.trim())}`
        };
    
        setTrip(prevTrip => {
            if (!prevTrip) return null;
            return {
                ...prevTrip,
                members: [...prevTrip.members, newUser],
            };
        });
    };

    if (!trip) {
        return <div className="text-center text-white">여행 정보를 불러오는 중...</div>;
    }
    
    const formatDateForTab = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const dayOfMonth = date.getDate();
        const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date).replace('요일','');
        return `${month}/${dayOfMonth}(${dayOfWeek})`;
    };

    const activeDay: ItineraryDay | undefined = trip.itinerary[activeDayIndex];

    return (
        <div className="max-w-[1100px] mx-auto">
            <div 
                className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-slate-800 bg-cover bg-center"
                style={{ backgroundImage: `url(${trip.coverImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute top-4 left-4 z-10">
                    <Link to="/app/my-trips" className="flex items-center bg-slate-900/50 backdrop-blur-sm text-white hover:bg-slate-800/70 text-sm py-2 px-3 rounded-full transition-all">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        내 여행으로
                    </Link>
                </div>
                
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                    <button className="flex items-center justify-center w-10 h-10 bg-slate-900/50 backdrop-blur-sm text-white hover:bg-slate-800/70 rounded-full transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setIsEditTripModalOpen(true)}
                        className="flex items-center justify-center w-10 h-10 bg-slate-900/50 backdrop-blur-sm text-white hover:bg-slate-800/70 rounded-full transition-all"
                        aria-label="여행 정보 수정"
                    >
                        <Pencil className="w-5 h-5" />
                    </button>
                </div>

                <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    <div>
                        <p className="text-gray-200 font-semibold">{trip.destination}</p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 drop-shadow-lg">{trip.title}</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-4 text-gray-200 text-sm gap-2 sm:gap-0">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{trip.startDate} ~ {trip.endDate}</span>
                            </div>
                            <div className="hidden sm:block border-l border-slate-400 h-4 mx-4"></div>
                            <button
                                onClick={() => setIsMemberModalOpen(true)}
                                className="flex items-center hover:bg-white/20 p-2 -m-2 rounded-lg transition-colors"
                                aria-label="멤버 관리 및 초대"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                <span>멤버 {trip.members.length}명</span>
                                <Plus className="w-4 h-4 ml-2 text-gray-300" />
                            </button>
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
                        {trip.itinerary.map((day, index) => (
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
                        <p className="text-gray-500 text-sm mt-1">일정을 추가하여 여행을 계획해보세요.</p>
                    </div>
                )}
            </div>
            
            <button
                onClick={() => setIsAffiliateDrawerOpen(true)}
                className="fixed bottom-4 right-48 z-20 group"
                aria-label="여행 필수 체크"
            >
                <div className="speech-bubble cursor-pointer absolute bottom-full right-0 mb-3 w-max max-w-[280px] bg-green-600 text-white text-sm rounded-lg px-4 py-3 shadow-lg transition-all duration-300 animate-fade-in-up">
                    <div key={currentMessageIndex} className="animate-message-switch">
                        {affiliateMessages[currentMessageIndex]}
                    </div>
                </div>
                <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-green-500 transition-all duration-300 transform group-hover:scale-110">
                    <SearchCheck className="w-7 h-7" />
                </div>
            </button>

            <button
                onClick={() => setIsCommentsModalOpen(true)}
                className="fixed bottom-4 right-28 w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-500 transition-all duration-300 transform hover:scale-110 z-20"
                aria-label={`의견 ${trip.comments.length}개 보기`}
            >
                <MessageSquare className="w-7 h-7" />
                {trip.comments && trip.comments.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
                        {trip.comments.length}
                    </span>
                )}
            </button>

            <button
                onClick={() => setIsAddItemModalOpen(true)}
                className="fixed bottom-4 right-8 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 z-20"
                aria-label="일정 추가"
            >
                <Plus className="w-7 h-7" />
            </button>
            
            <TripCommentsModal
                isOpen={isCommentsModalOpen}
                onClose={() => setIsCommentsModalOpen(false)}
                comments={trip.comments}
                onAddComment={handleAddComment}
                currentUser={MOCK_USER}
            />
            
            <MemberManagementModal
                isOpen={isMemberModalOpen}
                onClose={() => setIsMemberModalOpen(false)}
                members={trip.members}
                onInviteMember={handleInviteMember}
            />

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

            <EditTripModal
                isOpen={isEditTripModalOpen}
                onClose={() => setIsEditTripModalOpen(false)}
                onUpdateTrip={handleUpdateTrip}
                tripToEdit={trip}
            />

            <ImageGalleryModal
                isOpen={isGalleryOpen}
                onClose={handleCloseGallery}
                images={galleryImages}
                startIndex={galleryStartIndex}
            />
            
            <AffiliateDrawer
                isOpen={isAffiliateDrawerOpen}
                onClose={() => setIsAffiliateDrawerOpen(false)}
                trip={trip}
            />

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .speech-bubble::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    right: 1.25rem; /* 20px */
                    border-width: 8px;
                    border-style: solid;
                    border-color: #16a34a transparent transparent transparent; /* green-600 */
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
                @keyframes message-switch {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-message-switch {
                    animation: message-switch 0.5s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default TripDetail;
