
import React, { useState, useEffect } from 'react';
import { Trip } from '../types';
import { X } from 'lucide-react';

interface UpdatedPlanData {
    title: string;
    coverImage: string;
}

interface EditChallengePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdatePlan: (planData: UpdatedPlanData) => void;
    planToEdit: Trip | null;
}

const EditChallengePlanModal: React.FC<EditChallengePlanModalProps> = ({ isOpen, onClose, onUpdatePlan, planToEdit }) => {
    const [title, setTitle] = useState('');
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
        if (isOpen && planToEdit) {
            setTitle(planToEdit.title);
            setImageSourceType('url');
            setCoverImageUrl(planToEdit.coverImage);
            setImagePreview(planToEdit.coverImage);
            setCoverImageFile(null);
        } else if (!isOpen) {
            setTitle('');
            setImageSourceType('url');
            setCoverImageUrl('');
            setCoverImageFile(null);
            setImagePreview(null);
        }
    }, [isOpen, planToEdit]);
    
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
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        
        const updatePlanWithImage = (imageData: string) => {
            onUpdatePlan({ title, coverImage: imageData });
        };

        if (imageSourceType === 'upload' && coverImageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePlanWithImage(reader.result as string);
            };
            reader.readAsDataURL(coverImageFile);
        } else {
            const finalImageUrl = coverImageUrl || `https://picsum.photos/seed/${encodeURIComponent(title)}/800/600`;
            updatePlanWithImage(finalImageUrl);
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
                <h2 className="text-2xl font-bold mb-6">플랜 정보 수정</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="edit-plan-title" className="block text-sm font-medium text-gray-300 mb-1">제목</label>
                        <input id="edit-plan-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="예: 나만의 교토 힐링 여행" required />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">대표 이미지</label>
                        <div className="flex border border-slate-600 rounded-md p-1 mb-3 bg-slate-900 w-full">
                            <button type="button" onClick={() => setImageSourceType('url')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'url' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>URL</button>
                            <button type="button" onClick={() => setImageSourceType('upload')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'upload' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>파일 업로드</button>
                        </div>

                        {imageSourceType === 'url' ? (
                            <input id="edit-plan-coverImageUrl" type="url" value={coverImageUrl} onChange={handleUrlChange} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
                        ) : (
                            <div>
                                <label htmlFor="edit-plan-file-upload" className="relative cursor-pointer bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 hover:border-blue-500 transition-colors flex flex-col items-center justify-center p-6 text-center h-32">
                                    <input id="edit-plan-file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
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

export default EditChallengePlanModal;
