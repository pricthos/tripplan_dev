
import React, { useState, useEffect } from 'react';
import { BoardCategory } from '../../types';
import { X, Type, FileText, Image as ImageIcon, Tag } from 'lucide-react';

interface PostData {
    category: BoardCategory;
    title: string;
    content: string;
    thumbnail?: string;
}

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPost: (postData: PostData) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onAddPost }) => {
    const [category, setCategory] = useState<BoardCategory>(BoardCategory.General);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const [imageSourceType, setImageSourceType] = useState<'url' | 'upload'>('url');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (imagePreview && thumbnailFile) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview, thumbnailFile]);

    useEffect(() => {
        if (!isOpen) {
            setCategory(BoardCategory.General);
            setTitle('');
            setContent('');
            setImageSourceType('url');
            setThumbnailUrl('');
            setThumbnailFile(null);
            setImagePreview(null);
        }
    }, [isOpen]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setThumbnailUrl(url);
        setImagePreview(url);
        setThumbnailFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setThumbnailFile(file);
            setThumbnailUrl('');
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }
        
        const addPostWithImage = (imageData?: string) => {
            onAddPost({ category, title, content, thumbnail: imageData });
        };

        if (imageSourceType === 'upload' && thumbnailFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                addPostWithImage(reader.result as string);
            };
            reader.readAsDataURL(thumbnailFile);
        } else {
            addPostWithImage(thumbnailUrl || undefined);
        }
    };

    if (!isOpen) return null;

    const isSubmitDisabled = !title.trim() || !content.trim();

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
                    <h2 className="text-2xl font-bold">새 게시글 작성</h2>
                </header>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6 overflow-y-auto flex-1 pr-2">
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2"><Tag size={14} className="mr-2" />카테고리</label>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(BoardCategory).map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                                        category === cat ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-300 mb-1"><Type size={14} className="mr-2" />제목</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="제목을 입력하세요" required />
                    </div>
                    
                    <div>
                        <label htmlFor="content" className="flex items-center text-sm font-medium text-gray-300 mb-1"><FileText size={14} className="mr-2" />내용</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-y" placeholder="내용을 입력하세요" required></textarea>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2"><ImageIcon size={14} className="mr-2" />썸네일 (선택)</label>
                        <div className="flex border border-slate-600 rounded-md p-1 mb-3 bg-slate-900 w-full">
                            <button type="button" onClick={() => setImageSourceType('url')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'url' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>URL</button>
                            <button type="button" onClick={() => setImageSourceType('upload')} className={`w-1/2 text-center py-1 text-sm rounded-md transition-colors ${imageSourceType === 'upload' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-slate-700'}`}>파일 업로드</button>
                        </div>

                        {imageSourceType === 'url' ? (
                            <input type="url" value={thumbnailUrl} onChange={handleUrlChange} className="w-full bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
                        ) : (
                             <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-lg border-2 border-dashed border-slate-600 hover:border-blue-500 transition-colors flex items-center justify-center p-4 text-center h-24">
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">
                                        <span className="font-semibold text-blue-400">파일 선택</span> 또는 드래그 앤 드롭
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                                </div>
                            </label>
                        )}
                        
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-400 mb-2">이미지 미리보기:</p>
                                <img src={imagePreview} alt="Thumbnail preview" className="w-full h-auto max-h-40 object-contain rounded-lg bg-slate-900/50 p-1 border border-slate-700"/>
                            </div>
                        )}
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

export default CreatePostModal;