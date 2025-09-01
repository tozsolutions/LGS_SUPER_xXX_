// LGS Super XXX - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeApp();
});

function initializeApp() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize forms
    initializeForms();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize theme
    initializeTheme();
    
    console.log('LGS Super XXX initialized successfully');
}

// Tooltip initialization
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .subject-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initializeForms() {
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Dynamic form interactions
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
    });

    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', checkPasswordStrength);
    });
}

// Email validation
function validateEmail(event) {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showToast('Geçerli bir email adresi giriniz', 'warning');
    }
}

// Password strength checker
function checkPasswordStrength(event) {
    const password = event.target.value;
    const strengthMeter = document.getElementById('password-strength');
    
    if (!strengthMeter) return;
    
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (strength < 3) {
        feedback = 'Zayıf';
        strengthMeter.className = 'progress-bar bg-danger';
        strengthMeter.style.width = '33%';
    } else if (strength < 5) {
        feedback = 'Orta';
        strengthMeter.className = 'progress-bar bg-warning';
        strengthMeter.style.width = '66%';
    } else {
        feedback = 'Güçlü';
        strengthMeter.className = 'progress-bar bg-success';
        strengthMeter.style.width = '100%';
    }
    
    strengthMeter.textContent = feedback;
}

// Navigation handling
function initializeNavigation() {
    // Active navigation highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme handling
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Utility functions
function showToast(message, type = 'info', duration = 3000) {
    // Create toast element if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: duration
    });
    
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

function showLoading(element, text = 'Yükleniyor...') {
    if (!element) return;
    
    element.disabled = true;
    element.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        ${text}
    `;
}

function hideLoading(element, originalText) {
    if (!element) return;
    
    element.disabled = false;
    element.innerHTML = originalText;
}

// API helper functions
async function apiRequest(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const config = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Bir hata oluştu');
        }
        
        return data;
    } catch (error) {
        showToast(error.message, 'danger');
        throw error;
    }
}

// Exam functionality
function startExam(examId) {
    if (!examId) {
        showToast('Sınav ID bulunamadı', 'danger');
        return;
    }
    
    // Confirm before starting
    if (confirm('Sınavı başlatmak istediğinizden emin misiniz?')) {
        window.location.href = `/sinavlar/${examId}/baslat`;
    }
}

function submitExam(examId, answers) {
    return apiRequest(`/api/exams/${examId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers })
    });
}

// Question functionality
function selectAnswer(questionId, answerIndex) {
    const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
    if (!questionElement) return;
    
    // Clear previous selections
    questionElement.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select new answer
    const selectedOption = questionElement.querySelector(`[data-answer-index="${answerIndex}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
}

// Timer functionality
function startTimer(duration, display) {
    let timer = duration;
    const interval = setInterval(function() {
        const minutes = parseInt(timer / 60, 10);
        const seconds = parseInt(timer % 60, 10);
        
        const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
        
        display.textContent = displayMinutes + ":" + displaySeconds;
        
        // Warning when 5 minutes left
        if (timer === 300) {
            showToast('5 dakika kaldı!', 'warning');
            display.classList.add('text-warning');
        }
        
        // Critical warning when 1 minute left
        if (timer === 60) {
            showToast('1 dakika kaldı!', 'danger');
            display.classList.remove('text-warning');
            display.classList.add('text-danger');
        }
        
        if (--timer < 0) {
            clearInterval(interval);
            showToast('Süre doldu!', 'danger');
            // Auto-submit exam
            if (window.autoSubmitExam) {
                window.autoSubmitExam();
            }
        }
    }, 1000);
    
    return interval;
}

// Progress tracking
function updateProgress(current, total) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const percentage = Math.round((current / total) * 100);
        progressBar.style.width = percentage + '%';
        progressBar.textContent = `${current}/${total}`;
    }
}

// Export functions for global use
window.LGSApp = {
    showToast,
    showLoading,
    hideLoading,
    apiRequest,
    startExam,
    submitExam,
    selectAnswer,
    startTimer,
    updateProgress
};