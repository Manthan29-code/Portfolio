/**
 * Skills Loader - Dynamically loads categorized skills with interactive sliding controls
 * Features:
 * - Category filter tabs
 * - Drag-to-slide with mouse & touch swipe
 * - Left/Right navigation buttons
 * - No horizontal scrollbar
 * - Responsive for mobile and desktop
 */

document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills');
    const skillsContainer = document.querySelector('.skills .container');

    if (!skillsContainer || typeof skillsData === 'undefined') {
        console.error('Skills container or skillsData not found');
        return;
    }

    // Replace old marquee track structure with modern interactive slider structure
    skillsContainer.innerHTML = `
        <div class="skills-header">
            <h2>Skills & Technologies</h2>
            <p class="skills-subtitle">Explore my technical toolkit categorized directly from my resume. Slide or filter through the domains.</p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="skills-categories-container">
            <div class="skills-categories-tabs" id="skills-categories-tabs">
                <!-- Dynamically populated from skillCategories -->
            </div>
        </div>

        <!-- Interactive Slider Area -->
        <div class="skills-slider-wrapper">
            <button class="slider-btn prev-btn" id="skills-prev-btn" aria-label="Slide Left">
                <i class="fas fa-chevron-left"></i>
            </button>

            <div class="skills-slider-track" id="skills-slider-track">
                <!-- Skill cards dynamically injected here -->
            </div>

            <button class="slider-btn next-btn" id="skills-next-btn" aria-label="Slide Right">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>

        <!-- Slider hint / status bar -->
        <div class="slider-footer">
            <span class="slider-hint"><i class="fas fa-arrows-alt-h"></i> Drag or use arrows to slide</span>
            <span class="slider-count" id="slider-count">Showing 0 skills</span>
        </div>
    `;

    const tabsContainer = document.getElementById('skills-categories-tabs');
    const sliderTrack = document.getElementById('skills-slider-track');
    const prevBtn = document.getElementById('skills-prev-btn');
    const nextBtn = document.getElementById('skills-next-btn');
    const sliderCount = document.getElementById('slider-count');

    let currentCategory = 'all';

    // Render Category Tabs
    function renderCategoryTabs() {
        if (typeof skillCategories === 'undefined' || !skillCategories.length) return;

        tabsContainer.innerHTML = skillCategories.map((cat, idx) => `
            <button class="category-tab ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
                <i class="${cat.icon}"></i>
                <span>${cat.name}</span>
            </button>
        `).join('');

        // Attach click events
        tabsContainer.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                tabsContainer.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentCategory = category;
                renderSkills(currentCategory);
                sliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
            });
        });
    }

    // Render Skill Card HTML
    function createSkillCard(skill) {
        return `
            <div class="skill-card" data-category="${skill.category}">
                <div class="skill-card-badge">${skill.categoryName}</div>
                <div class="skill-icon-wrapper">
                    <i class="${skill.icon}"></i>
                </div>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            </div>
        `;
    }

    // Filter and render skills
    function renderSkills(category = 'all') {
        const filteredSkills = category === 'all' 
            ? skillsData 
            : skillsData.filter(s => s.category === category);

        sliderTrack.innerHTML = filteredSkills.map(createSkillCard).join('');
        sliderCount.textContent = `Showing ${filteredSkills.length} of ${skillsData.length} skills`;

        updateNavButtons();
    }

    // Update navigation button disabled states
    function updateNavButtons() {
        if (!sliderTrack) return;
        const maxScrollLeft = sliderTrack.scrollWidth - sliderTrack.clientWidth;
        
        if (sliderTrack.scrollLeft <= 5) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (sliderTrack.scrollLeft >= maxScrollLeft - 5 || maxScrollLeft <= 0) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    // Arrow Button Handlers
    function slide(direction) {
        const cardWidth = 300; // approximate card width + gap
        const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
        sliderTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => slide('left'));
    nextBtn.addEventListener('click', () => slide('right'));

    sliderTrack.addEventListener('scroll', updateNavButtons);

    // Mouse Drag-to-Slide implementation
    let isDown = false;
    let startX;
    let scrollLeft;

    sliderTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderTrack.classList.add('grabbing');
        startX = e.pageX - sliderTrack.offsetLeft;
        scrollLeft = sliderTrack.scrollLeft;
    });

    sliderTrack.addEventListener('mouseleave', () => {
        isDown = false;
        sliderTrack.classList.remove('grabbing');
    });

    sliderTrack.addEventListener('mouseup', () => {
        isDown = false;
        sliderTrack.classList.remove('grabbing');
    });

    sliderTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderTrack.offsetLeft;
        const walk = (x - startX) * 1.8; // Slide speed multiplier
        sliderTrack.scrollLeft = scrollLeft - walk;
    });

    // Optional horizontal wheel scrolling
    sliderTrack.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && Math.abs(e.deltaY) > 10) {
            // Allow smooth vertical scrolling unless user is actively horizontally scrolling
            // Or shift-scroll
            if (e.shiftKey) {
                sliderTrack.scrollLeft += e.deltaY;
            }
        }
    }, { passive: true });

    // Initial render
    renderCategoryTabs();
    renderSkills('all');
    setTimeout(updateNavButtons, 200);

    // Window resize handler
    window.addEventListener('resize', updateNavButtons);
});
