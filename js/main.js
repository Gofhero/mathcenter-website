 
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