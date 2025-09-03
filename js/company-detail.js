// Company Detail Page JavaScript - SCG Dealflow Platform

let currentCompany = null;

document.addEventListener('DOMContentLoaded', function() {
    initCompanyDetailPage();
});

function initCompanyDetailPage() {
    // Get company ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');
    
    if (!companyId) {
        showCompanyNotFound();
        return;
    }
    
    // Load company data
    currentCompany = DataUtils.getCompanyById(companyId);
    
    if (!currentCompany) {
        showCompanyNotFound();
        return;
    }
    
    // Initialize page
    setupEventListeners();
    renderCompanyDetail();
    showCompanyContent();
}

function setupEventListeners() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Action buttons
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            if (!isLoggedIn) {
                showLoginModal();
                return;
            }
            toggleFavorite();
        });
    }
    
    const meetingBtn = document.getElementById('meeting-btn');
    if (meetingBtn) {
        meetingBtn.addEventListener('click', function() {
            if (!isLoggedIn) {
                showLoginModal();
                return;
            }
            showMeetingModal(currentCompany.id, currentCompany.name);
        });
    }
    
    const onepagerBtn = document.getElementById('onepager-btn');
    if (onepagerBtn) {
        onepagerBtn.addEventListener('click', function() {
            if (!isLoggedIn) {
                showLoginModal();
                return;
            }
            showOnepagerModal(currentCompany.id, currentCompany.name);
        });
    }
    
    // Breadcrumb category click
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory) {
        breadcrumbCategory.addEventListener('click', function() {
            const category = currentCompany.category;
            window.location.href = `companies.html?category=${category}`;
        });
    }
    
    // Modal setup
    setupModalEventListeners();
}

function setupModalEventListeners() {
    // Modal close buttons
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModals();
        });
    });

    // Click outside modal to close
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModals();
            }
        });
    });

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function showCompanyNotFound() {
    document.getElementById('company-not-found').classList.remove('hidden');
    document.getElementById('company-content').classList.add('hidden');
}

function showCompanyContent() {
    document.getElementById('company-not-found').classList.add('hidden');
    document.getElementById('company-content').classList.remove('hidden');
}

function renderCompanyDetail() {
    if (!currentCompany) return;
    
    // Update page title
    document.title = `${currentCompany.name} - SCG Dealflow Platform`;
    
    // Render breadcrumb
    renderBreadcrumb();
    
    // Render header
    renderCompanyHeader();
    
    // Render tabs content
    renderOverviewTab();
    renderUpdatesTab();
    renderMaterialsTab();
    renderContactTab();
    
    // Render sidebar
    renderSidebar();
    
    // Update favorite button state
    updateFavoriteButton();
}

function renderBreadcrumb() {
    const categoryInfo = CATEGORIES[currentCompany.category];
    
    document.getElementById('breadcrumb-category').textContent = categoryInfo.name;
    document.getElementById('breadcrumb-company').textContent = currentCompany.name;
}

function renderCompanyHeader() {
    const categoryInfo = CATEGORIES[currentCompany.category];
    
    // Logo
    const logo = document.getElementById('company-logo');
    logo.className = `w-20 h-20 rounded-xl bg-gradient-to-br from-${categoryInfo.color}-100 to-${categoryInfo.color}-200 flex items-center justify-center text-4xl mr-6 flex-shrink-0`;
    logo.textContent = currentCompany.logo;
    
    // Company info
    document.getElementById('company-name').textContent = currentCompany.name;
    document.getElementById('company-name-en').textContent = currentCompany.nameEn;
    document.getElementById('company-oneliner').textContent = currentCompany.oneLiner;
    
    // Website link
    const websiteLink = document.getElementById('company-website');
    websiteLink.href = currentCompany.website;
    
    // Tags
    const tagsContainer = document.getElementById('company-tags');
    tagsContainer.innerHTML = `
        <span class="px-3 py-1 bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700 text-sm rounded-full font-medium">
            ${categoryInfo.name}
        </span>
        <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            ${currentCompany.stage}
        </span>
        <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            ${currentCompany.city}, ${currentCompany.country}
        </span>
        <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            ${currentCompany.foundedYear}년 설립
        </span>
    `;
}

function renderOverviewTab() {
    document.getElementById('company-description').textContent = currentCompany.description;
}

function renderUpdatesTab() {
    const timelineContainer = document.getElementById('updates-timeline');
    const latestUpdateContainer = document.getElementById('latest-update');
    
    if (currentCompany.updates && currentCompany.updates.length > 0) {
        // Render latest update highlight
        const latestUpdate = currentCompany.updates[0];
        latestUpdateContainer.innerHTML = `
            <div class="flex items-start">
                <div class="w-3 h-3 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                    <div class="flex items-center mb-2">
                        <h4 class="text-lg font-bold text-green-800 mr-3">최신 업데이트</h4>
                        <span class="px-2 py-1 bg-green-200 text-green-700 text-xs rounded-full font-medium">
                            ${latestUpdate.period}
                        </span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        ${latestUpdate.awards ? `
                            <div>
                                <div class="font-semibold text-green-800 mb-1">🏆 수상/언론</div>
                                <div class="text-green-700">${latestUpdate.awards}</div>
                            </div>
                        ` : ''}
                        ${latestUpdate.launches ? `
                            <div>
                                <div class="font-semibold text-green-800 mb-1">🚀 제품/출시</div>
                                <div class="text-green-700">${latestUpdate.launches}</div>
                            </div>
                        ` : ''}
                        ${latestUpdate.revenue ? `
                            <div class="md:col-span-2">
                                <div class="font-semibold text-green-800 mb-1">💰 매출/성과</div>
                                <div class="text-green-700">${latestUpdate.revenue}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        // Render full timeline
        timelineContainer.innerHTML = currentCompany.updates.map((update, index) => `
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div class="flex items-center mb-4">
                    <div class="w-10 h-10 bg-scg-blue rounded-full flex items-center justify-center text-white font-bold mr-4">
                        ${String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                        <h4 class="font-bold text-scg-dark text-lg">${update.period} 업데이트</h4>
                        <div class="text-sm text-scg-gray">월간 성과 보고</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${Object.entries({
                        '🏆 Award/Press': update.awards,
                        '🔬 R&D/Project': update.rnd,
                        '⚖️ IP/특허': update.ip,
                        '🚀 Product/Launch': update.launches,
                        '💰 Revenue/Traction': update.revenue,
                        '👥 Hiring/Team': update.hiring
                    }).filter(([key, value]) => value).map(([key, value]) => `
                        <div>
                            <div class="font-semibold text-scg-dark mb-2">${key}</div>
                            <div class="text-scg-gray">${value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    } else {
        timelineContainer.innerHTML = `
            <div class="text-center py-8 text-scg-gray">
                <div class="text-4xl mb-4">📊</div>
                <div class="text-lg font-medium mb-2">업데이트 준비 중</div>
                <div>곧 월간 업데이트를 확인하실 수 있습니다.</div>
            </div>
        `;
    }
    
    // Show/hide guest message based on login status
    const guestMessage = document.getElementById('updates-guest-message');
    if (!isLoggedIn && currentCompany.updates && currentCompany.updates.length > 1) {
        guestMessage.classList.remove('hidden');
        // Hide all but first update for guests
        const updateCards = timelineContainer.querySelectorAll('.bg-white');
        updateCards.forEach((card, index) => {
            if (index > 0) {
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';
            }
        });
    } else {
        guestMessage.classList.add('hidden');
    }
}

function renderMaterialsTab() {
    // Patents list
    const patentsList = document.getElementById('patents-list');
    
    if (currentCompany.updates && currentCompany.updates[0]?.ip) {
        patentsList.innerHTML = `
            <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <i class="fas fa-certificate text-purple-500 mr-3"></i>
                <div>
                    <div class="font-medium text-purple-800">최근 특허 출원/등록</div>
                    <div class="text-sm text-purple-600">${currentCompany.updates[0].ip}</div>
                </div>
            </div>
        `;
    } else {
        patentsList.innerHTML = `
            <div class="text-center py-4 text-scg-gray">
                <div class="text-2xl mb-2">📋</div>
                <div>특허 정보 업데이트 예정</div>
            </div>
        `;
    }
}

function renderContactTab() {
    const contactInfo = document.getElementById('contact-info');
    const guestMessage = document.getElementById('contact-guest-message');
    
    if (isLoggedIn && currentCompany.contact) {
        contactInfo.innerHTML = `
            <h4 class="text-lg font-bold text-scg-dark mb-4">
                <i class="fas fa-user text-blue-500 mr-2"></i>
                담당자 정보
            </h4>
            <div class="space-y-4">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-scg-blue rounded-full flex items-center justify-center text-white font-bold mr-4">
                        ${currentCompany.contact.name.charAt(0)}
                    </div>
                    <div>
                        <div class="font-semibold text-scg-dark">${currentCompany.contact.name}</div>
                        <div class="text-scg-gray">${currentCompany.contact.title}</div>
                    </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-envelope text-scg-blue mr-3"></i>
                        <span class="font-medium text-scg-dark">이메일</span>
                    </div>
                    <a href="mailto:${currentCompany.contact.email}" 
                       class="text-scg-blue hover:underline">${currentCompany.contact.email}</a>
                </div>
                
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex items-start">
                        <i class="fas fa-info-circle text-blue-500 mr-3 mt-0.5"></i>
                        <div class="text-sm text-blue-700">
                            <div class="font-semibold mb-1">연락 시 참고사항</div>
                            <div>SCG Dealflow Platform을 통해 연결되었다고 말씀해 주시면 더 빠른 응답을 받으실 수 있습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contactInfo.classList.remove('hidden');
        guestMessage.classList.add('hidden');
    } else {
        contactInfo.classList.add('hidden');
        guestMessage.classList.remove('hidden');
    }
}

function renderSidebar() {
    // Key metrics
    const metricsContainer = document.getElementById('key-metrics');
    const metrics = currentCompany.metrics || {
        stage: currentCompany.stage,
        team: `${currentCompany.teamSize}명`,
        founded: `${currentCompany.foundedYear}년`,
        location: `${currentCompany.city}, ${currentCompany.country}`
    };
    
    metricsContainer.innerHTML = Object.entries(metrics).map(([key, value]) => `
        <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span class="text-scg-gray text-sm">${getMetricLabel(key)}</span>
            <span class="font-semibold text-scg-dark text-sm">${value}</span>
        </div>
    `).join('');
    
    // Recent updates sidebar
    const recentUpdatesContainer = document.getElementById('recent-updates-sidebar');
    if (currentCompany.recentUpdate) {
        recentUpdatesContainer.innerHTML = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span class="text-xs text-green-600 font-medium">
                        ${DataUtils.formatDate(currentCompany.recentUpdate.date)}
                    </span>
                </div>
                <div class="text-sm text-green-800 leading-relaxed">
                    ${currentCompany.recentUpdate.content}
                </div>
            </div>
        `;
    } else {
        recentUpdatesContainer.innerHTML = `
            <div class="text-center py-4 text-scg-gray">
                <div class="text-xl mb-2">📅</div>
                <div class="text-sm">업데이트 예정</div>
            </div>
        `;
    }
    
    // Similar companies
    const similarCompaniesContainer = document.getElementById('similar-companies');
    const similarCompanies = DataUtils.filterCompaniesByCategory(currentCompany.category)
        .filter(company => company.id !== currentCompany.id)
        .slice(0, 3);
    
    if (similarCompanies.length > 0) {
        similarCompaniesContainer.innerHTML = similarCompanies.map(company => `
            <a href="company-detail.html?id=${company.id}" 
               class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded text-lg flex items-center justify-center mr-3">
                    ${company.logo}
                </div>
                <div class="flex-1">
                    <div class="font-medium text-scg-dark text-sm">${company.name}</div>
                    <div class="text-xs text-scg-gray">${company.stage}</div>
                </div>
                <i class="fas fa-chevron-right text-xs text-scg-gray"></i>
            </a>
        `).join('');
    } else {
        similarCompaniesContainer.innerHTML = `
            <div class="text-center py-4 text-scg-gray">
                <div class="text-xl mb-2">🔍</div>
                <div class="text-sm">유사 기업 탐색 중</div>
            </div>
        `;
    }
}

function getMetricLabel(key) {
    const labels = {
        stage: '투자 단계',
        team: '팀 규모', 
        founded: '설립년도',
        location: '본사 위치',
        revenue: '매출',
        customers: '고객',
        employees: '직원 수',
        funding: '투자 현황',
        accuracy: '정확도',
        hospitals: '병원',
        patients: '환자',
        certification: '인증',
        efficiency: '효율성',
        installations: '설치',
        energySaved: '절약 에너지',
        roi: 'ROI',
        approvalRate: '승인률',
        companies: '기업',
        totalLoan: '총 대출액',
        avgTime: '평균 시간',
        successRate: '성공률',
        deliveries: '배송',
        stores: '매장',
        robots: '로봇',
        students: '학습자',
        schools: '학교',
        improvement: '학습 향상',
        countries: '서비스 국가',
        users: '사용자',
        partners: '파트너',
        transactions: '거래',
        security: '보안',
        patents: '특허',
        trials: '임상시험',
        pipeline: '파이프라인'
    };
    return labels[key] || key;
}

function switchTab(tabId) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`${tabId}-tab`);
    if (activePanel) {
        activePanel.classList.remove('hidden');
        activePanel.classList.add('active');
    }
}

function updateFavoriteButton() {
    const favoriteBtn = document.getElementById('favorite-btn');
    const isFav = DataUtils.isFavorite(currentCompany.id);
    
    if (isFav) {
        favoriteBtn.innerHTML = '♥ 즐겨찾기 해제';
        favoriteBtn.classList.add('bg-red-50', 'border-red-300', 'text-red-700');
        favoriteBtn.classList.remove('border-gray-300', 'text-scg-gray');
    } else {
        favoriteBtn.innerHTML = '♡ 즐겨찾기';
        favoriteBtn.classList.remove('bg-red-50', 'border-red-300', 'text-red-700');
        favoriteBtn.classList.add('border-gray-300', 'text-scg-gray');
    }
}

function toggleFavorite() {
    const wasAdded = DataUtils.toggleFavorite(currentCompany.id);
    updateFavoriteButton();
    
    if (wasAdded) {
        showToast('즐겨찾기에 추가되었습니다', 'success');
    } else {
        showToast('즐겨찾기에서 제거되었습니다', 'info');
    }
}

// Modal functions (reuse from companies.js)
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function showMeetingModal(companyId, companyName) {
    // Create modal if not exists (this page doesn't have meeting modal)
    alert(`미팅 요청 기능: ${companyName}과의 미팅을 요청하시겠습니까?`);
}

function showOnepagerModal(companyId, companyName) {
    // Create modal if not exists (this page doesn't have onepager modal)
    alert(`원페이지 요청 기능: ${companyName}의 원페이지를 이메일로 받으시겠습니까?`);
}

function closeModals() {
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
}

function handleLogin() {
    const inviteCode = document.getElementById('invite-code').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple demo login
    if (inviteCode.startsWith('SCG-') && email && password) {
        isLoggedIn = true;
        currentUser = {
            email: email,
            role: 'investor',
            name: email.split('@')[0]
        };

        closeModals();
        showToast('로그인되었습니다', 'success');
        
        // Update login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.textContent = currentUser.name;
        }
        
        // Re-render tabs to show member content
        renderUpdatesTab();
        renderContactTab();
        updateFavoriteButton();
    } else {
        showToast('올바른 초대 코드와 로그인 정보를 입력해주세요', 'error');
    }
}

// Toast notification function (reuse from companies.js)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white max-w-sm transform translate-x-full transition-transform duration-300`;
    
    switch (type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'info':
        default:
            toast.classList.add('bg-blue-500');
            break;
    }
    
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
}

// CSS for tabs
const style = document.createElement('style');
style.textContent = `
    .tab-btn {
        padding: 0.75rem 1rem;
        border-bottom: 2px solid transparent;
        color: #64748b;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .tab-btn:hover {
        color: #1e40af;
        border-bottom-color: #e2e8f0;
    }
    
    .tab-btn.active {
        color: #1e40af;
        border-bottom-color: #1e40af;
        font-weight: 600;
    }
    
    .tab-panel {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);