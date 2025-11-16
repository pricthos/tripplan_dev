
import React from 'react';
import { ItineraryItem } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { Link as LinkIcon, Camera, PencilLine } from 'lucide-react';

interface ItineraryItemCardProps {
    item: ItineraryItem;
    onOpenGallery: (images: string[], startIndex: number) => void;
    onEdit?: (item: ItineraryItem) => void;
}

const ItineraryItemCard: React.FC<ItineraryItemCardProps> = ({ item, onOpenGallery, onEdit }) => {
    return (
        <div className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
            {/* Main content area */}
            <div className="flex items-start">
                <div className="flex items-start flex-1">
                    <div className="flex flex-col items-center mr-4 pt-1">
                        <div className="text-sm font-semibold text-blue-400">{item.time}</div>
                        <div className="text-blue-400 mt-1">
                            {CATEGORY_ICONS[item.category]}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        {item.description && <p className="text-sm text-gray-400 mt-1">{item.description}</p>}
                    </div>
                </div>

                <div className="flex items-start space-x-2 flex-shrink-0 ml-4">
                    {/* Image Thumbnail */}
                    {item.images && item.images.length > 0 && (
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => onOpenGallery(item.images || [], 0)}
                                className="relative group w-16 h-16 rounded-lg overflow-hidden transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500"
                                aria-label={`${item.title} 이미지 ${item.images.length}장 보기`}
                            >
                                <img src={item.images[0]} alt={`${item.title} 대표 이미지`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                {item.images.length > 1 && (
                                    <div className="absolute top-1 right-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-1.5 py-0.5 rounded-full flex items-center">
                                        +{item.images.length - 1}
                                    </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Camera size={20} />
                                </div>
                            </button>
                        </div>
                    )}
                    
                    {/* Edit Button */}
                    {onEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                            }}
                            className="text-gray-400 hover:text-white transition-colors mt-1"
                            aria-label={`${item.title} 일정 수정`}
                        >
                            <PencilLine size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Links section */}
            {item.links && item.links.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                    <div className="flex space-x-2">
                            {item.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 flex items-center text-xs bg-slate-700 text-blue-300 hover:bg-slate-600 px-2.5 py-1 rounded-full transition-colors"
                            >
                                <LinkIcon size={12} className="mr-1.5" />
                                {link.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItineraryItemCard;
