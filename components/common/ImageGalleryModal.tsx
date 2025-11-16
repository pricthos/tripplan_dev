
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    startIndex: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ isOpen, onClose, images, startIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCurrentIndex(startIndex);
    }, [startIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            // Preload current image
            const img = new Image();
            img.src = images[currentIndex];
            img.onload = () => setIsLoaded(true);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, currentIndex]);

    const goToPrevious = () => {
        setIsLoaded(false);
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        setIsLoaded(false);
        const isLast = currentIndex === images.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-title"
        >
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20"
                    aria-label="갤러리 닫기"
                >
                    <X size={32} />
                </button>

                {/* Previous Button */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-3 z-20"
                    aria-label="이전 이미지"
                >
                    <ChevronLeft size={32} />
                </button>

                {/* Image Display */}
                <div className="relative max-w-screen-lg max-h-[90vh] flex items-center justify-center">
                    <img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        className={`max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                    />
                     {!isLoaded && <div className="text-white">로딩 중...</div>}
                </div>


                {/* Next Button */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-3 z-20"
                    aria-label="다음 이미지"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Counter */}
                <div id="gallery-title" className="absolute bottom-4 text-white/80 bg-black/30 px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ImageGalleryModal;
