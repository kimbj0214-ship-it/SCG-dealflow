// SCG Dealflow Platform - Demo Data
// 홍콩 코호트 기반 실제 기업 데이터 (가상 데이터)

// 카테고리 정의
const CATEGORIES = {
    'ADBM': {
        name: 'AI/Data/Blockchain/Metaverse',
        color: 'blue',
        subcategories: {
            'ADBM-01': 'AI Infra/Agent',
            'ADBM-02': 'Data/Analytics', 
            'ADBM-03': 'Blockchain/Web3',
            'ADBM-04': 'XR/Metaverse'
        }
    },
    'CL': {
        name: 'Content/Lifestyle',
        color: 'pink',
        subcategories: {
            'CL-01': 'Digital Content',
            'CL-02': 'Commerce/Brand',
            'CL-03': 'Edu/HRTech'
        }
    },
    'M4': {
        name: 'Material/Manufacturing/Mobility',
        color: 'gray',
        subcategories: {
            'M4-01': 'New Material',
            'M4-02': 'Manufacturing/Factory',
            'M4-03': 'Mobility/EV/Drone'
        }
    },
    'BH': {
        name: 'Bio/Healthcare',
        color: 'green',
        subcategories: {
            'BH-01': 'MedTech/Device',
            'BH-02': 'Digital Health/Pharma'
        }
    },
    'RS': {
        name: 'Robotics/Smart',
        color: 'purple',
        subcategories: {
            'RS-01': 'Robotics',
            'RS-02': 'Smart City/IoT'
        }
    }
};

// 데모 기업 데이터 (홍콩 코호트 기반)
const DEMO_COMPANIES = [
    {
        id: 'nexus-ai',
        name: 'Nexus AI',
        nameEn: 'Nexus AI Ltd.',
        oneLiner: 'AI 기반 글로벌 공급망 최적화 플랫폼',
        description: '머신러닝과 예측 분석을 통해 글로벌 제조업체의 공급망 효율성을 40% 향상시키는 SaaS 솔루션',
        logo: '🤖',
        website: 'https://nexus-ai.com',
        category: 'ADBM',
        subcategories: ['ADBM-01', 'ADBM-02'],
        country: '대한민국',
        city: '서울',
        hqCountry: 'South Korea',
        stage: 'Series A',
        foundedYear: 2021,
        teamSize: 28,
        contact: {
            name: '김민수',
            title: 'CEO & Co-founder',
            email: 'minsoo@nexus-ai.com'
        },
        recentUpdate: {
            date: '2024-08-15',
            content: 'LG전자와 스마트팩토리 AI 솔루션 파트너십 체결, 연매출 50억 달성'
        },
        updates: [
            {
                period: '2024-08',
                awards: 'KDB 스타트업 경진대회 대상 수상',
                rnd: 'MIT와 공동 연구 프로젝트 진행 중 - 차세대 예측 알고리즘 개발',
                ip: '공급망 최적화 AI 알고리즘 특허 3건 출원',
                launches: 'Nexus AI v3.0 출시 - 실시간 글로벌 공급망 추적 기능',
                revenue: '월 매출 8억원 달성, 전년 동기 대비 300% 성장',
                hiring: 'AI 엔지니어 5명, 해외영업 3명 추가 채용'
            }
        ],
        metrics: {
            revenue: '연 50억원',
            customers: '글로벌 제조업체 120+',
            employees: 28,
            funding: 'Series A 완료'
        }
    },
    {
        id: 'medtech-solutions',
        name: '메드테크솔루션즈',
        nameEn: 'MedTech Solutions',
        oneLiner: 'AI 기반 조기 암 진단 의료기기 전문기업',
        description: '딥러닝 영상분석으로 폐암, 유방암을 95% 정확도로 조기 진단하는 의료 AI 솔루션',
        logo: '🏥',
        website: 'https://medtech-solutions.kr',
        category: 'BH',
        subcategories: ['BH-01', 'BH-02'],
        country: '대한민국',
        city: '대전',
        hqCountry: 'South Korea',
        stage: 'Seed',
        foundedYear: 2022,
        teamSize: 15,
        contact: {
            name: '박지영',
            title: 'CTO',
            email: 'jiyoung@medtech-solutions.kr'
        },
        recentUpdate: {
            date: '2024-08-20',
            content: 'FDA 승인 획득, 미국 병원 3곳과 파일럿 프로젝트 시작'
        },
        updates: [
            {
                period: '2024-08',
                awards: '대한의학회 혁신상 수상',
                rnd: '서울대병원과 공동 임상연구 진행 - 5000명 대상 검증',
                ip: '의료 AI 진단 알고리즘 국제특허 2건 등록',
                launches: 'MedScan Pro 2.0 출시 - 진단 시간 50% 단축',
                revenue: '국내 대형병원 10곳 도입, 월 진단 건수 10,000건 돌파',
                hiring: '의료 AI 전문가 3명, 규제 전문가 1명 채용'
            }
        ],
        metrics: {
            accuracy: '95%',
            hospitals: '국내외 25개 병원',
            patients: '월 10,000+ 진단',
            certification: 'FDA, CE 승인'
        }
    },
    {
        id: 'greentech-energy',
        name: '그린테크에너지',
        nameEn: 'GreenTech Energy',
        oneLiner: '차세대 태양광 패널 효율성 극대화 스마트 솔루션',
        description: 'IoT와 AI를 결합한 스마트 태양광 관리 시스템으로 에너지 효율 30% 향상',
        logo: '☀️',
        website: 'https://greentech-energy.co.kr',
        category: 'RS',
        subcategories: ['RS-02'],
        country: '대한민국',
        city: '울산',
        hqCountry: 'South Korea',
        stage: 'Pre-A',
        foundedYear: 2020,
        teamSize: 22,
        contact: {
            name: '이준호',
            title: 'CEO',
            email: 'junho@greentech-energy.co.kr'
        },
        recentUpdate: {
            date: '2024-08-25',
            content: '한국전력공사와 스마트그리드 연동 파일럿 사업 선정'
        },
        updates: [
            {
                period: '2024-08',
                awards: '대한민국 에너지대상 우수상',
                rnd: 'KAIST와 차세대 태양광 효율 개선 기술 공동개발',
                ip: '스마트 태양광 제어 시스템 특허 4건 출원',
                launches: 'SmartSolar Hub v2.5 출시 - 예측 정비 기능 추가',
                revenue: '태양광 발전소 50곳 도입, 월 매출 3억원 달성',
                hiring: 'IoT 개발자 4명, 영업 전문가 2명 영입'
            }
        ],
        metrics: {
            efficiency: '+30%',
            installations: '태양광 발전소 50+',
            energySaved: '월 1,200MWh',
            roi: '투자 회수 기간 2.5년'
        }
    },
    {
        id: 'fintech-bridge',
        name: '핀테크브릿지',
        nameEn: 'FinTech Bridge',
        oneLiner: '중소기업 전용 AI 기반 신용평가 및 대출 매칭 플랫폼',
        description: '대안 신용평가 모델로 중소기업의 금융 접근성을 높이는 핀테크 솔루션',
        logo: '💳',
        website: 'https://fintech-bridge.com',
        category: 'ADBM',
        subcategories: ['ADBM-02'],
        country: '대한민국',
        city: '부산',
        hqCountry: 'South Korea',
        stage: 'Seed',
        foundedYear: 2021,
        teamSize: 18,
        contact: {
            name: '최수현',
            title: 'CEO',
            email: 'suhyun@fintech-bridge.com'
        },
        recentUpdate: {
            date: '2024-08-18',
            content: '신한은행과 중소기업 대출 연계 서비스 런칭'
        },
        updates: [
            {
                period: '2024-08',
                awards: '부산 핀테크 어워드 대상',
                rnd: '부산대와 AI 신용평가 모델 고도화 연구',
                ip: 'AI 신용평가 알고리즘 특허 2건 등록',
                launches: 'CreditBridge 3.0 출시 - 실시간 승인률 95%',
                revenue: '중소기업 500+ 대출 중개, 누적 대출액 100억 돌파',
                hiring: '금융 전문가 3명, 데이터 사이언티스트 2명 충원'
            }
        ],
        metrics: {
            approvalRate: '95%',
            companies: '중소기업 500+',
            totalLoan: '누적 100억원',
            avgTime: '승인 시간 24시간'
        }
    },
    {
        id: 'smart-logistics',
        name: '스마트로지스틱스',
        nameEn: 'Smart Logistics Corp',
        oneLiner: '자율주행 배송 로봇과 AI 배송 최적화 통합 솔루션',
        description: '마지막 배송 구간의 혁신을 위한 자율주행 배송 로봇 + AI 경로 최적화',
        logo: '🤖',
        website: 'https://smart-logistics.kr',
        category: 'RS',
        subcategories: ['RS-01', 'RS-02'],
        country: '대한민국',
        city: '성남',
        hqCountry: 'South Korea',
        stage: 'Series A',
        foundedYear: 2020,
        teamSize: 35,
        contact: {
            name: '강지훈',
            title: 'CTO',
            email: 'jihoon@smart-logistics.kr'
        },
        recentUpdate: {
            date: '2024-08-22',
            content: 'CU편의점과 무인 배송 로봇 시범 서비스 확대 운영'
        },
        updates: [
            {
                period: '2024-08',
                awards: '로봇산업 진흥대상 수상',
                rnd: 'ETRI와 5G 기반 원격 제어 로봇 기술 개발',
                ip: '자율주행 배송로봇 핵심기술 특허 6건 보유',
                launches: 'DeliBot Pro 3세대 양산 시작 - 배송 성공률 98%',
                revenue: '편의점 체인 5곳과 계약, 월 배송량 50,000건',
                hiring: '로봇 엔지니어 8명, AI 개발자 4명 영입'
            }
        ],
        metrics: {
            successRate: '98%',
            deliveries: '월 50,000건',
            stores: '편의점 500+',
            robots: '운영 로봇 100대'
        }
    },
    {
        id: 'edutech-global',
        name: '에듀테크글로벌',
        nameEn: 'EduTech Global',
        oneLiner: 'AI 개인화 학습과 VR을 결합한 차세대 교육 플랫폼',
        description: '학습자 맞춤형 AI 튜터와 몰입형 VR 콘텐츠로 학습 효과 극대화',
        logo: '📚',
        website: 'https://edutech-global.com',
        category: 'CL',
        subcategories: ['CL-03'],
        country: '대한민국',
        city: '대구',
        hqCountry: 'South Korea',
        stage: 'Pre-A',
        foundedYear: 2021,
        teamSize: 24,
        contact: {
            name: '정민아',
            title: 'CPO',
            email: 'mina@edutech-global.com'
        },
        recentUpdate: {
            date: '2024-08-28',
            content: '동남아 5개국 현지 교육청과 MOU 체결, 글로벌 확장 본격화'
        },
        updates: [
            {
                period: '2024-08',
                awards: '에듀테크 코리아 어워드 최우수상',
                rnd: '연세대 교육학과와 학습 효과 측정 연구 진행',
                ip: 'AI 학습 분석 엔진 국제특허 3건 출원',
                launches: 'EduVR Platform 2.0 출시 - 50+ VR 교육 콘텐츠',
                revenue: '국내외 학교 200곳 도입, 학습자 10만명 돌파',
                hiring: 'VR 콘텐츠 개발자 5명, 교육 전문가 3명 합류'
            }
        ],
        metrics: {
            students: '학습자 100,000+',
            schools: '학교 200곳',
            improvement: '학습 효과 +65%',
            countries: '서비스 8개국'
        }
    },
    {
        id: 'blockchain-identity',
        name: '블록체인아이덴티티',
        nameEn: 'Blockchain Identity Solutions',
        oneLiner: '탈중앙화 신원인증과 개인정보 보호 블록체인 플랫폼',
        description: 'Web3 기반 자주적 신원관리(SSI)로 개인정보 주권을 사용자에게 되돌리는 혁신',
        logo: '🔐',
        website: 'https://blockchain-identity.io',
        category: 'ADBM',
        subcategories: ['ADBM-03'],
        country: '대한민국',
        city: '제주',
        hqCountry: 'South Korea',
        stage: 'Seed',
        foundedYear: 2022,
        teamSize: 12,
        contact: {
            name: '오성진',
            title: 'Blockchain Lead',
            email: 'sungjin@blockchain-identity.io'
        },
        recentUpdate: {
            date: '2024-08-30',
            content: '제주특별자치도와 디지털 신분증 파일럿 프로젝트 시작'
        },
        updates: [
            {
                period: '2024-08',
                awards: '블록체인 어워드 코리아 혁신상',
                rnd: 'KAIST 블록체인 연구소와 영지식증명 기술 공동연구',
                ip: 'SSI 프로토콜 핵심 기술 국제특허 2건 진행',
                launches: 'IdentityChain v1.5 메인넷 출시 - 가스비 90% 절감',
                revenue: '금융권 3곳, 공공기관 2곳과 PoC 계약 체결',
                hiring: '블록체인 개발자 2명, 암호학 전문가 1명 영입'
            }
        ],
        metrics: {
            users: '테스트 사용자 5,000+',
            partners: '파트너사 15곳',
            transactions: '월 거래 100,000+',
            security: '해킹 시도 0건'
        }
    },
    {
        id: 'biotech-pharma',
        name: '바이오테크파마',
        nameEn: 'BioTech Pharma Ltd',
        oneLiner: 'AI 신약개발과 개인 맞춤형 치료제 연구개발 전문기업',
        description: '머신러닝 기반 신약 후보물질 발굴부터 개인 유전자 분석 맞춤 치료까지',
        logo: '🧬',
        website: 'https://biotech-pharma.com',
        category: 'BH',
        subcategories: ['BH-02'],
        country: '대한민국',
        city: '오송',
        hqCountry: 'South Korea',
        stage: 'Series A',
        foundedYear: 2019,
        teamSize: 45,
        contact: {
            name: '김바이오',
            title: 'Chief Scientific Officer',
            email: 'bio@biotech-pharma.com'
        },
        recentUpdate: {
            date: '2024-08-26',
            content: '항암 신약 후보물질 임상 2상 승인, 글로벌 제약회사와 라이센싱 협상'
        },
        updates: [
            {
                period: '2024-08',
                awards: '바이오 코리아 혁신기업상 수상',
                rnd: '연세의대와 희귀질환 치료제 공동개발 MOU',
                ip: '신약 후보물질 관련 국제특허 8건 보유',
                launches: 'GenomeAnalyzer Pro 출시 - 유전자 분석 시간 70% 단축',
                revenue: '제약회사 라이센싱 수익 50억, R&D 서비스 20억',
                hiring: '약물화학자 6명, 바이오인포매틱스 전문가 4명 영입'
            }
        ],
        metrics: {
            patents: '특허 30+ 건',
            trials: '임상 시험 5개',
            partners: '글로벌 제약사 8곳',
            pipeline: '신약 파이프라인 12개'
        }
    }
];

// 월간 업데이트 템플릿
const UPDATE_TEMPLATES = {
    awards: [
        'KDB 스타트업 경진대회 대상 수상',
        '대한민국 에너지대상 우수상',
        '핀테크 어워드 최우수상',
        '로봇산업 진흥대상 수상'
    ],
    rnd: [
        'KAIST와 공동 연구 프로젝트 진행',
        '서울대병원과 임상연구 시작',
        'MIT 연구소와 기술 개발 협력',
        '연세대와 효과 검증 연구 진행'
    ],
    ip: [
        '핵심 기술 특허 3건 출원',
        '국제특허 2건 등록 완료',
        '알고리즘 특허 5건 진행 중',
        'AI 기술 특허 포트폴리오 구축'
    ],
    launches: [
        '차세대 플랫폼 v3.0 출시',
        'Pro 버전 정식 런칭',
        '글로벌 서비스 확장',
        '모바일 앱 신규 출시'
    ]
};

// AC 프로그램 데이터
const AC_PROGRAMS = [
    {
        id: 'scg-global-accelerator',
        title: 'SCG Global Accelerator 2024',
        description: '아시아 진출을 꿈꾸는 한국 스타트업을 위한 글로벌 액셀러레이션 프로그램',
        partner: 'SCG x Google for Startups',
        logo: '🚀',
        videoLink: 'https://youtube.com/watch?v=sample',
        applyLink: 'https://apply.scg-accelerator.com',
        timeline: `
**프로그램 일정:**
- 지원 마감: 2024년 10월 15일
- 선정 발표: 2024년 11월 1일  
- 프로그램 기간: 2024년 11월 ~ 2025년 2월 (4개월)
- 데모데이: 2025년 2월 28일

**지원 내용:**
- 투자금: 최대 2억원 + 후속 투자 연계
- 멘토링: 업계 전문가 1:1 멘토링
- 글로벌 진출: 싱가포르, 홍콩, 베트남 현지 지원
- 네트워킹: 투자자/바이어 연결`,
        status: '모집 중',
        participants: 16,
        categories: ['ADBM', 'BH', 'RS']
    },
    {
        id: 'biotech-incubator',
        title: 'K-BioTech Incubator Program',
        description: '바이오/헬스케어 분야 특화 인큐베이션 프로그램',
        partner: '한국바이오협회 x 삼성바이오로직스',
        logo: '🧬',
        videoLink: 'https://youtube.com/watch?v=biotech',
        applyLink: 'https://k-biotech.kr/apply',
        timeline: `
**프로그램 특징:**
- 기간: 6개월 집중 프로그램
- 투자: 시드 투자 최대 5억원
- 임상: 임상시험 설계 및 규제 지원
- 글로벌: FDA/EMA 승인 컨설팅

**선정 혜택:**
- 전용 랩 공간 제공
- 임상 CRO 서비스 할인
- 글로벌 제약사 파트너링`,
        status: '심사 중',
        participants: 8,
        categories: ['BH']
    }
];

// 공지사항/성공사례 데이터
const ANNOUNCEMENTS = [
    {
        id: 'series-a-success',
        title: '네서스AI, 시리즈A 투자 유치 성공',
        content: '글로벌 공급망 최적화 AI 기업 네서스AI가 국내외 벤처캐피털로부터 총 30억원 규모의 시리즈A 투자를 성공적으로 유치했습니다.',
        type: 'success',
        companies: ['nexus-ai'],
        tags: ['투자유치', 'Series A', 'AI']
    },
    {
        id: 'global-expansion',
        title: '에듀테크글로벌, 동남아 5개국 진출',
        content: '인공지능 교육 플랫폼 에듀테크글로벌이 베트남, 태국, 인도네시아, 필리핀, 말레이시아 현지 교육청과 MOU를 체결하며 글로벌 확장에 나섰습니다.',
        type: 'announcement',
        companies: ['edutech-global'],
        tags: ['해외진출', '교육', 'MOU']
    },
    {
        id: 'partnership-lg',
        title: 'LG전자와 스마트팩토리 파트너십',
        content: '네서스AI가 LG전자와 스마트팩토리 AI 솔루션 전략적 파트너십을 체결, 국내 제조업 디지털 전환을 가속화합니다.',
        type: 'announcement',
        companies: ['nexus-ai'],
        tags: ['파트너십', '제조업', 'LG전자']
    }
];

// 사용자 권한 및 상태 관리
let currentUser = null;
let isLoggedIn = false;

// 유틸리티 함수들
const DataUtils = {
    // 카테고리별 기업 필터링
    filterCompaniesByCategory: function(category, subcategory = null) {
        return DEMO_COMPANIES.filter(company => {
            if (subcategory) {
                return company.subcategories.includes(subcategory);
            }
            return company.category === category;
        });
    },

    // 기업 검색
    searchCompanies: function(query) {
        const searchTerm = query.toLowerCase();
        return DEMO_COMPANIES.filter(company => 
            company.name.toLowerCase().includes(searchTerm) ||
            company.nameEn.toLowerCase().includes(searchTerm) ||
            company.oneLiner.toLowerCase().includes(searchTerm) ||
            company.description.toLowerCase().includes(searchTerm)
        );
    },

    // 기업 상세 정보 가져오기
    getCompanyById: function(id) {
        return DEMO_COMPANIES.find(company => company.id === id);
    },

    // 카테고리 정보 가져오기
    getCategoryInfo: function(categoryCode) {
        return CATEGORIES[categoryCode];
    },

    // 최근 업데이트 기업 목록
    getRecentlyUpdatedCompanies: function(limit = 5) {
        return DEMO_COMPANIES
            .filter(company => company.recentUpdate)
            .sort((a, b) => new Date(b.recentUpdate.date) - new Date(a.recentUpdate.date))
            .slice(0, limit);
    },

    // 카테고리별 통계
    getCategoryStats: function() {
        const stats = {};
        Object.keys(CATEGORIES).forEach(cat => {
            stats[cat] = DEMO_COMPANIES.filter(c => c.category === cat).length;
        });
        return stats;
    },

    // 날짜 포맷팅
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 로컬 스토리지에 즐겨찾기 저장
    toggleFavorite: function(companyId) {
        if (!isLoggedIn) return false;
        
        const favorites = JSON.parse(localStorage.getItem('scg_favorites') || '[]');
        const index = favorites.indexOf(companyId);
        
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(companyId);
        }
        
        localStorage.setItem('scg_favorites', JSON.stringify(favorites));
        return index === -1; // true if added, false if removed
    },

    // 즐겨찾기 목록 가져오기
    getFavorites: function() {
        if (!isLoggedIn) return [];
        const favorites = JSON.parse(localStorage.getItem('scg_favorites') || '[]');
        return DEMO_COMPANIES.filter(company => favorites.includes(company.id));
    },

    // 즐겨찾기 여부 확인
    isFavorite: function(companyId) {
        if (!isLoggedIn) return false;
        const favorites = JSON.parse(localStorage.getItem('scg_favorites') || '[]');
        return favorites.includes(companyId);
    }
};

// 전역 스코프에서 접근 가능하도록 export
if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
    window.DEMO_COMPANIES = DEMO_COMPANIES;
    window.AC_PROGRAMS = AC_PROGRAMS;
    window.ANNOUNCEMENTS = ANNOUNCEMENTS;
    window.DataUtils = DataUtils;
}

// Node.js 환경에서도 사용 가능하도록
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CATEGORIES,
        DEMO_COMPANIES,
        AC_PROGRAMS,
        ANNOUNCEMENTS,
        DataUtils
    };
}