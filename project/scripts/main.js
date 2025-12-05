// ===== DOM Elements =====
const currentYearSpan = document.getElementById('currentYear');
const lastVisitSpan = document.getElementById('lastVisit');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// ===== Global Data =====
const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Web Developer at TechCorp",
        content: "Impact Digital Academy completely changed my career trajectory. The hands-on projects gave me the confidence to apply for jobs I never thought I'd qualify for.",
        avatar: "👩‍💻"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Data Analyst at DataSystems",
        content: "The data science course was incredibly comprehensive. I went from knowing basic Excel to building machine learning models in just 6 months.",
        avatar: "👨‍🔬"
    },
    {
        id: 3,
        name: "Jessica Williams",
        role: "Digital Marketing Manager",
        content: "The practical approach to digital marketing made all the difference. I implemented strategies from class at my job and saw immediate results.",
        avatar: "👩‍💼"
    },
    {
        id: 4,
        name: "David Rodriguez",
        role: "UI/UX Designer",
        content: "The portfolio I built during the course directly led to my current job. The career support team was instrumental in my job search.",
        avatar: "👨‍🎨"
    }
];

const courses = [
    {
        id: 1,
        title: "Full-Stack Web Development",
        description: "Learn to build modern web applications from front-end to back-end.",
        duration: "24 weeks",
        level: "intermediate",
        projects: 5,
        price: "$4,999",
        features: ["HTML/CSS/JavaScript", "React & Node.js", "Database Design", "API Development", "DevOps Basics"],
        icon: "💻"
    },
    {
        id: 2,
        title: "Data Science & Analytics",
        description: "Master data analysis, visualization, and machine learning techniques.",
        duration: "20 weeks",
        level: "advanced",
        projects: 4,
        price: "$5,499",
        features: ["Python Programming", "Statistical Analysis", "Machine Learning", "Data Visualization", "Big Data Tools"],
        icon: "📊"
    },
    {
        id: 3,
        title: "Digital Marketing",
        description: "Comprehensive digital marketing strategy and execution training.",
        duration: "16 weeks",
        level: "beginner",
        projects: 3,
        price: "$3,999",
        features: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics", "Campaign Management"],
        icon: "📱"
    },
    {
        id: 4,
        title: "UI/UX Design",
        description: "Learn user-centered design principles and create engaging digital experiences.",
        duration: "18 weeks",
        level: "beginner",
        projects: 4,
        price: "$4,499",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
        icon: "🎨"
    },
    {
        id: 5,
        title: "Cybersecurity Fundamentals",
        description: "Essential skills for protecting digital assets and understanding security threats.",
        duration: "14 weeks",
        level: "intermediate",
        projects: 3,
        price: "$4,299",
        features: ["Network Security", "Ethical Hacking", "Risk Management", "Cryptography", "Incident Response"],
        icon: "🔒"
    },
    {
        id: 6,
        title: "Mobile App Development",
        description: "Build cross-platform mobile applications using modern frameworks.",
        duration: "22 weeks",
        level: "advanced",
        projects: 5,
        price: "$5,199",
        features: ["React Native", "Flutter", "App Design", "API Integration", "App Store Deployment"],
        icon: "📱"
    }
];

const faqs = [
    {
        question: "What are the admission requirements?",
        answer: "Most courses require basic computer literacy. Advanced courses may require prerequisite knowledge. We assess each applicant individually and offer preparatory materials if needed."
    },
    {
        question: "Do you offer payment plans or financial aid?",
        answer: "Yes, we offer flexible payment plans and scholarships for eligible students. Contact our admissions team to discuss options that work for your situation."
    },
    {
        question: "What kind of career support do you provide?",
        answer: "We provide resume reviews, interview preparation, portfolio building, and networking opportunities with our industry partners. Our career services team works with you for 6 months after graduation."
    },
    {
        question: "Are the courses self-paced or instructor-led?",
        answer: "Our courses are primarily instructor-led with live sessions, but we provide recorded content and flexible deadlines to accommodate different schedules."
    },
    {
        question: "What is the typical class size?",
        answer: "We maintain small class sizes with a maximum of 20 students to ensure personalized attention and effective learning."
    },
    {
        question: "Do you offer job placement guarantees?",
        answer: "While we don't guarantee employment, our employment rate is 95% within 6 months of graduation for students who complete all coursework and utilize our career services."
    }
];

// ===== Utility Functions =====
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();
    localStorage.setItem('lastVisit', now.toISOString());

    if (!lastVisit) {
        return "Welcome! This is your first visit.";
    }

    const lastVisitDate = new Date(lastVisit);
    const diffTime = Math.abs(now - lastVisitDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "Yesterday";
    } else {
        return `${diffDays} days ago`;
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.getAttribute('data-count');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Course Filtering System =====
function initializeCourseFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const coursesContainer = document.getElementById('coursesContainer');
    const comparisonTable = document.getElementById('comparisonTable');

    if (!coursesContainer || !comparisonTable) return;

    // Render courses
    function renderCourses(filter = 'all') {
        coursesContainer.innerHTML = '';
        const filteredCourses = filter === 'all'
            ? courses
            : courses.filter(course => course.level === filter);

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.level}`;
            courseCard.innerHTML = `
                <div class="course-image">${course.icon}</div>
                <div class="course-content">
                    <span class="course-level">${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <ul class="course-features">
                        ${course.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="course-meta">
                        <p><strong>Duration:</strong> ${course.duration}</p>
                        <p><strong>Projects:</strong> ${course.projects}</p>
                        <p><strong>Price:</strong> ${course.price}</p>
                    </div>
                </div>
            `;
            coursesContainer.appendChild(courseCard);
        });
    }

    // Render comparison table
    function renderComparisonTable() {
        comparisonTable.innerHTML = '';
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.title}</td>
                <td>${course.duration}</td>
                <td>${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</td>
                <td>${course.projects}</td>
                <td>${course.price}</td>
                <td><button class="btn btn-primary" onclick="enrollCourse(${course.id})">Enroll</button></td>
            `;
            comparisonTable.appendChild(row);
        });
    }

    // Filter button event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCourses(btn.dataset.filter);
        });
    });

    // Initial render
    renderCourses();
    renderComparisonTable();
}

// ===== Testimonial Slider =====
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!slider) return;

    let currentSlide = 0;

    function renderTestimonial(index) {
        const testimonial = testimonials[index];
        return `
            <div class="testimonial-item ${index === currentSlide ? 'active' : ''}">
                <div class="testimonial-content">
                    <p>"${testimonial.content}"</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.avatar}</div>
                    <div>
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `;
    }

    function renderDots() {
        dotsContainer.innerHTML = '';
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        slider.innerHTML = renderTestimonial(currentSlide);
        renderDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        goToSlide(currentSlide);
    }

    // Initialize
    slider.innerHTML = renderTestimonial(currentSlide);
    renderDots();

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
}

// ===== Contact Form Handling =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formData = JSON.parse(localStorage.getItem('contactFormData')) || {};

    // Load saved form data
    Object.keys(formData).forEach(key => {
        const element = contactForm.elements[key];
        if (element) element.value = formData[key];
    });

    // Save form data on input
    contactForm.addEventListener('input', (e) => {
        if (e.target.name) {
            formData[e.target.name] = e.target.value;
            localStorage.setItem('contactFormData', JSON.stringify(formData));
        }
    });

    // Form validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formMessage = document.getElementById('formMessage');
        const submitBtn = document.getElementById('submitBtn');
        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
        });

        // Validate required fields
        const requiredFields = ['fullName', 'email', 'messageType', 'message'];
        requiredFields.forEach(fieldName => {
            const field = contactForm.elements[fieldName];
            const errorElement = document.getElementById(`${fieldName}Error`);

            if (!field.value.trim()) {
                errorElement.textContent = 'This field is required';
                errorElement.classList.add('show');
                isValid = false;
            }
        });

        // Validate email format
        const emailField = contactForm.elements.email;
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.add('show');
            isValid = false;
        }

        // Validate message length
        const messageField = contactForm.elements.message;
        const messageError = document.getElementById('messageError');

        if (messageField.value && messageField.value.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageError.classList.add('show');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                localStorage.removeItem('contactFormData');

                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth' });

                // Save submission to localStorage
                const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                submissions.push({
                    date: new Date().toISOString(),
                    name: contactForm.elements.fullName.value,
                    email: contactForm.elements.email.value,
                    type: contactForm.elements.messageType.value
                });
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            }, 1500);
        }
    });
}

// ===== FAQ Accordion =====
function initializeFAQ() {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;

    faqs.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">${faq.question}</div>
            <div class="faq-answer">${faq.answer}</div>
        `;

        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = answer.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });

            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
            }
        });

        faqContainer.appendChild(faqItem);
    });
}

// ===== Download Brochure =====
function initializeBrochureDownload() {
    const downloadBtn = document.getElementById('downloadBrochure');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Track downloads
        const downloads = parseInt(localStorage.getItem('brochureDownloads') || '0');
        localStorage.setItem('brochureDownloads', (downloads + 1).toString());

        // Create and download a simple text brochure
        const brochureContent = `
            Impact Digital Academy - Course Catalog
            
            Welcome to Impact Digital Academy! Here are our current course offerings:
            
            ${courses.map(course => `
            ${course.title}
            ${course.description}
            Duration: ${course.duration}
            Level: ${course.level}
            Projects: ${course.projects}
            Price: ${course.price}
            
            Features:
            ${course.features.map(feature => `• ${feature}`).join('\n            ')}
            
            ----------------------------------------
            `).join('\n')}
            
            Contact us at: info@impactdigitalacademy.com
            Visit: impactdigitalacademy.com
        `;

        const blob = new Blob([brochureContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'impact-digital-academy-brochure.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Show success message
        alert('Brochure downloaded successfully! Check your downloads folder.');
    });
}

// ===== Course Enrollment =====
function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Save enrollment interest
    const enrollments = JSON.parse(localStorage.getItem('courseEnrollments') || '[]');
    enrollments.push({
        courseId,
        courseTitle: course.title,
        date: new Date().toISOString()
    });
    localStorage.setItem('courseEnrollments', JSON.stringify(enrollments));

    // Redirect to contact page with course pre-selected
    const url = new URL('contact.html', window.location.origin);
    url.searchParams.set('course', courseId);
    window.location.href = url.toString();
}

// ===== Initialize Stats Animation =====
function initializeStats() {
    const statElements = document.querySelectorAll('[data-count]');
    if (statElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ===== Initialize Everything =====
function initializeApp() {
    // Set current year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Set last visit
    if (lastVisitSpan) {
        lastVisitSpan.textContent = getLastVisit();
    }

    // Mobile menu toggle
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') &&
            !mainNav.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Initialize page-specific features
    initializeTestimonialSlider();
    initializeCourseFilter();
    initializeContactForm();
    initializeFAQ();
    initializeBrochureDownload();
    initializeStats();

    // Pre-select course from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    if (courseId) {
        const courseSelect = document.getElementById('courseInterest');
        if (courseSelect) {
            courseSelect.value = courses.find(c => c.id === parseInt(courseId))?.title.toLowerCase().replace(/\s+/g, '-') || '';
        }
    }
}

// ===== Run when DOM is loaded =====
document.addEventListener('DOMContentLoaded', initializeApp);