
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, ChevronDown } from 'lucide-react';
import PolicyContent from '../components/common/PolicyContent';

const TABS = ['announcements', 'faq', 'terms', 'privacy'];
const TAB_NAMES_KO: { [key: string]: string } = {
    announcements: '공지사항',
    faq: 'FAQ',
    terms: '이용약관',
    privacy: '개인정보처리방침'
};

const MOCK_ANNOUNCEMENTS = [
    { id: 1, title: 'TripPlan 서비스 정식 오픈 안내', date: '2024.08.01', content: '안녕하세요, TripPlan 팀입니다. 오랜 준비 기간을 거쳐 드디어 TripPlan 서비스가 정식으로 오픈되었습니다!\n\nTripPlan은 여러분의 여행을 더욱 쉽고 즐겁게 만들기 위해 탄생했습니다. 나만의 여행을 계획하고, 친구들과 공유하며, 커뮤니티에서 다른 여행자들과 영감을 나눠보세요.\n\n앞으로 더 좋은 서비스를 제공하기 위해 최선을 다하겠습니다. 감사합니다.' },
    { id: 2, title: '개인정보처리방침 개정 안내', date: '2024.07.25', content: '안녕하세요, TripPlan입니다. 2024년 7월 25일부터 개인정보처리방침이 일부 개정되어 안내드립니다.\n\n이번 개정은 보다 명확하고 이해하기 쉬운 정보 제공을 목적으로 하며, 수집하는 개인정보 항목 및 이용 목적에 대한 설명이 보강되었습니다.\n\n자세한 내용은 \'개인정보처리방침\' 탭에서 확인하실 수 있습니다. 변경된 내용에 대해 궁금한 점이 있으시면 언제든지 고객센터로 문의해주세요.' },
    { id: 3, title: '서버 점검 안내 (02:00 ~ 04:00)', date: '2024.07.20', content: '보다 안정적인 서비스 제공을 위해 아래와 같이 서버 점검을 실시합니다. 점검 시간 동안 서비스 이용이 일시적으로 중단될 수 있으니 이용에 참고해주시기 바랍니다.\n\n- 점검 일시: 2024년 7월 20일(토) 02:00 ~ 04:00 (약 2시간)\n- 점검 내용: 서비스 안정화 및 성능 개선 작업\n\n더 나은 서비스로 보답하겠습니다. 감사합니다.' },
    { id: 4, title: '모바일 앱 출시 예정 안내', date: '2024.07.15', content: '더욱 편리한 여행 계획을 위해 TripPlan 모바일 앱(iOS/Android)이 곧 출시될 예정입니다.\n\n언제 어디서든 손쉽게 여행을 계획하고, 실시간으로 일정을 확인하며, 현지에서 유용한 정보를 얻을 수 있습니다.\n\n많은 기대 부탁드립니다! 출시 일정은 추후 다시 공지하겠습니다.' },
];

const MOCK_FAQS = [
    { id: 1, question: '여행 일정은 어떻게 만드나요?', answer: '‘내 여행’ 페이지에서 ‘새 여행 만들기’ 버튼을 클릭하여 여행 제목, 목적지, 날짜를 입력하면 새로운 여행이 생성됩니다. 생성된 여행 상세 페이지에서 일정을 추가하고 관리할 수 있습니다.' },
    { id: 2, question: '다른 사람과 여행 일정을 공유할 수 있나요?', answer: '네, 가능합니다. 여행 상세 페이지에서 멤버 초대 기능을 통해 다른 사용자를 여행에 초대하여 함께 일정을 계획하고 수정할 수 있습니다.' },
    { id: 3, question: '커뮤니티에는 어떤 일정을 공유할 수 있나요?', answer: '자신이 만든 여행 일정 중 다른 사람들에게 공유하고 싶은 일정을 공개로 설정하여 커뮤니티에 공유할 수 있습니다. 다른 사용자들의 여행을 보고 영감을 얻어보세요.' },
    { id: 4, question: '회원가입은 어떻게 하나요?', answer: '현재 카카오, 네이버, 구글 소셜 로그인을 통해 간편하게 회원가입 및 로그인을 하실 수 있습니다.' },
    { id: 5, question: '비밀번호를 잊어버렸어요.', answer: '소셜 로그인을 통해 접속하므로 별도의 비밀번호 찾기 절차는 없습니다. 각 소셜 서비스의 계정 정보를 확인해주세요.' },
];

interface AnnouncementItemProps {
    announcement: typeof MOCK_ANNOUNCEMENTS[0];
    isOpen: boolean;
    onToggle: () => void;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ announcement, isOpen, onToggle }) => {
    return (
        <div className="border-b border-slate-700 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-5 text-left"
                aria-expanded={isOpen}
            >
                <div className="flex-1 pr-4">
                    <p className={`font-semibold transition-colors duration-200 ${isOpen ? 'text-blue-400' : 'text-white'}`}>{announcement.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {announcement.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface FaqItemProps {
    faq: typeof MOCK_FAQS[0];
    isOpen: boolean;
    onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onToggle }) => {
    return (
        <div className="border-b border-slate-700 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-5 text-left"
                aria-expanded={isOpen}
            >
                <span className={`font-semibold text-left flex-1 pr-4 transition-colors duration-200 ${isOpen ? 'text-blue-400' : 'text-white'}`}>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-gray-300 leading-relaxed">
                        {faq.answer}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Support: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'announcements';
    const [openAnnouncementId, setOpenAnnouncementId] = useState<number | null>(null);
    const [openFaqId, setOpenFaqId] = useState<number | null>(null);

    const handleTabClick = (tab: string) => {
        setSearchParams({ tab });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'faq':
                return (
                    <div className="bg-slate-800 rounded-lg">
                        {MOCK_FAQS.map(faq => 
                          <FaqItem 
                            key={faq.id} 
                            faq={faq} 
                            isOpen={openFaqId === faq.id}
                            onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                          />
                        )}
                    </div>
                );
            case 'terms':
                return (
                    <div className="bg-slate-800 rounded-lg p-6 md:p-8">
                       <PolicyContent type="terms" />
                    </div>
                );
            case 'privacy':
                return (
                    <div className="bg-slate-800 rounded-lg p-6 md:p-8">
                        <PolicyContent type="privacy" />
                    </div>
                );
            case 'announcements':
            default:
                return (
                    <div className="bg-slate-800 rounded-lg">
                        {MOCK_ANNOUNCEMENTS.map(item => (
                            <AnnouncementItem 
                                key={item.id} 
                                announcement={item}
                                isOpen={openAnnouncementId === item.id}
                                onToggle={() => setOpenAnnouncementId(openAnnouncementId === item.id ? null : item.id)}
                             />
                        ))}
                    </div>
                );
        }
    };

    return (
        <div className="max-w-[1100px] mx-auto">
            {/* Header */}
            <div className="bg-slate-800 p-6 rounded-lg mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white">고객센터</h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                    <p className="text-gray-400">이용에 궁금한점이나 불편이 있을 경우 문의해주세요.</p>
                    <a 
                        href="mailto:support@tripplan.app"
                        className="flex items-center justify-center mt-4 sm:mt-0 w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-200"
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        문의하기
                    </a>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700 mb-6">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`px-4 py-3 text-base font-semibold transition-colors duration-200 ${
                            activeTab === tab
                                ? 'border-b-2 border-blue-500 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                        role="tab"
                        aria-selected={activeTab === tab}
                    >
                        {TAB_NAMES_KO[tab]}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div role="tabpanel">
                {renderContent()}
            </div>
        </div>
    );
};

export default Support;