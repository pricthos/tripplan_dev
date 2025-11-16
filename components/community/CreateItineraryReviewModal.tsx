
import React, { useState, useEffect, useRef } from 'react';
import { Trip } from '../../types';
import { MOCK_TRIPS, MOCK_USER } from '../../constants';
import { X, Type, FileText, Briefcase, ChevronDown, Check } from 'lucide-react';

interface PostData {
    title: string;
    content: string;
    trip: Trip;
}

interface CreateItineraryReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPost: (postData: PostData) => void;
}

const CreateItineraryReviewModal: React.FC<CreateItineraryReviewModalProps> = ({ isOpen, onClose, onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTripId, setSelectedTripId] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const userTrips = MOCK_TRIPS.filter(trip => trip.members.some(member => member.email === MOCK_USER.email));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isOpen && isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isDropdownOpen]);


    useEffect(() => {
        if (!isOpen) {
            setTitle('');
            setContent('');
            setSelectedTripId('');
            setIsDropdownOpen(false);
        } else {
            if (userTrips.length > 0 && !selectedTripId) {
                setSelectedTripId(userTrips[0].id);
            }
        }
    }, [isOpen, userTrips]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedTrip = userTrips.find(trip => trip.id === selectedTripId);

        if (!title.trim() || !content.trim() || !selectedTrip) {
            alert('제목, 내용, 그리고 평가받을 여행을 모두 선택해주세요.');
            return;
        }
        
        onAddPost({ title, content, trip: selectedTrip });
    };

    if (!isOpen) return null;
    
    const selectedTrip = userTrips.find(trip => trip.id === selectedTripId);
    const isSubmitDisabled = !title.trim() || !content.trim() || !selectedTripId;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl relative text-white animate-fade-in max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex-shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-bold">일정 조언/평가 요청</h2>
                </header>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6 overflow-y-auto flex-1 pr-2">
                    <div ref={dropdownRef} className="relative">
                        <label htmlFor="trip-select-button" className="flex items-center text-sm font-medium text-gray-300 mb-1"><Briefcase size={14} className="mr-2" />조언받을 여행</label>
                        <button
                            id="trip-select-button"
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full bg-slate-700 rounded-md px-4 py-2.5 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto flex items-center justify-between text-left"
                            disabled={userTrips.length === 0}
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                        >
                            {selectedTrip ? (
                                <div className="flex items-center">
                                    <img src={selectedTrip.coverImage} alt={selectedTrip.title} className="w-10 h-10 object-cover rounded-md mr-3" />
                                    <div>
                                        <p className="font-semibold leading-tight">{selectedTrip.title}</p>
                                        <p className="text-xs text-gray-400 leading-tight">{selectedTrip.destination}</p>
                                    </div>
                                </div>
                            ) : (
                                <span className="text-gray-400">
                                    {userTrips.length > 0 ? "여행을 선택하세요" : "선택할 여행이 없습니다"}
                                </span>
                            )}
                            {userTrips.length > 0 && (
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            )}
                        </button>

                        {isDropdownOpen && userTrips.length > 0 && (
                            <ul
                                className="absolute z-10 w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
                                role="listbox"
                            >
                                {userTrips.map(trip => (
                                    <li
                                        key={trip.id}
                                        className="px-2 py-2 hover:bg-slate-600 cursor-pointer"
                                        onClick={() => {
                                            setSelectedTripId(trip.id);
                                            setIsDropdownOpen(false);
                                        }}
                                        role="option"
                                        aria-selected={selectedTripId === trip.id}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img src={trip.coverImage} alt={trip.title} className="w-10 h-10 object-cover rounded-md mr-3" />
                                                <div>
                                                    <p className="font-semibold text-sm leading-tight">{trip.title}</p>
                                                    <p className="text-xs text-gray-400 leading-tight">{trip.destination}</p>
                                                </div>
                                            </div>
                                            {selectedTripId === trip.id && (
                                                <Check className="w-5 h-5 text-blue-400 mr-2" />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {userTrips.length === 0 && <p className="text-xs text-yellow-400 mt-2">조언을 요청할 여행이 없습니다. 먼저 여행을 만들어주세요.</p>}
                    </div>

                    <div>
                        <label htmlFor="review-title" className="flex items-center text-sm font-medium text-gray-300 mb-1"><Type size={14} className="mr-2" />제목</label>
                        <input id="review-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="예: 도쿄 8박 9일, 너무 빡빡한가요?" required />
                    </div>
                    
                    <div>
                        <label htmlFor="review-content" className="flex items-center text-sm font-medium text-gray-300 mb-1"><FileText size={14} className="mr-2" />내용</label>
                        <textarea id="review-content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-y" placeholder="조언받고 싶은 내용을 구체적으로 작성해주세요." required></textarea>
                    </div>
                </form>

                <div className="flex justify-end pt-6 space-x-3 flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-300 bg-slate-700 hover:bg-slate-600 transition-colors">취소</button>
                    <button type="submit" onClick={handleSubmit} disabled={isSubmitDisabled} className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 font-semibold transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">등록하기</button>
                </div>
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
    );
};

export default CreateItineraryReviewModal;