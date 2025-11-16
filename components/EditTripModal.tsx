
import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Trip, Destination } from '../types';
import { X } from 'lucide-react';

interface UpdatedTripData {
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    coverImage: string;
}

interface EditTripModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateTrip: (tripData: UpdatedTripData) => void;
    tripToEdit: Trip | null;
}

const EditTripModal: React.FC<EditTripModalProps> = ({ isOpen, onClose, onUpdateTrip, tripToEdit }) => {
    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const [suggestions, setSuggestions] = useState<Destination[]>([]);
    const [isDestinationFocused, setIsDestinationFocused] = useState(false);

    const [imageSourceType, setImageSourceType] = useState<'url' | 'upload'>('url');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (imagePreview && coverImageFile) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview, coverImageFile]);


    useEffect(() => {
        if (isOpen && tripToEdit) {
            setTitle(tripToEdit.title);
            setDestination(tripToEdit.destination);
            setStartDate(tripToEdit.startDate);
            setEndDate(tripToEdit.endDate);
            
            // Cover image state
            setImageSourceType('url');
            setCoverImageUrl(tripToEdit.coverImage);
            setImagePreview(tripToEdit.coverImage);
            setCoverImageFile(null);
        } else if (!isOpen) {
             // Reset form on close
            setTitle('');
            setDestination('');
            setStartDate('');
            setEndDate('');
            setSuggestions([]);
            setImageSourceType('url');
            setCoverImageUrl('');
            setCoverImageFile(null);
            setImagePreview(null);
        }
    }, [isOpen, tripToEdit]);

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDestination(value);
        if (value.length > 0) {
            const lowerCaseValue = value.toLowerCase();
            const filtered = DESTINATIONS.filter(d => 
                d.city.toLowerCase().includes(lowerCaseValue) ||
                d.country.toLowerCase().includes(lowerCaseValue) ||
                d.airportCode.toLowerCase().includes(lowerCaseValue) ||
                `${d.country}, ${d.city}`.toLowerCase().includes(lowerCaseValue)
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: Destination) => {
        setDestination(`${suggestion.country}, ${suggestion.city}`);
        setSuggestions([]);
    };
    
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setCoverImageUrl(url);
        setImagePreview(url);
        setCoverImageFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImageFile(file);
            setCoverImageUrl('');
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !destination.trim() || !startDate || !endDate) {
            alert('제목, 여행지, 기간을 모두 입력해주세요.');
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert('시작일은 종료일보다 이전이어야 합니다.');
            return;
        }
        
        const updateTripWithImage = (imageData: string) => {
            onUpdateTrip({ title, destination, startDate, endDate, coverImage: imageData });
        };

        if (imageSourceType === 'upload' && coverImageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateTripWithImage(reader.result as string);
            };
            reader.readAsDataURL(coverImageFile);
        } else {
            const finalImageUrl = coverImageUrl || `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600`;
            updateTripWithImage(finalImageUrl);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-lg relative text-white animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6">여행 정보 수정</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-300 mb-1">제목</label>
                        <input id="edit-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="예: 도쿄 3박 4일 미식 여행" required />
                    </div>
                    
                    <div className="relative">
                        <label htmlFor="edit-destination" className="block text-sm font-medium text-gray-300 mb-1">여행지</label>
                        <input id="edit-destination" type="text" value={destination} onChange={handleDestinationChange} onFocus={() => setIsDestinationFocused(true)} onBlur={() => setTimeout(() => setIsDestinationFocused(false), 150)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="도시, 국가, 공항 코드로 검색" autoComplete="off" required />
                        {isDestinationFocused && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-slate-700 border border-slate-600 rounded-md mt-1 shadow-lg max-h-40 overflow-y-auto">
                                {suggestions.map((s, i) => (
                                    <li key={i} className="px-3 py-2 hover:bg-slate-600 cursor-pointer text-sm" onMouseDown={() => handleSuggestionClick(s)}>
                                        {s.country}, {s.city} ({s.airportCode})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">기간</label>
                        <div className="flex items-center space-x-2">
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <span>~</span>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">대표 이미지</label>
                        <div className="flex border border-slate-600 rounded-md p-1 mb-3 bg-slate-900 w-full">
                            <button type="button" onClick={() => setImageSourceType('url')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'url' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>URL</button>
                            <button type="button" onClick={() => setImageSourceType('upload')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'upload' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>파일 업로드</button>
                        </div>

                        {imageSourceType === 'url' ? (
                            <input id="edit-coverImageUrl" type="url" value={coverImageUrl} onChange={handleUrlChange} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
                        ) : (
                            <div>
                                <label htmlFor="edit-file-upload" className="relative cursor-pointer bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 hover:border-blue-500 transition-colors flex flex-col items-center justify-center p-6 text-center h-32">
                                    <input id="edit-file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                    <div className="text-center">
                                        <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        <p className="mt-2 text-sm text-gray-400">
                                            <span className="font-semibold text-blue-400">파일 선택</span> 또는 드래그 앤 드롭
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                                    </div>
                                </label>
                            </div>
                        )}
                        
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-400 mb-2">이미지 미리보기:</p>
                                <img src={imagePreview} alt="Cover image preview" className="w-full h-auto max-h-48 object-contain rounded-lg bg-slate-900/50 p-1 border border-slate-700"/>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-300 bg-slate-700 hover:bg-slate-600 transition-colors">취소</button>
                        <button type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">수정하기</button>
                    </div>
                </form>
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

export default EditTripModal;
