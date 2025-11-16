
import React from 'react';
import { Search } from 'lucide-react';

const PlanChallengeBrowse: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">플랜 찾아보기</h1>
            <p className="text-gray-400 mt-1">다른 참가자들의 창의적인 여행 플랜들을 둘러보세요.</p>
        </div>
        <div className="text-center py-20 bg-slate-800 rounded-lg">
            <div className="inline-block bg-slate-700 p-6 rounded-full mb-6">
                <Search className="w-16 h-16 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">등록된 플랜이 없습니다.</h2>
            <p className="text-gray-400 mt-2 max-w-md mx-auto">
                챌린지가 시작되면 다른 참가자들의 플랜을 여기서 찾아볼 수 있습니다.
            </p>
        </div>
    </div>
  );
};

export default PlanChallengeBrowse;
