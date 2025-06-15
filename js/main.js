 // Thêm vào đầu file main.js

// Enhanced Navigation with smooth transitions
class SmoothNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageTransitions();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupButtonEffects();
        this.setupPageLoader();
    }

    setupPageTransitions() {
        // Add transition class to body
        document.body.classList.add('page-transition');
        
        // Remove transition class after load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 100);
        });

        // Handle page navigation
        document.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // If it's an anchor link, smooth scroll
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                    return;
                }

                // If it's a page link, add transition effect
                if (href.endsWith('.html')) {
                    e.preventDefault();
                    this.navigateToPage(href);
                }
            });
        });
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    navigateToPage(href) {
        // Add loading state
        document.body.classList.add('page-transition');
        
        // Show loader
        this.showLoader();

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    }

    setupSmoothScrolling() {
        // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                this.smoothScrollTo(target);
            });
        });
    }

    setupActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Check if current page matches link
            if (currentPath.includes(linkPath) || 
                (currentPath === '/' && linkPath === 'index.html') ||
                (currentPath.endsWith('index.html') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setupButtonEffects() {
        // Add ripple effect to all buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add loading state to form submit buttons
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }
            });
        });
    }

    setupPageLoader() {
        // Create page loader
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);

        // Hide loader when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }

    showLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.remove('hidden');
        }
    }
}

// Enhanced Mobile Menu
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggle());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.close();
                }
            });

            // Close menu when clicking on nav links
            this.navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Handle escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            });
        }
    }

    toggle() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate menu items
        const menuItems = this.navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    close() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Scroll effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollToTop();
        this.setupParallaxEffect();
        this.setupScrollAnimations();
    }

    setupScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        `;
        document.body.appendChild(scrollBtn);

        // Show/hide button based on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero, .stats');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.course-card, .teacher-card, .feature-item, .stat-item')
            .forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(el);
            });
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    new SmoothNavigation();
    new MobileMenu();
    new ScrollEffects();
});

// Thêm CSS cho ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .nav-menu li {
            opacity: 0;
            animation: slideInLeft 0.3s ease forwards;
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(rippleStyle);
// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const featuredCoursesContainer = document.getElementById('featured-courses');

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Featured Courses Data
const featuredCourses = [
    {
        id: 1,
        title: "Toán 12 - Luyện Thi Đại Học",
        description: "Ôn tập toàn diện chương trình Toán 12, tập trung vào các dạng bài thi đại học",
        price: "1,500,000 VNĐ",
        duration: "3 tháng",
        image: "images/course-1.jpg",
        level: "Lớp 12"
    },
    {
        id: 2,
        title: "Hình Học Không Gian",
        description: "Nắm vững kiến thức hình học không gian với phương pháp trực quan",
        price: "800,000 VNĐ",
        duration: "2 tháng",
        image: "images/course-2.jpg",
        level: "Lớp 11-12"
    },
    {
        id: 3,
        title: "Đại Số & Giải Tích",
        description: "Làm chủ các phương pháp giải toán đại số và giải tích cơ bản",
        price: "1,200,000 VNĐ",
        duration: "4 tháng",
        image: "images/course-3.jpg",
        level: "Lớp 10-11"
    }
];

// Load Featured Courses
function loadFeaturedCourses() {
    if (!featuredCoursesContainer) return;
    
    const coursesHTML = featuredCourses.map(course => `
        <div class="course-card" data-course-id="${course.id}">
            <img src="${course.image}" alt="${course.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23f3f4f6%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%236b7280%22>Hình ảnh khóa học</text></svg>'">
            <div class="course-content">
                <div class="course-level">${course.level}</div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span class="course-price">${course.price}</span>
                    <span class="course-duration">
                        <i class="fas fa-clock"></i> ${course.duration}
                    </span>
                </div>
                <button class="btn btn-primary course-btn" onclick="enrollCourse(${course.id})">
                    Đăng Ký Ngay
                </button>
            </div>
        </div>
    `).join('');
    
    featuredCoursesContainer.innerHTML = coursesHTML;
}

// Enroll Course Function
function enrollCourse(courseId) {
    const course = featuredCourses.find(c => c.id === courseId);
    if (course) {
        // Store selected course in localStorage
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        // Redirect to contact page
        window.location.href = 'pages/contact.html';
    }
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.innerText.replace(/[^0-9]/g, '');
            const count = +counter.getAttribute('data-count') || 0;
            const inc = target / speed;

            if (count < target) {
                counter.setAttribute('data-count', Math.ceil(count + inc));
                counter.innerText = Math.ceil(count + inc) + counter.innerText.replace(/[0-9]/g, '').replace(/\+/g, '+');
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + counter.innerText.replace(/[0-9]/g, '');
            }
        };
        updateCount();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedCourses();
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.stat-item, .course-card, .feature-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const navbar = document.querySelector('.header');
    
    if (scrollTop > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Form validation utility
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Local Storage utilities
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

// Export functions for use in other scripts
window.MathCenter = {
    validateEmail,
    validatePhone,
    Storage,
    enrollCourse
};