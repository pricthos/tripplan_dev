import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const phrases = [
    "나만의 여행을 그리다",
    "함께의 즐거움을 더하다",
    "세상과 경험을 나누다",
    "새로운 영감을 발견하다",
];

const Main: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showButton, setShowButton] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const next = (index: number) => {
            // After the last phrase, show the final message and button
            if (index >= phrases.length) {
                setActiveIndex(index);
                setShowButton(true);
                return;
            }

            // Show the current phrase
            setActiveIndex(index);

            // Set timeout for the next phrase
            timeoutRef.current = window.setTimeout(() => {
                next(index + 1);
            }, 2500); // 2.5s delay between phrases
        };
        
        // Start the sequence after a short delay for the first phrase
        timeoutRef.current = window.setTimeout(() => {
            next(0);
        }, 500);

        // Cleanup on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    
    return (
        <div className="relative min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center text-center overflow-hidden -m-4 sm:-m-8">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-out animate-ken-burns"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
            
            <div className="relative z-10 px-4">
                <div className="h-24">
                    {phrases.map((phrase, index) => (
                        <h1 
                            key={index}
                            className={`absolute inset-x-0 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl transition-all duration-1000 ease-in-out ${
                                activeIndex === index ? 'animate-fade-in-up' : 'opacity-0'
                            }`}
                        >
                            {phrase}
                        </h1>
                    ))}
                    {activeIndex >= phrases.length && (
                         <h2 className="text-2xl sm:text-3xl font-bold text-blue-300 drop-shadow-lg animate-fade-in-up">
                            TripPlan, 당신의 완벽한 여행 파트너
                         </h2>
                    )}
                </div>
            </div>

            {showButton && (
                <div className="absolute z-10 bottom-24 left-0 right-0">
                    <Link 
                        to="/app/my-trips"
                        className="btn-animate inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transform hover:scale-105"
                    >
                        <Rocket className="w-5 h-5 mr-2" />
                        여행 시작하기
                    </Link>
                </div>
            )}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
                .btn-animate {
                    opacity: 0;
                    animation: fade-in-up 1s ease-out 0.5s forwards;
                }
                @keyframes ken-burns {
                    0% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1.3);
                    }
                }
                .animate-ken-burns {
                    animation: ken-burns 15s ease-in-out infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default Main;