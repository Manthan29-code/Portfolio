/**
 * Projects Loader - Dynamically loads project cards from projectsData.js
 */

document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projects-grid');

    if (!projectsGrid || typeof projectsData === 'undefined') {
        return;
    }

    function getLinkState(url) {
        const hasLink = typeof url === 'string' && url.trim() !== '' && url.trim() !== '#';
        return {
            href: hasLink ? url : '#',
            className: hasLink ? '' : ' is-disabled',
            ariaDisabled: hasLink ? 'false' : 'true',
            tabIndex: hasLink ? '0' : '-1'
        };
    }

    function createTechTags(techList) {
        if (!Array.isArray(techList)) {
            return '';
        }
        return techList.map((tag) => `<span class="tech-tag">${tag}</span>`).join('');
    }

    function createProjectCard(project) {
        const code = getLinkState(project.codeLink);
        const demo = getLinkState(project.demoLink);

        return `
            <div class="project-card">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${createTechTags(project.tech)}
                    </div>
                    <div class="project-buttons">
                        <a href="${code.href}" class="btn-secondary${code.className}" aria-disabled="${code.ariaDisabled}" tabindex="${code.tabIndex}">View Code</a>
                        <a href="${demo.href}" class="btn-primary${demo.className}" aria-disabled="${demo.ariaDisabled}" tabindex="${demo.tabIndex}">Live Demo</a>
                    </div>
                </div>
            </div>
        `;
    }

    function generateProjectsHTML() {
        return projectsData.map((project) => createProjectCard(project)).join('');
    }

    function loadProjects() {
        projectsGrid.innerHTML = generateProjectsHTML();
    }

    loadProjects();
});
