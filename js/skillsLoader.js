/**
 * Skills Loader - Dynamically loads skills into the marquee
 * Creates an infinite scrolling effect by duplicating skill cards
 */

document.addEventListener('DOMContentLoaded', function() {
    const skillsMarquee = document.getElementById('skills-marquee');
    
    if (!skillsMarquee || !skillsData) {
        console.error('Skills marquee container or skillsData not found');
        return;
    }

    // Generate HTML for a single skill card
    function createSkillCard(skill) {
        return `
            <div class="skill-card">
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            </div>
        `;
    }

    // Generate all skill cards HTML
    function generateSkillsHTML() {
        return skillsData.map(skill => createSkillCard(skill)).join('');
    }

    // Load skills into the marquee (duplicate for seamless infinite loop)
    function loadSkills() {
        const skillsHTML = generateSkillsHTML();
        // Duplicate the skills to create seamless infinite scroll
        skillsMarquee.innerHTML = skillsHTML + skillsHTML;
        
        // Calculate and set dynamic animation duration based on skill count
        // More skills = longer duration for readable speed
        const baseSpeed = 3; // seconds per skill
        const duration = skillsData.length * baseSpeed;
        skillsMarquee.style.animationDuration = `${duration}s`;
    }

    // Initialize
    loadSkills();
});
