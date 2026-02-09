// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeIcon.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Search
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const toolCards = document.querySelectorAll('.tool-card');
            const categorySections = document.querySelectorAll('.category-section');
            const noResults = document.getElementById('noResults');
            let hasResults = false;
            
            categorySections.forEach(section => {
                const cardsInSection = section.querySelectorAll('.tool-card');
                let sectionHasVisibleCards = false;
                
                cardsInSection.forEach(card => {
                    const name = card.getAttribute('data-name').toLowerCase();
                    const category = card.getAttribute('data-category').toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    
                    if (name.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'flex';
                        sectionHasVisibleCards = true;
                        hasResults = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                if (sectionHasVisibleCards) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            if (noResults) {
                noResults.style.display = hasResults ? 'none' : 'block';
            }
        });
    }
}

// Recently Used
function initRecentlyUsed() {
    const recentToolsSection = document.getElementById('recentToolsSection');
    const recentToolsGrid = document.getElementById('recentToolsGrid');
    
    if (!recentToolsGrid) return;
    
    const recentTools = JSON.parse(localStorage.getItem('recentTools') || '[]');
    
    if (recentTools.length > 0) {
        recentToolsSection.style.display = 'block';
        
        recentTools.slice(0, 4).forEach(tool => {
            const toolCard = document.createElement('a');
            toolCard.href = tool.url;
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <div class="tool-icon">${tool.icon}</div>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            `;
            recentToolsGrid.appendChild(toolCard);
        });
    }
}

// Track Tool Usage
function trackToolUsage(toolData) {
    let recentTools = JSON.parse(localStorage.getItem('recentTools') || '[]');
    recentTools = recentTools.filter(tool => tool.url !== toolData.url);
    recentTools.unshift(toolData);
    recentTools = recentTools.slice(0, 10);
    localStorage.setItem('recentTools', JSON.stringify(recentTools));
}

// Copy to Clipboard
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSearch();
    initRecentlyUsed();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
