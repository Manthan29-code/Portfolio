/**
 * Projects Loader - Dynamically loads repositories from repo.js
 * Features:
 * - Direct integration with repo.js dataset
 * - Search by keyword/tech/title
 * - Category/Language filter tabs
 * - Hover full-description expansion
 * - Active GitHub link & gracefully disabled Live Demo button when URL is missing
 * - Consistent responsive card layout for Mobile and Desktop
 */

import { repos } from './repo.js';

document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.querySelector('.projects .container');

    const projectList = (typeof repos !== 'undefined' && Array.isArray(repos))
        ? repos
        : (window.repos || []);

    if (!projectsContainer) return;

    // Inject Search & Filter Toolbar + Grid Container
    projectsContainer.innerHTML = `
        <div class="projects-controls">
            <div class="projects-search-box">
                <i class="fas fa-search search-icon"></i>
                <input type="text" id="project-search-input" placeholder="Search projects by name, technology, or keywords..." aria-label="Search Projects">
                <button id="search-clear-btn" class="search-clear-btn" style="display: none;" aria-label="Clear Search">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="projects-filter-tabs" id="projects-filter-tabs">
                <button class="project-filter-btn active" data-filter="all">
                    <i class="fas fa-layer-group"></i> All (<span id="count-all">${projectList.length}</span>)
                </button>
                <button class="project-filter-btn" data-filter="javascript">
                    <i class="fab fa-js-square"></i> JavaScript
                </button>
                <button class="project-filter-btn" data-filter="python">
                    <i class="fab fa-python"></i> Python / AI
                </button>
                <button class="project-filter-btn" data-filter="cpp">
                    <i class="fas fa-code"></i> C / C++
                </button>
                <button class="project-filter-btn" data-filter="web">
                    <i class="fab fa-html5"></i> Web / CSS
                </button>
                <button class="project-filter-btn" data-filter="live">
                    <i class="fas fa-bolt"></i> Live Demos
                </button>
            </div>

            <div class="projects-meta-bar">
                <span id="projects-counter" class="projects-counter">Showing ${projectList.length} repositories</span>
            </div>
        </div>

        <div class="projects-grid" id="projects-grid"></div>
        <div id="no-projects-msg" class="no-projects-msg" style="display: none;">
            <i class="fas fa-folder-open"></i>
            <h3>No matching projects found</h3>
            <p>Try searching for a different keyword or select another filter tab.</p>
        </div>
    `;

    const projectsGrid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('project-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const counterEl = document.getElementById('projects-counter');
    const noProjectsMsg = document.getElementById('no-projects-msg');

    let currentFilter = 'all';
    let searchQuery = '';

    // Language color & icon mapping
    function getLanguageMeta(language) {
        switch ((language || '').toLowerCase()) {
            case 'javascript':
                return { color: '#f7df1e', icon: 'fab fa-js' };
            case 'python':
                return { color: '#3572A5', icon: 'fab fa-python' };
            case 'c++':
            case 'cpp':
                return { color: '#f34b7d', icon: 'fas fa-file-code' };
            case 'c':
                return { color: '#555555', icon: 'fas fa-code' };
            case 'java':
                return { color: '#b07219', icon: 'fab fa-java' };
            case 'jupyter notebook':
                return { color: '#DA5B0B', icon: 'fas fa-book-open' };
            case 'html':
                return { color: '#e34c26', icon: 'fab fa-html5' };
            case 'css':
                return { color: '#563d7c', icon: 'fab fa-css3-alt' };
            default:
                return { color: '#00ACC1', icon: 'fas fa-code-branch' };
        }
    }

    // Format display title nicely
    function formatTitle(name) {
        if (!name) return 'Project';
        return name.replace(/[-_]/g, ' ');
    }

    // Create Project Card HTML
    function createProjectCard(repo) {
        const langMeta = getLanguageMeta(repo.language);
        const hasLive = typeof repo.liveUrl === 'string' && repo.liveUrl.trim() !== '' && repo.liveUrl.trim() !== '#';
        const hasCode = typeof repo.repoUrl === 'string' && repo.repoUrl.trim() !== '';

        const tags = [];
        if (repo.language) tags.push(repo.language);
        if (Array.isArray(repo.topics)) {
            repo.topics.forEach(t => {
                if (t && !tags.includes(t)) tags.push(t);
            });
        }

        const descriptionText = repo.description && repo.description.trim() !== ''
            ? repo.description
            : 'No description provided for this repository.';

        return `
            <div class="project-card" data-repo-id="${repo.id}">
                <div class="project-card-header">
                    <div class="repo-type-tag" style="border-left-color: ${langMeta.color};">
                        <i class="${langMeta.icon}" style="color: ${langMeta.color};"></i>
                        <span>${repo.language || 'Project'}</span>
                    </div>
                    ${repo.stars > 0 ? `
                        <div class="repo-stars" title="${repo.stars} Stars on GitHub">
                            <i class="fas fa-star"></i> ${repo.stars}
                        </div>
                    ` : ''}
                </div>

                <div class="project-content">
                    <h3 class="project-title" title="${repo.name}">
                        <i class="fab fa-github repo-title-icon"></i> ${formatTitle(repo.name)}
                    </h3>

                    <div class="project-description-wrapper">
                        <p class="project-description">${descriptionText}</p>
                    </div>

                    <div class="project-tech">
                        ${tags.slice(0, 4).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>

                    <div class="project-buttons">
                        <a href="${hasCode ? repo.repoUrl : '#'}" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="btn-secondary ${hasCode ? '' : 'is-disabled'}" 
                           ${hasCode ? '' : 'aria-disabled="true" tabindex="-1"'}>
                            <i class="fab fa-github"></i> GitHub
                        </a>

                        ${hasLive ? `
                            <a href="${repo.liveUrl}" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="btn-primary">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : `
                            <button class="btn-primary is-disabled" 
                                    disabled 
                                    aria-disabled="true" 
                                    title="No live demo link available">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }

    // Filter and Search Logic
    function getFilteredRepos() {
        return projectList.filter(repo => {
            // Category filter
            const lang = (repo.language || '').toLowerCase();
            const topics = (repo.topics || []).map(t => (t || '').toLowerCase());
            const hasLive = typeof repo.liveUrl === 'string' && repo.liveUrl.trim() !== '' && repo.liveUrl.trim() !== '#';

            let matchesFilter = true;
            if (currentFilter === 'javascript') {
                matchesFilter = lang === 'javascript' || lang === 'typescript' || topics.includes('javascript') || topics.includes('react');
            } else if (currentFilter === 'python') {
                matchesFilter = lang === 'python' || lang === 'jupyter notebook' || topics.includes('python') || topics.includes('ai') || topics.includes('ml');
            } else if (currentFilter === 'cpp') {
                matchesFilter = lang === 'c++' || lang === 'c' || lang === 'cpp';
            } else if (currentFilter === 'web') {
                matchesFilter = lang === 'html' || lang === 'css' || topics.includes('css') || topics.includes('html');
            } else if (currentFilter === 'live') {
                matchesFilter = hasLive;
            }

            if (!matchesFilter) return false;

            // Search query filter
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase().trim();
                const nameMatch = (repo.name || '').toLowerCase().includes(query);
                const descMatch = (repo.description || '').toLowerCase().includes(query);
                const langMatch = lang.includes(query);
                const topicMatch = topics.some(t => t.includes(query));

                return nameMatch || descMatch || langMatch || topicMatch;
            }

            return true;
        });
    }

    // Render projects onto the grid
    function renderProjects() {
        const filtered = getFilteredRepos();

        if (filtered.length === 0) {
            projectsGrid.innerHTML = '';
            noProjectsMsg.style.display = 'block';
            counterEl.textContent = `Showing 0 of ${projectList.length} repositories`;
        } else {
            noProjectsMsg.style.display = 'none';
            projectsGrid.innerHTML = filtered.map(createProjectCard).join('');
            counterEl.textContent = `Showing ${filtered.length} of ${projectList.length} repositories`;
        }
    }

    // Search events
    searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        searchClearBtn.style.display = searchQuery ? 'block' : 'none';
        renderProjects();
    });

    searchClearBtn.addEventListener('click', function () {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
        renderProjects();
    });

    // Filter button clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderProjects();
        });
    });

    // Initial render
    renderProjects();
});
