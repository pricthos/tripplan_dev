
import React from 'react';

interface PolicyContentProps {
    type: 'terms' | 'privacy';
}

const PolicyContent: React.FC<PolicyContentProps> = ({ type }) => {
    if (type === 'terms') {
        return (
            <div className="space-y-6 text-gray-300 leading-relaxed">
                <h2 className="text-2xl font-bold text-white mb-6">이용약관</h2>
                
                <h3 className="text-xl font-semibold text-white pt-2">제1조 (목적)</h3>
                <p>이 약관은 TripPlan(이하 '회사')이 제공하는 여행 일정 계획 및 공유 서비스(이하 '서비스')의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>

                <h3 className="text-xl font-semibold text-white pt-2">제2조 (회원가입)</h3>
                <p>회원은 회사가 정한 가입 양식에 따라 회원정보를 기입하고, 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. 회사는 소셜 로그인을 통한 간편 가입 방식을 제공할 수 있습니다.</p>
                
                <h3 className="text-xl font-semibold text-white pt-2">제3조 (서비스의 제공 및 변경)</h3>
                <p>1. 회사는 다음과 같은 서비스를 제공합니다.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>여행 일정 생성, 편집, 관리 기능</li>
                    <li>여행 멤버 초대 및 공동 편집 기능</li>
                    <li>여행 일정 공개 및 커뮤니티 공유 기능</li>
                    <li>다른 회원의 여행 일정 열람 및 참고 기능</li>
                    <li>기타 회사가 추가 개발하거나 제휴 계약을 통해 회원에게 제공하는 일체의 서비스</li>
                </ul>
                <p>2. 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있으며, 이에 대해 약관에서 정한 방법으로 회원에게 통지합니다.</p>

                <h3 className="text-xl font-semibold text-white pt-2">제4조 (회원의 게시물)</h3>
                <p>1. 회원이 서비스 내에 게시한 여행 일정, 사진, 댓글 등(이하 '게시물')의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</p>
                <p>2. 회원은 게시물이 타인의 저작권, 상표권 등 지적재산권을 침해하지 않음을 보증해야 합니다. 타인의 지적재산권을 침해하여 발생하는 모든 책임은 회원 본인에게 있습니다.</p>
                <p>3. 회원은 회사에 대하여 게시물을 서비스 운영, 홍보, 개선 등의 목적으로 사용할 수 있는 비독점적이고, 전 세계적이며, 로열티가 없는 라이선스를 부여합니다.</p>

                <h3 className="text-xl font-semibold text-white pt-2">제5조 (회원의 의무)</h3>
                <p>회원은 다음 행위를 하여서는 안 됩니다.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>타인의 정보 도용</li>
                    <li>음란하거나 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                    <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                    <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>회사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위</li>
                </ul>

                <h3 className="text-xl font-semibold text-white pt-2">제6조 (면책조항)</h3>
                <p>1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                <p>2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
                <p>3. 회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</p>
                <p>4. 서비스 내에 포함된 제3자(항공사, 숙박업체 등)의 서비스에 대한 링크는 회원의 편의를 위해 제공되는 것이며, 회사는 해당 서비스의 내용이나 이용에 대해 어떠한 책임도 지지 않습니다.</p>

                <h3 className="text-xl font-semibold text-white pt-2">제7조 (회원 탈퇴 및 데이터 처리)</h3>
                <p>1. 회원은 언제든지 서비스 내 '마이페이지' 메뉴를 통하여 이용계약 해지 신청(회원 탈퇴)을 할 수 있으며, 회사는 관련 법령 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.</p>
                <p>2. 회원 탈퇴 시, 계정과 관련된 개인정보, 회원이 작성한 게시물, 댓글 등 개인 식별이 가능한 정보는 관련 법령 및 회사의 개인정보처리방침에 따라 파기됩니다.</p>
                <p>3. 다만, 회원이 작성한 여행 일정 및 챌린지 응모작 등 비식별화된 콘텐츠는 다른 사용자에게 유용한 정보를 제공하고 서비스의 질적 향상을 위한 데이터로 활용하기 위해, 작성자 정보가 제거된 익명 상태로 서비스에 귀속되어 보존될 수 있습니다. 회원은 회원가입 시 이러한 내용이 포함된 이용약관에 동의한 것으로 간주합니다.</p>
                
                <div className="pt-4">
                    <p className="font-semibold">부칙</p>
                    <p>이 약관은 2024년 8월 1일부터 시행됩니다.</p>
                </div>
            </div>
        );
    }

    if (type === 'privacy') {
        return (
            <div className="space-y-6 text-gray-300 leading-relaxed">
                <h2 className="text-2xl font-bold text-white mb-6">개인정보처리방침</h2>
                <p>TripPlan(이하 '회사')은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.</p>
    
                <h3 className="text-xl font-semibold text-white pt-2">1. 수집하는 개인정보의 항목 및 수집방법</h3>
                <p className="font-semibold">가. 수집 항목</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>회원가입 시: [소셜 로그인 제공업체로부터] 이메일, 이름(닉네임), 프로필 사진</li>
                    <li>서비스 이용 과정에서 이용자가 직접 입력하는 정보: 여행 일정(목적지, 날짜 등), 세부 계획, 사진, 링크, 댓글, 동행인 정보</li>
                    <li>서비스 이용 과정에서 자동 생성되는 정보: IP 주소, 쿠키, 서비스 이용 기록, 기기정보</li>
                </ul>
                <p className="font-semibold mt-4">나. 수집 방법</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우</li>
                    <li>소셜 로그인 시, 해당 소셜 미디어로부터 이용자의 동의 하에 정보를 제공받는 경우</li>
                    <li>서비스 이용 과정에서 자동으로 수집되는 경우</li>
                </ul>
    
                <h3 className="text-xl font-semibold text-white pt-2">2. 개인정보의 수집 및 이용목적</h3>
                <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인</li>
                    <li>서비스 제공: 여행 일정 생성 및 관리, 공유 등 핵심 기능 제공, 콘텐츠 제공, 맞춤 서비스 제공</li>
                    <li>신규 서비스 개발 및 마케팅·광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악, 회원의 서비스 이용에 대한 통계</li>
                </ul>
    
                <h3 className="text-xl font-semibold text-white pt-2">3. 개인정보의 보유 및 이용기간</h3>
                <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                    <li>로그인 기록: 3개월 (통신비밀보호법)</li>
                </ul>
    
                <h3 className="text-xl font-semibold text-white pt-2">4. 개인정보의 파기절차 및 방법</h3>
                <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>파기절차: 회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기됩니다.</li>
                    <li>파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                    <li><b>단서 조항:</b> 회원 탈퇴 시, 회원이 작성한 여행 일정 등 일부 콘텐츠는 개인을 식별할 수 없도록 익명화 조치 후, 서비스 개선 및 통계 분석을 위한 데이터로 보존될 수 있습니다. 이는 이용약관에 근거합니다.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-white pt-2">5. 이용자의 권리와 그 행사방법</h3>
                <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다. 개인정보의 조회, 수정을 위해서는 '회원정보수정' 기능을, 가입해지(동의철회)를 위해서는 '회원탈퇴' 기능을 이용하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.</p>
                
                <h3 className="text-xl font-semibold text-white pt-2">6. 개인정보 보호책임자</h3>
                <ul className="list-none pl-4 space-y-1">
                    <li>이름: 변영성</li>
                    <li>이메일: support@tripplan.app</li>
                </ul>
    
                <div className="pt-4">
                    <p className="font-semibold">부칙</p>
                    <p>이 개인정보처리방침은 2024년 8월 1일부터 시행됩니다.</p>
                </div>
            </div>
        );
    }
    
    return null;
};

export default PolicyContent;
