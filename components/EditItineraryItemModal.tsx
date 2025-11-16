
import React, { useState, useEffect } from 'react';
import { X, Clock, Type, FileText, Link as LinkIcon, Image as ImageIcon, Plus, Trash2, Tag } from 'lucide-react';
import { Category, ItineraryItem } from '../types';

const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'short' };
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

interface EditItineraryItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateItem: (itemData: ItineraryItem) => void;
    dayDate?: string;
    itemToEdit: ItineraryItem | null;
}

const EditItineraryItemModal: React.FC<EditItineraryItemModalProps> = ({ isOpen, onClose, onUpdateItem, dayDate, itemToEdit }) => {
    const [category, setCategory] = useState<Category>(Category.Place);
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState<{ title: string; url: string }[]>([]);
    const [images, setImages] = useState<string[]>([]);

    const [currentLinkTitle, setCurrentLinkTitle] = useState('');
    const [currentLinkUrl, setCurrentLinkUrl] = useState('');
    
    const [imageSourceType, setImageSourceType] = useState<'url' | 'upload'>('url');
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
        if (isOpen && itemToEdit) {
            setCategory(itemToEdit.category);
            setTime(itemToEdit.time);
            setTitle(itemToEdit.title);
            setDescription(itemToEdit.description || '');
            setLinks(itemToEdit.links || []);
            setImages(itemToEdit.images || []);
        } else if (!isOpen) {
            // Reset form fields on close
            setCategory(Category.Place);
            setTime('');
            setTitle('');
            setDescription('');
            setLinks([]);
            setImages([]);
            setCurrentLinkTitle('');
            setCurrentLinkUrl('');
            setImageSourceType('url');
            setCurrentImageUrl('');
        }
    }, [isOpen, itemToEdit]);

    const handleAddLink = () => {
        if (currentLinkTitle.trim() && currentLinkUrl.trim()) {
            setLinks([...links, { title: currentLinkTitle.trim(), url: currentLinkUrl.trim() }]);
            setCurrentLinkTitle('');
            setCurrentLinkUrl('');
        }
    };
    
    const handleRemoveLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = e.target.files;
            const imagePromises: Promise<string>[] = [];
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList.item(i);
                if (file) {
                    imagePromises.push(
                        new Promise<string>((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result as string);
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        })
                    );
                }
            }

            Promise.all(imagePromises).then(base64Images => {
                setImages(prev => [...prev, ...base64Images]);
            });
        }
    };
    
    const handleAddImageUrl = () => {
        if (currentImageUrl.trim()) {
            try {
                new URL(currentImageUrl.trim()); // Basic validation
                setImages(prev => [...prev, currentImageUrl.trim()]);
                setCurrentImageUrl('');
            } catch (error) {
                alert('유효하지 않은 URL 형식입니다.');
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!time.trim() || !title.trim() || !itemToEdit) {
            alert('시간과 타이틀을 모두 입력해주세요.');
            return;
        }
        onUpdateItem({
            id: itemToEdit.id,
            time,
            category,
            title,
            description,
            links,
            images,
        });
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-lg relative text-white animate-fade-in max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex-shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-bold">일정 수정</h2>
                    <p className="text-sm text-blue-400">{formatDate(dayDate)}</p>
                </header>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6 overflow-y-auto flex-1 pr-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="edit-category" className="flex items-center text-sm font-medium text-gray-300 mb-1"><Tag size={14} className="mr-2" />카테고리</label>
                            <select id="edit-category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10">
                                {Object.values(Category).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="edit-time" className="flex items-center text-sm font-medium text-gray-300 mb-1"><Clock size={14} className="mr-2" />시간</label>
                            <input id="edit-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="edit-title" className="flex items-center text-sm font-medium text-gray-300 mb-1"><Type size={14} className="mr-2" />타이틀</label>
                        <input id="edit-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="예: 시부야 스카이 전망대" required />
                    </div>
                    <div>
                        <label htmlFor="edit-description" className="flex items-center text-sm font-medium text-gray-300 mb-1"><FileText size={14} className="mr-2" />한 줄 설명</label>
                        <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none" placeholder="예: 미리 티켓 예매하기"></textarea>
                    </div>
                    
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-1"><LinkIcon size={14} className="mr-2" />링크</label>
                        <div className="flex items-center space-x-2">
                            <input type="text" value={currentLinkTitle} onChange={(e) => setCurrentLinkTitle(e.target.value)} placeholder="링크 이름" className="w-1/3 bg-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="url" value={currentLinkUrl} onChange={(e) => setCurrentLinkUrl(e.target.value)} placeholder="https://example.com" className="flex-1 bg-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="button" onClick={handleAddLink} className="p-2 rounded-md text-white bg-slate-600 hover:bg-slate-500 transition-colors"><Plus size={18} /></button>
                        </div>
                        <div className="mt-2 space-y-2">
                            {links.map((link, index) => (
                                <div key={index} className="flex items-center justify-between bg-slate-700/50 p-2 rounded-md text-sm">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline truncate">{link.title}: {link.url}</a>
                                    <button type="button" onClick={() => handleRemoveLink(index)} className="ml-2 text-gray-400 hover:text-red-400"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2"><ImageIcon size={14} className="mr-2" />이미지</label>
                        <div className="flex border border-slate-600 rounded-md p-1 mb-3 bg-slate-900 w-full">
                            <button type="button" onClick={() => setImageSourceType('url')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'url' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>URL</button>
                            <button type="button" onClick={() => setImageSourceType('upload')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'upload' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>파일 업로드</button>
                        </div>
                        
                        {imageSourceType === 'url' ? (
                             <div className="flex items-center space-x-2">
                                <input
                                    type="url"
                                    value={currentImageUrl}
                                    onChange={(e) => setCurrentImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1 bg-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button type="button" onClick={handleAddImageUrl} className="p-2 rounded-md text-white bg-slate-600 hover:bg-slate-500 transition-colors">
                                    <Plus size={18} />
                                </button>
                            </div>
                        ) : (
                            <input id="edit-images" type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"/>
                        )}

                        {images.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {images.map((imgSrc, index) => (
                                    <div key={index} className="relative group aspect-square">
                                        <img src={imgSrc} alt={`upload preview ${index}`} className="w-full h-full object-cover rounded-md" />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>

                <div className="flex justify-end pt-6 space-x-3 flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-300 bg-slate-700 hover:bg-slate-600 transition-colors">취소</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 font-semibold transition-colors">수정하기</button>
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

export default EditItineraryItemModal;
