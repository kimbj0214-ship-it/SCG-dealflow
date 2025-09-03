// Programs Page JavaScript - SCG Dealflow Platform

document.addEventListener('DOMContentLoaded', function() {
    initProgramsPage();
});

function initProgramsPage() {
    renderPrograms();
    setupEventListeners();
}

function setupEventListeners() {
    // FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });

    // Other button event listeners would go here
}

function renderPrograms() {
    const programsGrid = document.getElementById('programs-grid');
    if (!programsGrid) return;

    programsGrid.innerHTML = AC_PROGRAMS.map(program => createProgramCard(program)).join('');
}

function createProgramCard(program) {
    const statusClass = program.status === '모집 중' ? 'bg-green-100 text-green-800' : 
                       program.status === '심사 중' ? 'bg-orange-100 text-orange-800' : 
                       'bg-gray-100 text-gray-600';

    const categoryBadges = program.categories.map(cat => {
        const categoryInfo = CATEGORIES[cat];
        return `<span class="px-2 py-1 bg-${categoryInfo.color}-100 text-${categoryInfo.color}-700 text-xs rounded-full font-medium">
            ${categoryInfo.name}
        </span>`;
    }).join('');

    return `
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <!-- Program Header -->
            <div class="bg-gradient-to-r from-scg-blue to-blue-600 text-white p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">${program.logo}</div>
                    <span class="px-3 py-1 ${statusClass} text-sm font-medium rounded-full">
                        ${program.status}
                    </span>
                </div>
                <h3 class="text-2xl font-bold mb-2">${program.title}</h3>
                <p class="text-blue-100 text-lg">${program.partner}</p>
            </div>

            <!-- Program Content -->
            <div class="p-6">
                <!-- Description -->
                <p class="text-scg-gray mb-6 leading-relaxed">
                    ${program.description}
                </p>

                <!-- Category Tags -->
                <div class="flex flex-wrap gap-2 mb-6">
                    ${categoryBadges}
                </div>

                <!-- Key Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-scg-blue">${program.participants}</div>
                        <div class="text-sm text-scg-gray">선정 기업</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-scg-blue">4-6개월</div>
                        <div class="text-sm text-scg-gray">프로그램 기간</div>
                    </div>
                </div>

                <!-- Timeline Preview -->
                <div class="mb-6">
                    <h4 class="font-semibold text-scg-dark mb-3">
                        <i class="fas fa-calendar-alt text-scg-blue mr-2"></i>
                        프로그램 일정
                    </h4>
                    <div class="text-sm text-scg-gray space-y-1">
                        ${program.timeline.split('\n').slice(0, 3).map(line => 
                            line.trim() ? `<div>• ${line.trim().replace(/^\*\*|\*\*$/g, '').replace(/\*\*/g, '')}</div>` : ''
                        ).join('')}
                        <div class="text-scg-blue cursor-pointer hover:underline" onclick="showProgramDetail('${program.id}')">
                            자세히 보기 →
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <button class="flex-1 bg-scg-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            onclick="applyToProgram('${program.id}')">
                        <i class="fas fa-paper-plane mr-2"></i>
                        프로그램 지원
                    </button>
                    <button class="flex-1 border border-scg-blue text-scg-blue py-3 px-4 rounded-lg font-semibold hover:bg-scg-blue hover:text-white transition-colors"
                            onclick="watchVideo('${program.videoLink}')">
                        <i class="fas fa-play mr-2"></i>
                        소개 영상
                    </button>
                </div>

                <!-- Additional Info -->
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between text-sm text-scg-gray">
                        <div class="flex items-center">
                            <i class="fas fa-building mr-2"></i>
                            <span>파트너: ${program.partner.split(' x ')[0]}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-users mr-2"></i>
                            <span>모집: ${program.participants}개 기업</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function toggleFAQ(faqItem) {
    const content = faqItem.querySelector('.mt-4');
    const icon = faqItem.querySelector('i');
    
    if (content.classList.contains('hidden')) {
        // Close other FAQ items
        document.querySelectorAll('.faq-item .mt-4').forEach(item => {
            item.classList.add('hidden');
        });
        document.querySelectorAll('.faq-item i').forEach(item => {
            item.classList.remove('fa-chevron-up');
            item.classList.add('fa-chevron-down');
        });
        
        // Open this FAQ item
        content.classList.remove('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        // Close this FAQ item
        content.classList.add('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function showProgramDetail(programId) {
    const program = AC_PROGRAMS.find(p => p.id === programId);
    if (!program) return;

    // Create modal for program details
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="text-3xl mr-4">${program.logo}</div>
                        <div>
                            <h3 class="text-2xl font-bold text-scg-dark">${program.title}</h3>
                            <div class="text-scg-gray">${program.partner}</div>
                        </div>
                    </div>
                    <button onclick="closeModal(this)" class="text-scg-gray hover:text-scg-dark text-2xl">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2">
                        <h4 class="text-xl font-bold text-scg-dark mb-4">프로그램 상세 정보</h4>
                        <p class="text-scg-gray mb-6 text-lg leading-relaxed">${program.description}</p>
                        
                        <div class="prose prose-blue max-w-none">
                            ${program.timeline.split('\n').map(line => {
                                if (line.startsWith('**') && line.endsWith('**')) {
                                    return `<h5 class="font-bold text-scg-dark mt-6 mb-3">${line.replace(/\*\*/g, '')}</h5>`;
                                } else if (line.startsWith('- ')) {
                                    return `<div class="ml-4 mb-2">• ${line.substring(2)}</div>`;
                                } else if (line.trim()) {
                                    return `<div class="mb-2">${line}</div>`;
                                }
                                return '';
                            }).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <div class="bg-gray-50 rounded-xl p-6 mb-6">
                            <h5 class="font-bold text-scg-dark mb-4">프로그램 정보</h5>
                            <div class="space-y-3 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-scg-gray">상태</span>
                                    <span class="font-semibold text-green-600">${program.status}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-scg-gray">선정 기업</span>
                                    <span class="font-semibold">${program.participants}개</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-scg-gray">기간</span>
                                    <span class="font-semibold">4-6개월</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-scg-gray">투자 규모</span>
                                    <span class="font-semibold">최대 2억원</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-3">
                            <button onclick="applyToProgram('${program.id}')" 
                                    class="w-full bg-scg-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                <i class="fas fa-paper-plane mr-2"></i>
                                지원하기
                            </button>
                            <button onclick="watchVideo('${program.videoLink}')" 
                                    class="w-full border border-scg-blue text-scg-blue py-3 px-4 rounded-lg font-semibold hover:bg-scg-blue hover:text-white transition-colors">
                                <i class="fas fa-play mr-2"></i>
                                소개 영상 보기
                            </button>
                            <a href="${program.applyLink}" target="_blank"
                               class="block text-center w-full border border-gray-300 text-scg-gray py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                                <i class="fas fa-external-link-alt mr-2"></i>
                                외부 지원 페이지
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(modal.querySelector('button'));
        }
    });
}

function applyToProgram(programId) {
    const program = AC_PROGRAMS.find(p => p.id === programId);
    if (!program) return;

    // In a real application, this would open an application form
    // For demo purposes, we'll show a simple alert
    if (confirm(`${program.title}에 지원하시겠습니까?\n\n지원서 작성 페이지로 이동합니다.`)) {
        // Redirect to application form or show application modal
        window.open(program.applyLink, '_blank');
        
        // Log the application attempt
        console.log('Program application:', {
            programId,
            programTitle: program.title,
            timestamp: new Date().toISOString()
        });
        
        // Show success message
        showToast(`${program.title} 지원서 페이지로 이동합니다`, 'info');
    }
}

function watchVideo(videoLink) {
    if (videoLink && videoLink !== 'https://youtube.com/watch?v=sample') {
        window.open(videoLink, '_blank');
    } else {
        // Show modal with embedded video or placeholder
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-4xl w-full">
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 class="text-xl font-bold text-scg-dark">프로그램 소개 영상</h3>
                    <button onclick="closeModal(this)" class="text-scg-gray hover:text-scg-dark text-xl">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div class="text-center text-scg-gray">
                            <div class="text-4xl mb-4">🎥</div>
                            <div class="text-lg font-semibold mb-2">소개 영상 준비 중</div>
                            <div>곧 프로그램 소개 영상을 만나보실 수 있습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(modal.querySelector('button'));
            }
        });
    }
}

function closeModal(button) {
    const modal = button.closest('.fixed');
    if (modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
}

// Toast notification function (reuse from other pages)
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

// Add some CSS for better styling
const style = document.createElement('style');
style.textContent = `
    .prose h5 {
        color: #1e293b;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
    }
    
    .faq-item:hover {
        transform: translateY(-2px);
    }
    
    .program-card:hover {
        transform: translateY(-4px);
    }
`;
document.head.appendChild(style);