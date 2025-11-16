import React, { useState, useEffect } from 'react';
import PolicyContent from './PolicyContent';
import { X } from 'lucide-react';

type PolicyType = 'terms' | 'privacy';

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView: PolicyType;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, initialView }) => {
    const [activeTab, setActiveTab] = useState<PolicyType>(initialView);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialView);
        }
    }, [isOpen, initialView]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-3xl relative text-white animate-fade-in max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex-shrink-0 px-4 pt-4">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                    <div className="flex border-b border-slate-700/50 -mx-4 -mt-4 px-4">
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`px-4 py-3 text-base font-semibold transition-colors duration-200 ${
                                activeTab === 'terms' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            이용약관
                        </button>
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`px-4 py-3 text-base font-semibold transition-colors duration-200 ${
                                activeTab === 'privacy' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            개인정보처리방침
                        </button>
                    </div>
                </header>
                <main className="overflow-y-auto flex-1 p-6 md:p-8">
                    <PolicyContent type={activeTab} />
                </main>
                 <footer className="flex-shrink-0 p-4 border-t border-slate-700 text-right">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 font-semibold transition-colors"
                    >
                        확인
                    </button>
                </footer>
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

export default PolicyModal;