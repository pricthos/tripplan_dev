
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const Withdrawal: React.FC = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            alert('회원 탈퇴에 동의해주세요.');
            return;
        }
        // In a real app, you would handle the withdrawal logic here.
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/login');
    };

    return (
        <div className="max-w-[1100px] mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">회원 탈퇴</h1>

            <div className="bg-slate-800 rounded-lg p-6 md:p-8">
                {/* Warning Section */}
                <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-6 rounded-lg mb-8">
                    <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2">회원 탈퇴 전 반드시 확인해주세요.</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>
                                    회원 탈퇴 시, <strong className="text-yellow-300">개인정보, 작성한 게시글 및 댓글, 멤버간의 대화기록</strong>은 모두 삭제되며 복구할 수 없습니다.
                                </li>
                                <li>
                                    등록한 <strong className="text-yellow-300">여행일정 및 챌린지에 응모한 일정</strong>은 익명화 처리 후 서비스 개선 및 여행 데이터로 활용될 수 있으며 삭제되지 않습니다.
                                </li>
                                <li>탈퇴 후 30일간 동일한 소셜 계정으로 재가입이 불가능합니다.</li>
                                <li>챌린지 보상 등 모든 혜택이 소멸되며, 재가입 시에도 복원되지 않습니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleWithdraw} className="space-y-8">
                    {/* Reason for Withdrawal Section */}
                    <div>
                        <label htmlFor="reason" className="block text-lg font-semibold text-white mb-3">
                            서비스를 떠나시는 이유가 무엇인가요?
                        </label>
                        <p className="text-sm text-gray-400 mb-4">
                            더 나은 서비스를 만드는 데 소중한 의견으로 활용하겠습니다.
                        </p>
                        <select
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-slate-700 rounded-md px-3 py-3 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">탈퇴 사유를 선택해주세요</option>
                            <option value="inconvenient">서비스 이용이 불편해서</option>
                            <option value="no_feature">원하는 기능이 없어서</option>
                            <option value="low_frequency">이용 빈도가 낮아서</option>
                            <option value="other_service">다른 서비스를 이용해서</option>
                            <option value="other">기타</option>
                        </select>
                        {reason === 'other' && (
                            <textarea
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                placeholder="기타 사유를 입력해주세요."
                                className="w-full mt-3 bg-slate-700 rounded-md px-3 py-2 text-white placeholder-gray-500 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y h-24"
                            />
                        )}
                    </div>

                    {/* Agreement Section */}
                    <div className="border-t border-slate-700 pt-8">
                        <label htmlFor="agreement" className="flex items-start cursor-pointer">
                            <input
                                id="agreement"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-gray-500 bg-slate-700 text-blue-600 focus:ring-blue-500 shrink-0"
                            />
                            <span className="ml-3 text-white">
                                위 내용을 모두 확인했으며, 회원 탈퇴에 동의합니다.
                            </span>
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            to="/app/my-page"
                            className="px-6 py-3 rounded-lg text-gray-300 bg-slate-700 hover:bg-slate-600 font-semibold transition-colors"
                        >
                            취소
                        </Link>
                        <button
                            type="submit"
                            disabled={!agreed}
                            className="px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-500 font-semibold transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            탈퇴하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Withdrawal;
