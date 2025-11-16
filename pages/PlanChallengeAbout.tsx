import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Lightbulb, Target, Award, Calendar, CheckCircle, Rocket } from 'lucide-react';

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; className?: string }> = ({ icon, title, children, className = '' }) => (
    <div className={`bg-slate-800/50 rounded-xl p-8 animate-fade-in-up ${className}`}>
        <div className="flex items-center mb-4">
            <div className="w-8 h-8 flex items-center justify-center mr-3">{icon}</div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <div className="text-gray-300 leading-relaxed pl-11">
            {children}
        </div>
    </div>
);

const TimelineStep: React.FC<{ number: number, title: string, description: string }> = ({ number, title, description }) => (
    <div className="relative pl-12 pb-8 border-l-2 border-slate-700">
        <div className="absolute -left-5 top-0 w-9 h-9 bg-slate-700 text-blue-300 rounded-full flex items-center justify-center font-bold">
            {number}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 mt-1">{description}</p>
    </div>
);


const PlanChallengeAbout: React.FC = () => {
  return (
    <>
        <div 
            className="fixed inset-0 bg-cover bg-center opacity-5 z-0"
            style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_1280.jpg')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto py-8">
            <header className="text-center mb-12 animate-fade-in-up">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-white tracking-tight">플랜챌린지</h1>
                <p className="text-xl text-gray-300 mt-2">당신의 여행 상상이<br/>누군가의 다음 여행이 됩니다.</p>
            </header>

            <div className="space-y-8">
                <Section icon={<Lightbulb className="w-6 h-6 text-blue-400" />} title="✨ 플랜챌린지란?">
                    <p>
                        플랜챌린지는 특정 여행지를 주제로 직접 여행 일정을 기획해 응모하는 <strong className="text-blue-300">참여형 이벤트</strong>입니다.
                        매번 새로운 여행지를 공개하며, 콘셉트에 맞게 구성된 다양한 여행 플랜 중
                        가장 완성도 높고, 사용자 추천을 많이 받은 플랜을 선정합니다.
                    </p>
                </Section>

                <Section icon={<Target className="w-6 h-6 text-green-400" />} title="🎯 참여 방법">
                    <div className="mt-4">
                        <TimelineStep number={1} title="새로운 여행지 공개" description="새로운 챌린지 주제가 공개됩니다." />
                        <TimelineStep number={2} title="플랜 제출" description="응모기간 내 플랜을 제출합니다. (일정표, 설명, 대표 이미지 포함 권장)" />
                        <TimelineStep number={3} title="플랜 공개 및 평가" description="응모 마감 후 제출된 플랜이 공개되고 평가기간이 시작됩니다." />
                        <TimelineStep number={4} title="우수 플랜 선정" description="일반 사용자 추천 + 운영자 심사로 1~3등을 선정합니다." />
                        <TimelineStep number={5} title="결과 발표 및 시상" description="최종 결과가 발표되고 우승자에게는 소정의 상품이 지급됩니다." />
                    </div>
                </Section>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <Section icon={<Award className="w-6 h-6 text-yellow-400" />} title="🏆 시상 및 혜택 예시">
                        <ul className="space-y-3">
                            <li className="flex items-center"><span className="text-lg mr-3">🥇</span> <strong>1등:</strong>&nbsp;네이버페이 5만원권</li>
                            <li className="flex items-center"><span className="text-lg mr-3">🥈</span> <strong>2등:</strong>&nbsp;네이버페이 3만원권</li>
                            <li className="flex items-center"><span className="text-lg mr-3">🥉</span> <strong>3등:</strong>&nbsp;네이버페이 1만원권</li>
                        </ul>
                    </Section>
                    <Section icon={<Calendar className="w-6 h-6 text-purple-400" />} title="🗓️ 진행 일정 예시">
                        <ul className="space-y-2">
                            <li><strong>여행지 공개:</strong> 12월 1일</li>
                            <li><strong>응모기간:</strong> 12월1일 ~ 20일</li>
                            <li><strong>평가기간:</strong> 12월21일 ~ 25일</li>
                            <li><strong>결과 발표:</strong> 12월28일</li>
                        </ul>
                    </Section>
                </div>

                <Section icon={<CheckCircle className="w-6 h-6 text-teal-400" />} title="🌍 심사 기준">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>콘셉트 적합성:</strong> 여행지 주제와의 일치도</li>
                        <li><strong>구성의 완성도:</strong> 동선, 설명, 콘텐츠 품질 등</li>
                        <li><strong>사용자 추천 수:</strong> 좋아요 또는 추천 클릭 수</li>
                    </ul>
                </Section>

                <div 
                    className="relative rounded-xl text-center animate-fade-in-up overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2021/11/28/03/48/travel-6829291_1280.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 p-8">
                        <p className="font-semibold text-white drop-shadow-md">✈️ 이번 챌린지</p>
                        <h3 className="text-3xl font-bold text-white mt-2 drop-shadow-lg">“11월의 여행지 – 교토”</h3>
                        <p className="text-white mt-2 max-w-xl mx-auto drop-shadow-md">고즈넉한 교토의 자연 속에서 나만의 리듬으로 걷는 시간. 숲의 숨결과 고찰의 정취, 그리고 계절이 담긴 교토의 맛까지 더한 플랜을 만들어보세요.</p>
                    </div>
                </div>

                <div className="text-center pt-8 animate-fade-in-up">
                    <p className="text-lg text-gray-300 mb-4">“당신의 계획으로 완성되는 여행, 지금 바로 플랜을 제출하세요.”</p>
                    <Link
                        to="/app/plan-challenge/ongoing"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transform hover:scale-105"
                    >
                        <Rocket className="w-5 h-5 mr-2" />
                        지금 참여하기
                    </Link>
                </div>
            </div>
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
                    animation: fade-in-up 0.6s ease-out forwards;
                }
                .space-y-8 > .animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
                .space-y-8 > .animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
                .space-y-8 > .animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
                .space-y-8 > .animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; opacity: 0; }
                .space-y-8 > .animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; opacity: 0; }
                .pt-8.animate-fade-in-up { animation-delay: 0.6s; opacity: 0; }
            `}</style>
        </div>
    </>
  );
};

export default PlanChallengeAbout;