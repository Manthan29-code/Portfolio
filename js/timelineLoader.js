/**
 * Timeline Loader - Dynamically loads timeline items from timelineData.js
 * Maintains the existing timeline design and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    const timelineContainer = document.getElementById('timeline-container');
    
    if (!timelineContainer || typeof timelineData === 'undefined') {
        // Timeline container or data not found - might be on a different page
        return;
    }

    // Generate HTML for a single timeline item
    function createTimelineItem(item) {
        return `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <h4>${item.organization}</h4>
                    <span class="timeline-date">${item.date}</span>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    }

    // Generate all timeline items HTML
    function generateTimelineHTML() {
        return timelineData.map(item => createTimelineItem(item)).join('');
    }

    // Load timeline items into the container
    function loadTimeline() {
        timelineContainer.innerHTML = generateTimelineHTML();
    }

    // Initialize
    loadTimeline();
});
