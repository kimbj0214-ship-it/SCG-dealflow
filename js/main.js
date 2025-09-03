// SCG Dealflow Platform - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initStatsCounter();
    initBetaForm();
    initTooltips();
    initProgressBar();
    initUserState();
    initLatestUpdatesSlider();
    initCategoryNavigation();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add staggered animation delay for multiple elements
                const siblings = entry.target.parentElement.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.classList.contains('animate-on-scroll')) {
                        setTimeout(() => {
                            sibling.classList.add('animated');
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animate-on-scroll class to key elements
    const elementsToAnimate = [
        '.category-card',
        '.feature-highlight',
        '.stats-counter'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on original text
            const originalText = counter.textContent;
            if (originalText.includes('%')) {
                counter.textContent = Math.floor(current) + '%+';
            } else if (originalText.includes('h')) {
                counter.textContent = Math.floor(current) + 'h';
            } else {
                counter.textContent = Math.floor(current) + '%+';
            }
        }, 16);
    };
    
    // Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        statsObserver.observe(counter);
    });
}

// Beta Form Handling
function initBetaForm() {
    const form = document.getElementById('beta-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            
            // Process regular fields
            for (let [key, value] of formData.entries()) {
                if (key === 'interests') {
                    if (!data.interests) data.interests = [];
                    data.interests.push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // Process checkboxes separately for interests
            const interestCheckboxes = form.querySelectorAll('input[name="interests"]:checked');
            data.interests = Array.from(interestCheckboxes).map(cb => cb.value);
            
            // Validate required fields
            if (!data.company || !data.name || !data.email || !data.user_type) {
                showMessage('필수 항목을 모두 입력해주세요.', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }
            
            // Check terms agreement
            if (!data.agree_terms) {
                showMessage('약관에 동의해주세요.', 'error');
                return;
            }
            
            // Submit form (simulate API call)
            submitBetaForm(data);
        });
    }
}

function submitBetaForm(data) {
    const submitBtn = document.querySelector('#beta-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="loading-spinner"></div>제출 중...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage(
            `${data.name}님의 베타 신청이 성공적으로 접수되었습니다! 런칭 전 초대 코드를 이메일로 발송해드리겠습니다.`,
            'success'
        );
        
        // Reset form
        document.getElementById('beta-form').reset();
        
        // Log data (in real app, this would be sent to server)
        console.log('Beta signup data:', data);
        
        // Store in localStorage for demo purposes
        const existingSignups = JSON.parse(localStorage.getItem('beta_signups') || '[]');
        existingSignups.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('beta_signups', JSON.stringify(existingSignups));
        
    }, 2000); // Simulate 2 second delay
}

function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message-success, .message-error');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message-${type}`;
    message.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-3"></i>
            <span>${text}</span>
        </div>
    `;
    
    // Insert after form
    const form = document.getElementById('beta-form');
    form.parentNode.insertBefore(message, form.nextSibling);
    
    // Animate in
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
}

// Tooltips for category icons
function initTooltips() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle zoom effect
            const icon = this.querySelector('.w-16');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset zoom
            const icon = this.querySelector('.w-16');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Reading Progress Bar
function initProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 z-50 transition-all duration-300';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/98');
        navbar.classList.remove('bg-white/95');
    } else {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/98');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = document.querySelector('#mobile-menu-btn i');
            if (icon) icon.className = 'fas fa-bars text-xl';
        }
    }
});

// Performance monitoring (optional)
window.addEventListener('load', function() {
    console.log('🚀 SCG Dealflow Platform loaded successfully!');
    
    // Performance metrics
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`⚡ Page load time: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    }
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Validate email
    isValidEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// User State Management
let currentUser = null;
let isLoggedIn = false;

function initUserState() {
    // Simulate user login state for demo (you can toggle this)
    // In real app, this would check authentication token
    isLoggedIn = localStorage.getItem('scg_demo_logged_in') === 'true';
    
    if (isLoggedIn) {
        currentUser = {
            name: '김투자',
            type: 'investor',
            email: 'investor@example.com'
        };
    }
    
    // Update UI based on login state
    updateUserStateUI();
}

function updateUserStateUI() {
    // Update header user widget
    const userWidget = document.querySelector('.user-state-widget');
    if (userWidget) {
        if (isLoggedIn && currentUser) {
            userWidget.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 text-sm font-semibold">${currentUser.name.charAt(0)}</span>
                    </div>
                    <div class="hidden md:block">
                        <div class="text-sm font-semibold text-scg-dark">${currentUser.name}</div>
                        <div class="text-xs text-scg-gray">${currentUser.type === 'investor' ? '투자자' : '기업'}</div>
                    </div>
                    <button onclick="toggleUserMenu()" class="text-scg-gray hover:text-scg-dark">
                        ▼
                    </button>
                </div>
            `;
        } else {
            userWidget.innerHTML = `
                <div class="flex items-center gap-2">
                    <button onclick="simulateLogin()" class="bg-scg-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        로그인
                    </button>
                    <button class="text-scg-gray hover:text-scg-dark font-medium">
                        회원가입
                    </button>
                </div>
            `;
        }
    }
}

function simulateLogin() {
    isLoggedIn = true;
    localStorage.setItem('scg_demo_logged_in', 'true');
    currentUser = {
        name: '김투자',
        type: 'investor',
        email: 'investor@example.com'
    };
    updateUserStateUI();
    
    // Refresh updates slider to show full content
    if (window.latestUpdatesSlider) {
        window.latestUpdatesSlider.refresh();
    }
    
    // Show success message
    showMessage('데모 계정으로 로그인되었습니다!', 'success');
}

function simulateLogout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('scg_demo_logged_in');
    updateUserStateUI();
    
    // Refresh updates slider to show teaser content
    if (window.latestUpdatesSlider) {
        window.latestUpdatesSlider.refresh();
    }
}

function toggleUserMenu() {
    // Simple demo - in real app would show dropdown menu
    const confirm = window.confirm('로그아웃 하시겠습니까?');
    if (confirm) {
        simulateLogout();
    }
}

// Latest Updates Slider
function initLatestUpdatesSlider() {
    if (!window.DEMO_COMPANIES) {
        console.warn('DEMO_COMPANIES not loaded yet');
        return;
    }
    
    const slider = new LatestUpdatesSlider();
    window.latestUpdatesSlider = slider;
}

class LatestUpdatesSlider {
    constructor() {
        this.container = document.getElementById('updates-slider');
        this.dotsContainer = document.getElementById('updates-dots');
        this.prevBtn = document.getElementById('updates-prev');
        this.nextBtn = document.getElementById('updates-next');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.companies = [];
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        this.loadCompanies();
        this.render();
        this.bindEvents();
        this.updateDots();
        
        // Handle resize
        window.addEventListener('resize', utils.debounce(() => {
            this.itemsPerView = this.getItemsPerView();
            this.render();
            this.updateDots();
        }, 250));
    }
    
    loadCompanies() {
        // Get recently updated companies
        this.companies = window.DataUtils.getRecentlyUpdatedCompanies(8);
    }
    
    getItemsPerView() {
        if (window.innerWidth >= 1280) return 3; // xl
        if (window.innerWidth >= 768) return 2;  // md
        return 1; // sm
    }
    
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = this.companies.map(company => this.renderCompanyCard(company)).join('');
        this.updateNavigation();
    }
    
    renderCompanyCard(company) {
        const categoryInfo = window.DataUtils.getCategoryInfo(company.category);
        const isGuest = !isLoggedIn;
        const update = company.updates[0]; // Get latest update
        
        // For guests, show truncated content
        const contentPreview = isGuest 
            ? company.recentUpdate.content.substring(0, 50) + '...'
            : company.recentUpdate.content;
        
        // Generate update badges based on available data
        const updateBadges = [];
        if (update.awards) updateBadges.push({ type: 'Award', color: 'yellow' });
        if (update.ip) updateBadges.push({ type: 'IP', color: 'purple' });
        if (update.rnd) updateBadges.push({ type: 'R&D', color: 'blue' });
        if (update.launches) updateBadges.push({ type: 'Launch', color: 'green' });
        if (update.revenue) updateBadges.push({ type: 'Revenue', color: 'emerald' });
        if (update.hiring) updateBadges.push({ type: 'Hiring', color: 'indigo' });
        
        return `
            <div class="flex-shrink-0 w-full md:w-1/2 xl:w-1/3 px-3">
                <div class="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 p-6 h-full">
                    <!-- Header -->
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 flex items-center justify-center text-xl">
                            ${company.logo}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-scg-dark truncate">${company.name}</div>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${categoryInfo.color}-100 text-${categoryInfo.color}-800">
                                    ${company.subcategories[0].split('-')[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Update Content -->
                    <div class="mb-4">
                        <div class="text-sm text-scg-gray mb-2">
                            ${window.DataUtils.formatDate(company.recentUpdate.date)}
                        </div>
                        <div class="text-scg-dark leading-relaxed ${isGuest ? 'relative' : ''}">
                            ${contentPreview}
                            ${isGuest ? '<div class="absolute inset-0 bg-gradient-to-r from-transparent to-white pointer-events-none"></div>' : ''}
                        </div>
                    </div>
                    
                    <!-- Update Badges -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${updateBadges.slice(0, 3).map(badge => `
                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${badge.color}-100 text-${badge.color}-800">
                                ${badge.type}
                            </span>
                        `).join('')}
                        ${updateBadges.length > 3 ? `<span class="text-xs text-scg-gray">+${updateBadges.length - 3}개</span>` : ''}
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        ${isGuest ? `
                            <button onclick="showLoginPrompt()" class="flex-1 bg-scg-blue text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                1-pager 요청
                            </button>
                            <button onclick="showLoginPrompt()" class="flex-1 border border-gray-300 text-scg-gray px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                미팅 요청
                            </button>
                        ` : `
                            <button onclick="requestOnePager('${company.id}')" class="flex-1 bg-scg-blue text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                1-pager 요청
                            </button>
                            <button onclick="requestMeeting('${company.id}')" class="flex-1 border border-gray-300 text-scg-gray px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                미팅 요청
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });
        
        this.container.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }
    
    prev() {
        const maxIndex = Math.max(0, this.companies.length - this.itemsPerView);
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateSlider();
    }
    
    next() {
        const maxIndex = Math.max(0, this.companies.length - this.itemsPerView);
        this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        this.updateSlider();
    }
    
    updateSlider() {
        const translateX = -(this.currentIndex * (100 / this.itemsPerView));
        this.container.style.transform = `translateX(${translateX}%)`;
        this.updateNavigation();
        this.updateDots();
    }
    
    updateNavigation() {
        const maxIndex = Math.max(0, this.companies.length - this.itemsPerView);
        
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.prevBtn.classList.toggle('opacity-50', this.currentIndex === 0);
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
            this.nextBtn.classList.toggle('opacity-50', this.currentIndex >= maxIndex);
        }
    }
    
    updateDots() {
        if (!this.dotsContainer) return;
        
        const maxIndex = Math.max(0, this.companies.length - this.itemsPerView);
        const totalDots = maxIndex + 1;
        
        this.dotsContainer.innerHTML = Array.from({ length: totalDots }, (_, i) => `
            <button 
                class="w-2 h-2 rounded-full transition-colors ${i === this.currentIndex ? 'bg-scg-blue' : 'bg-gray-300'}"
                onclick="window.latestUpdatesSlider.goToSlide(${i})"
            ></button>
        `).join('');
    }
    
    goToSlide(index) {
        const maxIndex = Math.max(0, this.companies.length - this.itemsPerView);
        this.currentIndex = Math.min(maxIndex, Math.max(0, index));
        this.updateSlider();
    }
    
    refresh() {
        this.render();
        this.updateDots();
    }
}

// Category Navigation
function initCategoryNavigation() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
    
    // Category button click handlers
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide subcategories
            showSubcategoriesForCategory(category);
            
            // Navigate to companies page with filter
            // For demo, just show message
            console.log(`Filtering by category: ${category}`);
        });
    });
    
    // Subcategory button click handlers  
    subcategoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const subcategory = this.dataset.subcategory;
            
            // Update active state
            subcategoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Navigate to companies page with subcategory filter
            console.log(`Filtering by subcategory: ${subcategory}`);
        });
    });
}

function showSubcategoriesForCategory(category) {
    const subcategoryStrips = document.querySelectorAll('.subcategory-strip');
    
    subcategoryStrips.forEach(strip => {
        if (strip.dataset.category === category) {
            strip.classList.remove('hidden');
        } else {
            strip.classList.add('hidden');
        }
    });
}

// Interaction Functions
function showLoginPrompt() {
    const message = '로그인이 필요한 서비스입니다. 로그인하시겠습니까?';
    if (confirm(message)) {
        simulateLogin();
    }
}

function requestOnePager(companyId) {
    const company = window.DataUtils.getCompanyById(companyId);
    if (company) {
        showMessage(`${company.name}의 1-pager 요청이 전송되었습니다!`, 'success');
        
        // In real app, would make API call
        console.log(`One-pager requested for company: ${companyId}`);
    }
}

function requestMeeting(companyId) {
    const company = window.DataUtils.getCompanyById(companyId);
    if (company) {
        showMessage(`${company.name}과의 미팅 요청이 전송되었습니다!`, 'success');
        
        // In real app, would make API call  
        console.log(`Meeting requested for company: ${companyId}`);
    }
}

// Make functions available globally
window.simulateLogin = simulateLogin;
window.simulateLogout = simulateLogout;
window.toggleUserMenu = toggleUserMenu;
window.showLoginPrompt = showLoginPrompt;
window.requestOnePager = requestOnePager;
window.requestMeeting = requestMeeting;

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}