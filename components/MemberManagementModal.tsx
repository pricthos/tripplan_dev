
import React, { useState } from 'react';
import { X, Crown } from 'lucide-react';
import { User } from '../types';

interface MemberManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    members: User[];
    onInviteMember: (email: string) => void;
}

const MemberManagementModal: React.FC<MemberManagementModalProps> = ({ isOpen, onClose, members, onInviteMember }) => {
    const [inviteEmail, setInviteEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inviteEmail.trim()) {
            onInviteMember(inviteEmail);
            setInviteEmail('');
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-title"
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-md text-white flex flex-col h-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 id="member-modal-title" className="text-lg font-bold">멤버 관리</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="닫기">
                        <X size={24} />
                    </button>
                </header>

                <div className="p-4 border-b border-slate-700">
                    <h3 className="text-md font-semibold mb-3">멤버 초대</h3>
                    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                        <input
                            type="email"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            placeholder="초대할 멤버의 이메일"
                            className="w-full bg-slate-700 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                            aria-label="초대 이메일 입력"
                            required
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-2 transition-colors flex-shrink-0 disabled:bg-slate-600 disabled:cursor-not-allowed" disabled={!inviteEmail.trim()} aria-label="초대장 보내기">
                            초대
                        </button>
                    </form>
                </div>

                <main className="flex-1 overflow-y-auto p-4">
                     <h3 className="text-md font-semibold mb-3">현재 멤버 ({members.length})</h3>
                     <ul className="space-y-3">
                        {members.map((member, index) => (
                           <li key={member.email} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white mr-3 flex-shrink-0">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{member.name}</p>
                                        <p className="text-sm text-gray-400">{member.email}</p>
                                    </div>
                                </div>
                                {index === 0 ? (
                                    <div className="flex items-center text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
                                        <Crown className="w-3 h-3 mr-1" />
                                        <span>플래너</span>
                                    </div>
                                ) : (
                                    null
                                )}
                           </li>
                        ))}
                     </ul>
                </main>
            </div>
        </div>
    );
};

export default MemberManagementModal;
