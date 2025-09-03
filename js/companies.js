// Companies Page JavaScript - SCG Dealflow Platform

document.addEventListener('DOMContentLoaded', function() {
    initCompaniesPage();
});

let currentCompanies = [];
let filteredCompanies = [];
let currentFilters = {
    category: 'all',
    stage: '',
    country: '',
    search: ''
};

function initCompaniesPage() {
    // Load initial data
    currentCompanies = [...DEMO_COMPANIES];
    filteredCompanies = [...currentCompanies];
    
    // Initialize UI
    setupEventListeners();
    updateCompanyCount();
    renderCompanies();
    updateFilterCounts();
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = e.target.value.trim();
                applyFilters();
            }, 300);
        });
    }

    // Category filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            currentFilters.category = this.dataset.category;
            applyFilters();
        });
    });

    // Advanced filters
    const stageFilter = document.getElementById('stage-filter');
    if (stageFilter) {
        stageFilter.addEventListener('change', function() {
            currentFilters.stage = this.value;
            applyFilters();
        });
    }

    const countryFilter = document.getElementById('country-filter');
    if (countryFilter) {
        countryFilter.addEventListener('change', function() {
            currentFilters.country = this.value;
            applyFilters();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortAndRenderCompanies(this.value);
        });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            clearAllFilters();
        });
    }

    // Modal event listeners
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

    // Meeting form
    const meetingForm = document.getElementById('meeting-form');
    if (meetingForm) {
        meetingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleMeetingRequest();
        });
    }

    // One-pager form
    const onepagerForm = document.getElementById('onepager-form');
    if (onepagerForm) {
        onepagerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleOnepagerRequest();
        });
    }
}

function applyFilters() {
    filteredCompanies = currentCompanies.filter(company => {
        // Category filter
        if (currentFilters.category !== 'all' && company.category !== currentFilters.category) {
            return false;
        }

        // Stage filter
        if (currentFilters.stage && company.stage !== currentFilters.stage) {
            return false;
        }

        // Country filter
        if (currentFilters.country && company.country !== currentFilters.country) {
            return false;
        }

        // Search filter
        if (currentFilters.search) {
            const searchTerm = currentFilters.search.toLowerCase();
            const searchableText = [
                company.name,
                company.nameEn,
                company.oneLiner,
                company.description,
                company.city
            ].join(' ').toLowerCase();
            
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });

    updateCompanyCount();
    renderCompanies();
    toggleNoResults();
}

function sortAndRenderCompanies(sortBy) {
    switch (sortBy) {
        case 'recent':
            filteredCompanies.sort((a, b) => {
                const dateA = new Date(a.recentUpdate?.date || '2024-01-01');
                const dateB = new Date(b.recentUpdate?.date || '2024-01-01');
                return dateB - dateA;
            });
            break;
        case 'name':
            filteredCompanies.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'stage':
            const stageOrder = { 'Seed': 1, 'Pre-A': 2, 'Series A': 3, 'Series B': 4 };
            filteredCompanies.sort((a, b) => (stageOrder[a.stage] || 0) - (stageOrder[b.stage] || 0));
            break;
    }
    renderCompanies();
}

function renderCompanies() {
    const grid = document.getElementById('companies-grid');
    if (!grid) return;

    if (filteredCompanies.length === 0) {
        grid.innerHTML = '';
        return;
    }

    grid.innerHTML = filteredCompanies.map(company => createCompanyCard(company)).join('');
    
    // Add event listeners to newly created cards
    addCardEventListeners();
}

function createCompanyCard(company) {
    const categoryInfo = CATEGORIES[company.category];
    const subcategoryNames = company.subcategories.map(sub => 
        categoryInfo.subcategories[sub]
    ).join(', ');

    const recentUpdateDate = company.recentUpdate ? 
        DataUtils.formatDate(company.recentUpdate.date) : '';

    return `
        <div class="company-card bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group">
            <div class="p-6">
                <!-- Header -->
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-${categoryInfo.color}-100 to-${categoryInfo.color}-200 
                                    flex items-center justify-center text-2xl mr-4">
                            ${company.logo}
                        </div>
                        <div>
                            <h3 class="font-bold text-scg-dark text-lg mb-1 group-hover:text-scg-blue transition-colors">
                                ${company.name}
                            </h3>
                            <div class="text-sm text-scg-gray">${company.nameEn}</div>
                        </div>
                    </div>
                    <button class="favorite-btn ${DataUtils.isFavorite(company.id) ? 'active' : ''}" 
                            data-company-id="${company.id}">
                        ♡
                    </button>
                </div>

                <!-- One-liner -->
                <p class="text-scg-gray mb-4 line-clamp-2">
                    ${company.oneLiner}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-2 py-1 bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700 text-xs rounded-full font-medium">
                        ${categoryInfo.name}
                    </span>
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        ${company.stage}
                    </span>
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        ${company.city}
                    </span>
                </div>

                <!-- Recent Update -->
                ${company.recentUpdate ? `
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div class="flex items-start">
                            <div class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <div>
                                <div class="text-xs text-green-600 font-medium mb-1">
                                    최근 업데이트 • ${recentUpdateDate}
                                </div>
                                <div class="text-sm text-green-800 line-clamp-2">
                                    ${company.recentUpdate.content}
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Key Metrics -->
                <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                        <div class="text-scg-gray">팀 규모</div>
                        <div class="font-semibold text-scg-dark">${company.teamSize}명</div>
                    </div>
                    <div>
                        <div class="text-scg-gray">설립년도</div>
                        <div class="font-semibold text-scg-dark">${company.foundedYear}</div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-2">
                    <button class="flex-1 bg-scg-blue text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 
                                   transition-colors meeting-request-btn" 
                            data-company-id="${company.id}" 
                            data-company-name="${company.name}">
                        미팅 요청
                    </button>
                    <button class="flex-1 border border-scg-blue text-scg-blue py-2 px-4 rounded-lg font-medium 
                                   hover:bg-scg-blue hover:text-white transition-colors onepager-request-btn"
                            data-company-id="${company.id}" 
                            data-company-name="${company.name}">
                        원페이지
                    </button>
                </div>

                <!-- Detail Link -->
                <div class="mt-4 text-center">
                    <a href="company-detail.html?id=${company.id}" 
                       class="text-scg-blue hover:text-blue-700 text-sm font-medium hover:underline">
                        상세 정보 보기 →
                    </a>
                </div>
            </div>
        </div>
    `;
}

function addCardEventListeners() {
    // Favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isLoggedIn) {
                showLoginModal();
                return;
            }
            toggleFavorite(this.dataset.companyId, this);
        });
    });

    // Meeting request buttons
    const meetingButtons = document.querySelectorAll('.meeting-request-btn');
    meetingButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!isLoggedIn) {
                showLoginModal();
                return;
            }
            showMeetingModal(this.dataset.companyId, this.dataset.companyName);
        });
    });

    // One-pager request buttons
    const onepagerButtons = document.querySelectorAll('.onepager-request-btn');
    onepagerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!isLoggedIn) {
                showLoginModal();
                return;
            }
            showOnepagerModal(this.dataset.companyId, this.dataset.companyName);
        });
    });
}

function updateCompanyCount() {
    const countElement = document.getElementById('company-count');
    if (countElement) {
        countElement.textContent = filteredCompanies.length;
    }
}

function updateFilterCounts() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        const category = tab.dataset.category;
        let count;
        
        if (category === 'all') {
            count = currentCompanies.length;
        } else {
            count = currentCompanies.filter(company => company.category === category).length;
        }
        
        const badge = tab.querySelector('span');
        if (badge) {
            badge.textContent = count;
        }
    });
}

function toggleNoResults() {
    const noResults = document.getElementById('no-results');
    const grid = document.getElementById('companies-grid');
    
    if (filteredCompanies.length === 0) {
        noResults.classList.remove('hidden');
        grid.classList.add('hidden');
    } else {
        noResults.classList.add('hidden');
        grid.classList.remove('hidden');
    }
}

function clearAllFilters() {
    // Reset filters
    currentFilters = {
        category: 'all',
        stage: '',
        country: '',
        search: ''
    };

    // Reset UI
    document.getElementById('search-input').value = '';
    document.getElementById('stage-filter').value = '';
    document.getElementById('country-filter').value = '';
    
    // Reset active tab
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector('[data-category="all"]').classList.add('active');

    // Apply filters
    applyFilters();
}

function toggleFavorite(companyId, button) {
    const wasAdded = DataUtils.toggleFavorite(companyId);
    
    if (wasAdded) {
        button.classList.add('active');
        showToast('즐겨찾기에 추가되었습니다', 'success');
    } else {
        button.classList.remove('active');
        showToast('즐겨찾기에서 제거되었습니다', 'info');
    }
}

// Modal functions
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function showMeetingModal(companyId, companyName) {
    const modal = document.getElementById('meeting-modal');
    if (modal) {
        // Update modal title with company name
        modal.querySelector('h3').textContent = `${companyName} 미팅 요청`;
        modal.dataset.companyId = companyId;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function showOnepagerModal(companyId, companyName) {
    const modal = document.getElementById('onepager-modal');
    if (modal) {
        // Update modal title with company name  
        modal.querySelector('h3').textContent = `${companyName} 원페이지 요청`;
        modal.dataset.companyId = companyId;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill email if logged in
        const emailInput = document.getElementById('onepager-email');
        if (currentUser?.email) {
            emailInput.value = currentUser.email;
        }
    }
}

function closeModals() {
    const modals = document.querySelectorAll('[id$="-modal"]');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = '';
}

// Form handlers
function handleLogin() {
    const inviteCode = document.getElementById('invite-code').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple demo login - in real app, this would validate against server
    if (inviteCode.startsWith('SCG-') && email && password) {
        // Simulate successful login
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
            loginBtn.onclick = null; // Remove login functionality
        }
        
        // Re-render companies to show favorite states
        renderCompanies();
    } else {
        showToast('올바른 초대 코드와 로그인 정보를 입력해주세요', 'error');
    }
}

function handleMeetingRequest() {
    const modal = document.getElementById('meeting-modal');
    const companyId = modal.dataset.companyId;
    const formData = new FormData(document.getElementById('meeting-form'));
    
    // Simulate API call
    setTimeout(() => {
        closeModals();
        showToast('미팅 요청이 전송되었습니다. 24시간 내에 연락드리겠습니다.', 'success');
        
        // Log the request (in real app, send to server)
        console.log('Meeting request:', {
            companyId,
            requester: currentUser,
            formData: Object.fromEntries(formData)
        });
    }, 1000);
}

function handleOnepagerRequest() {
    const modal = document.getElementById('onepager-modal');
    const companyId = modal.dataset.companyId;
    const email = document.getElementById('onepager-email').value;
    
    // Simulate email sending
    setTimeout(() => {
        closeModals();
        showToast(`${email}로 원페이지가 전송되었습니다. 이메일을 확인해주세요.`, 'success');
        
        // Log the request (in real app, send to server)
        console.log('One-pager request:', {
            companyId,
            email,
            requester: currentUser
        });
    }, 1000);
}

// Toast notification function
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

// CSS classes for line-clamp (add to CSS if not using Tailwind JIT)
const style = document.createElement('style');
style.textContent = `
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .filter-tab {
        padding: 0.5rem 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        background: white;
        color: #64748b;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .filter-tab:hover {
        border-color: #1e40af;
        color: #1e40af;
    }
    
    .filter-tab.active {
        background: #1e40af;
        color: white;
        border-color: #1e40af;
    }
    
    .filter-tab.active span {
        background: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
    }
    
    .favorite-btn {
        color: #d1d5db;
        transition: color 0.2s;
        padding: 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }
    
    .favorite-btn:hover {
        color: #ef4444;
    }
    
    .favorite-btn.active {
        color: #ef4444;
    }
`;
document.head.appendChild(style);