
import React from 'react';
import { Trip, Category, CommunityPost, BoardCategory, BoardPost, Comment } from './types';
import { Bed, UtensilsCrossed, MapPin, ShoppingBag, Bus } from 'lucide-react';

export const CATEGORY_ICONS: { [key in Category]: React.ReactNode } = {
  [Category.Place]: <MapPin className="w-5 h-5" />,
  [Category.Transport]: <Bus className="w-5 h-5" />,
  [Category.Meal]: <UtensilsCrossed className="w-5 h-5" />,
  [Category.Lodging]: <Bed className="w-5 h-5" />,
  [Category.Shopping]: <ShoppingBag className="w-5 h-5" />,
};

export const MOCK_USER = {
  name: '변영성',
  email: 'princthos@lhcorp.co.kr',
  avatar: 'https://i.namu.wiki/i/3Qgj36IfyX-xMn-tZO7P_GACaXYCGVEK-AZCAdceW3eeDk-C54x8Ja62ujXO3oyb1F4YDTcPTgQZ9d1QJzqkPQ.webp'
};

export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    title: '도쿄 8박 9일 미식 여행',
    destination: '일본, 도쿄',
    startDate: '2025-11-27',
    endDate: '2025-12-05',
    coverImage: 'https://www.agoda.com/wp-content/uploads/2024/06/tokyo-japan-1244x700.jpg',
    isPublic: true,
    members: [
        MOCK_USER,
        { name: '김민준', email: 'minjun@example.com', avatar: 'https://i.pravatar.cc/150?u=minjun@example.com' }
    ],
    itinerary: [
      {
        date: '2025-11-27',
        items: [
          { id: '101', time: '14:00', category: Category.Transport, title: '나리타 공항 도착', description: 'NEX 티켓 구매 후 신주쿠로 이동' },
          { id: '102', time: '16:00', category: Category.Lodging, title: '신주쿠 호텔 체크인', description: '호텔에 짐 풀고 잠시 휴식' },
          { id: '103', time: '18:00', category: Category.Meal, title: '이치란 라멘 저녁 식사', description: '인생 라멘 맛보기', links: [{ title: '타베로그 후기', url: '#' }, { title: '구글맵', url: '#' }] },
          { id: '104', time: '20:00', category: Category.Place, title: '도쿄 도청 전망대 야경', description: '도쿄의 화려한 야경 감상', links: [{ title: '공식 홈페이지', url: 'https://example.com/observatory' }], images: ['https://i.namu.wiki/i/wSOhbl8VDxYjVJYMsvAuafqTYrBu1EChMjBiyLnr2StX9XvOLyR-hZ_l4dcBU-pPjbk_qQHXWdDTuXQN7Fijew.webp', 'https://picsum.photos/seed/tokyo-gov2/400/300', 'https://picsum.photos/seed/tokyo-gov3/400/300'] },
        ],
      },
      {
        date: '2025-11-28',
        items: [
          { id: '201', time: '09:00', category: Category.Place, title: '아사쿠사 센소지 방문', description: '기모노 체험 및 인력거 탑승', images: ['https://picsum.photos/seed/asakusa1/400/300', 'https://picsum.photos/seed/asakusa2/400/300', 'https://picsum.photos/seed/asakusa3/400/300'] },
          { id: '202', time: '12:00', category: Category.Meal, title: '장어덮밥 점심', description: '현지인 추천 맛집에서 점심 식사' },
          { id: '203', time: '14:00', category: Category.Shopping, title: '시부야 쇼핑', description: '시부야 109, 돈키호테에서 쇼핑' },
          { id: '204', time: '18:00', category: Category.Place, title: '시부야 스카이 전망대', description: '해질녘 노을과 야경 감상', images: ['https://picsum.photos/seed/shibuya-sky1/400/300', 'https://picsum.photos/seed/shibuya-sky2/400/300', 'https://picsum.photos/seed/shibuya-sky3/400/300', 'https://picsum.photos/seed/shibuya-sky4/400/300', 'https://picsum.photos/seed/shibuya-sky5/400/300'] },
        ],
      },
       {
        date: '2025-11-29',
        items: [
          { id: '301', time: '10:00', category: Category.Place, title: '지브리 미술관', description: '예약 필수, 동심의 세계로', links: [{ title: '예약 사이트', url: '#' }] },
          { id: '302', time: '13:00', category: Category.Meal, title: '키치죠지 맛집 탐방', description: '아기자기한 상점가 구경 및 점심' },
          { id: '303', time: '15:00', category: Category.Shopping, title: '아키하바라 전자상가 구경', description: '애니메이션 및 전자제품의 성지' },
        ],
      },
      {
        date: '2025-11-30',
        items: [
          { id: '401', time: '10:00', category: Category.Shopping, title: '마지막 기념품 쇼핑', description: '도쿄역 캐릭터 스트리트' },
          { id: '402', time: '12:00', category: Category.Lodging, title: '호텔 체크아웃' },
          { id: '403', time: '13:00', category: Category.Transport, title: '나리타 공항으로 이동' },
          { id: '404', time: '16:00', category: Category.Transport, title: '귀국', description: '도쿄 여행 마무리' },
        ],
      },
      {
        date: '2025-12-01',
        items: [],
      },
      {
        date: '2025-12-02',
        items: [],
      },
      {
        date: '2025-12-03',
        items: [],
      },
      {
        date: '2025-12-04',
        items: [],
      },
      {
        date: '2025-12-05',
        items: [],
      },
    ],
    comments: [
      { id: 'comment1', user: { name: '김민준', email: 'minjun@example.com', avatar: 'https://i.pravatar.cc/150?u=minjun@example.com' }, text: '시부야 스카이 정말 기대돼요!', timestamp: new Date('2025-11-20T10:00:00Z').toISOString() },
      { id: 'comment2', user: MOCK_USER, text: '맞아요! 인생샷 꼭 찍어요! ㅎㅎ', timestamp: new Date('2025-11-20T10:05:00Z').toISOString() }
    ]
  },
  {
    id: '2',
    title: '제주도 가족 휴가',
    destination: '대한민국, 제주',
    startDate: '2024-09-20',
    endDate: '2024-09-24',
    coverImage: 'https://cdn.jejusori.net/news/photo/202210/409023_415016_382.jpg',
    isPublic: false,
    members: [MOCK_USER],
    itinerary: [
      { date: '2024-09-20', items: [] },
      { date: '2024-09-21', items: [] },
      { date: '2024-09-22', items: [] },
      { date: '2024-09-23', items: [] },
      { date: '2024-09-24', items: [] },
    ],
    comments: [],
  },
  {
    id: '3',
    title: '파리 감성 여행',
    destination: '프랑스, 파리',
    startDate: '2025-05-10',
    endDate: '2025-05-17',
    coverImage: 'https://www.visakorea.com/dam/VCOM/regional/ap/images/travel-with-visa/paris/marquee-travel-paris-800x450.jpg',
    isPublic: false,
    members: [
        { name: '김민준', email: 'minjun@example.com', avatar: 'https://i.pravatar.cc/150?u=minjun@example.com' },
        MOCK_USER
    ],
    itinerary: [
      { date: '2025-05-10', items: [] },
      { date: '2025-05-11', items: [] },
      { date: '2025-05-12', items: [] },
    ],
    comments: [],
  },
];


export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: 'c1',
        title: '도쿄 8박 9일, 너무 빡빡한가요? 조언 부탁드립니다!',
        author: { name: '이로운', email: 'rowoon@example.com', avatar: 'https://i.pravatar.cc/150?u=rowoon@example.com' },
        createdAt: '2025-11-27 13:23',
        trip: MOCK_TRIPS[0],
        content: '이번에 가족들과 도쿄를 가기로해서 일정을 만들었는데 부모님 모시고 여행하기에 일정이 너무 빡빡할까요? 고수님들 조언 부탁드려요',
        comments: [
            { id: 'com1', user: { name: '박서준', email: 'seojun@example.com', avatar: 'https://i.pravatar.cc/150?u=seojun@example.com' }, text: '일정 정말 알차네요! 저도 도쿄 가는데 참고할게요~', timestamp: new Date('2025-11-21T10:00:00Z').toISOString() },
            { id: 'com2', user: MOCK_USER, text: '감사합니다! 즐거운 여행 되세요.', timestamp: new Date('2025-11-21T10:05:00Z').toISOString() },
        ]
    },
    {
        id: 'c2',
        title: '파리 초보의 5박 6일 예술 기행! 맛집 추천도 환영해요.',
        author: { name: '최지아', email: 'jia@example.com', avatar: 'https://i.pravatar.cc/150?u=jia@example.com' },
        createdAt: '2025-10-09 09:00',
        content: '안녕하세요! 처음으로 파리 여행을 가게 되어서 루브르, 오르세 등 미술관 위주로 일정을 짜봤어요. 혹시 이 동선 괜찮을지, 그리고 근처에 괜찮은 맛집 있으면 추천 부탁드립니다!',
        trip: {
            id: '3',
            title: '파리 5박 6일 예술 기행',
            destination: '프랑스, 파리',
            startDate: '2024-10-10',
            endDate: '2024-10-15',
            coverImage: 'https://www.visakorea.com/dam/VCOM/regional/ap/images/travel-with-visa/paris/marquee-travel-paris-800x450.jpg',
            isPublic: true,
            members: [{ name: '최지아', email: 'jia@example.com', avatar: 'https://i.pravatar.cc/150?u=jia@example.com' }],
            itinerary: [],
            comments: [],
        },
        comments: []
    }
];

export const MOCK_BOARD_POSTS: BoardPost[] = [
    { 
        id: 'b1', 
        category: BoardCategory.Tip, 
        title: '도쿄 디즈니랜드 꿀팁 공유합니다!', 
        author: MOCK_USER, 
        createdAt: '2024-08-18', 
        views: 128, 
        likes: 15, 
        commentsCount: 4, 
        thumbnail: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000168/img/basic/a0000168_main.jpg?20170809173905&q=80',
        content: `안녕하세요! 얼마 전 도쿄 디즈니랜드에 다녀와서 얻은 꿀팁들을 공유해봅니다. 여행 계획에 도움이 되셨으면 좋겠어요.\n\n**1. 티켓은 무조건 미리 예매하세요!**\n현장 구매는 거의 불가능하다고 보시면 됩니다. 저는 클룩(Klook)이나 공식 앱을 통해 미리 예매하는 것을 추천해요. 특히 성수기에는 한 달 전에도 매진될 수 있으니 서두르세요!\n\n**2. 디즈니 프리미어 액세스(DPA) 적극 활용!**\n인기 어트랙션을 짧은 대기 시간으로 즐기고 싶다면 DPA는 필수입니다. 입장하자마자 앱으로 구매할 수 있고, '미녀와 야수', '소어링' 같은 인기 어트랙션은 오전에 매진되니 입장과 동시에 구매 전쟁에 참여해야 합니다. 하나에 2,000엔 정도로 비싸지만, 시간을 아낄 수 있다는 점에서 충분히 가치 있다고 생각해요.\n\n**3. 추천 어트랙션 및 동선**\n- **오전:** 입장 후 바로 '미녀와 야수' DPA 구매 -> '스페이스 마운틴' 탑승 -> '푸의 허니 헌트' 대기\n- **점심:** 헝그리 베어 레스토랑 (카레가 맛있고 양이 많아요)\n- **오후:** 퍼레이드 관람 (자리 맡기는 1시간 전부터!) -> '빅 썬더 마운틴' -> '캐리비안의 해적'\n- **저녁:** '미녀와 야수' 탑승 (DPA 시간 맞춰서) -> 저녁 식사 및 기념품 쇼핑 -> 불꽃놀이 관람\n\n**4. 먹거리 추천**\n- **알린 모찌:** 세 가지 맛의 쫄깃한 모찌. 귀여워서 먹기 아까울 정도!\n- **훈제 칠면조 다리:** 디즈니랜드의 시그니처 메뉴죠. 하나만 먹어도 든든합니다.\n- **팝콘:** 다양한 맛과 예쁜 팝콘통을 모으는 재미가 쏠쏠합니다. 저는 카라멜 맛을 추천해요.\n\n**5. 기타 팁**\n- 입장 대기는 최소 1시간 전부터 시작하는 게 좋아요.\n- 보조배터리는 필수! 앱 사용, 사진 촬영 등으로 배터리가 금방 닳아요.\n- 저녁에는 날씨가 쌀쌀할 수 있으니 얇은 겉옷을 챙기세요.\n- 기념품은 폐장 직전에 사면 사람이 너무 많으니, 중간에 미리 사서 물품 보관함에 넣어두는 것도 방법입니다.\n\n궁금한 점 있으시면 댓글로 물어보세요!`,
        comments: [
            { id: 'bc1', user: { name: '김민준', email: 'minjun@example.com', avatar: 'https://i.pravatar.cc/150?u=minjun@example.com' }, text: '와 DPA 꿀팁 감사합니다!! 다음달에 가는데 꼭 참고할게요.', timestamp: new Date('2024-08-18T12:30:00Z').toISOString() },
            { id: 'bc2', user: { name: '최지아', email: 'jia@example.com', avatar: 'https://i.pravatar.cc/150?u=jia@example.com' }, text: '알린 모찌 진짜 귀엽죠 ㅠㅠ 맛도 최고!', timestamp: new Date('2024-08-18T14:00:00Z').toISOString() },
            { id: 'bc3', user: { name: '이로운', email: 'rowoon@example.com', avatar: 'https://i.pravatar.cc/150?u=rowoon@example.com' }, text: '퍼레이드 자리 꿀팁 있나요?', timestamp: new Date('2024-08-19T09:00:00Z').toISOString() },
            { id: 'bc4', user: MOCK_USER, text: '신데렐라 성 앞이 명당이지만 경쟁이 치열해요! 저는 퍼레이드 시작 지점 근처에 자리 잡는 걸 추천합니다. 조금 더 일찍 볼 수 있어요 ㅎㅎ', timestamp: new Date('2024-08-19T09:15:00Z').toISOString() },
        ]
    },
    { id: 'b2', category: BoardCategory.Question, title: '제주도 2박 3일 렌트카 없이 여행 가능할까요?', author: { name: '김민준', email: 'minjun@example.com', avatar: 'https://i.pravatar.cc/150?u=minjun@example.com' }, createdAt: '2024-08-17', views: 256, likes: 5, commentsCount: 8 },
    { id: 'b3', category: BoardCategory.Review, title: '파리 뮤지엄패스 2일권 솔직 후기', author: { name: '최지아', email: 'jia@example.com', avatar: 'https://i.pravatar.cc/150?u=jia@example.com' }, createdAt: '2024-08-17', views: 310, likes: 22, commentsCount: 6, thumbnail: 'https://d2mgzmtdeipcjp.cloudfront.net/files/magazine/2025/02/20/17400472213463.jpg' },
    { id: 'b4', category: BoardCategory.General, title: '여행 좋아하는 사람들끼리 소통해요~', author: { name: '이로운', email: 'rowoon@example.com', avatar: 'https://i.pravatar.cc/150?u=rowoon@example.com' }, createdAt: '2024-08-16', views: 88, likes: 10, commentsCount: 12 },
    { id: 'b5', category: BoardCategory.Tip, title: '유럽 여행 시 소매치기 예방하는 법', author: { name: '박서준', email: 'seojun@example.com', avatar: 'https://i.pravatar.cc/150?u=seojun@example.com' }, createdAt: '2024-08-15', views: 540, likes: 45, commentsCount: 11 },
    { id: 'b6', category: BoardCategory.Question, title: '태국 방콕 숙소 위치 추천 부탁드립니다!', author: MOCK_USER, createdAt: '2024-08-15', views: 180, likes: 3, commentsCount: 5 },
    { id: 'b7', category: BoardCategory.Review, title: '오사카 유니버셜 스튜디오 익스프레스 패스 필수일까?', author: { name: '김민준', email: 'minjun@example.com', avatar: 'https://i.pravatar.cc/150?u=minjun@example.com' }, createdAt: '2024-08-14', views: 421, likes: 33, commentsCount: 9 },
    { id: 'b8', category: BoardCategory.General, title: '이번 겨울에 다들 어디로 떠나시나요?', author: { name: '최지아', email: 'jia@example.com', avatar: 'https://i.pravatar.cc/150?u=jia@example.com' }, createdAt: '2024-08-12', views: 95, likes: 18, commentsCount: 20 },
    { id: 'b9', category: BoardCategory.Tip, title: '공항 라운지 이용 카드 추천 TOP 5', author: { name: '박서준', email: 'seojun@example.com', avatar: 'https://i.pravatar.cc/150?u=seojun@example.com' }, createdAt: '2024-08-11', views: 680, likes: 72, commentsCount: 15 },
    { id: 'b10', category: BoardCategory.Question, title: '다낭 여행 가족과 함께 갈만한 식당 있나요?', author: { name: '이로운', email: 'rowoon@example.com', avatar: 'https://i.pravatar.cc/150?u=rowoon@example.com' }, createdAt: '2024-08-10', views: 215, likes: 7, commentsCount: 3 },
];
