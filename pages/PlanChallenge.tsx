
import React from 'react';
import { Trophy } from 'lucide-react';

const PlanChallenge: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto text-center py-20">
      <div className="inline-block bg-slate-800 p-6 rounded-full mb-6">
        <Trophy className="w-16 h-16 text-yellow-400" />
      </div>
      <h1 className="text-3xl font-bold text-white">플랜 챌린지</h1>
      <p className="text-gray-400 mt-2 max-w-md mx-auto">
        매월 새로운 주제로 최고의 여행 플랜에 도전하고 특별한 보상을 받으세요!
        <br />
        이 기능은 현재 준비 중입니다. 곧 만나요!
      </p>
    </div>
  );
};

export default PlanChallenge;
