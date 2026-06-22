// ==================== NAVBAR FUNCTIONALITY ===================================================
const navbarLinks = [
    { text: "Home", href: "/#hero", id: "home" },
    { text: "Skills", href: "/#tools", id: "skills" },
    { text: "Projects", href: "/#projects", id: "projects" },
    { text: "Documentation", href: "/documentation/index.html", id: "documentation" },
    { text: "Experience", href: "/#experience", id: "experience" },
    { text: "Contact", href: "/#contact", id: "contact" }
];

function renderNavbar() {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return;

    navLinksContainer.innerHTML = '';

    const currentPath = window.location.pathname;

    navbarLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;

        if (currentPath.includes('documentation') && link.id === 'documentation') {
            a.classList.add('active');
        } else if ((currentPath === '/' || currentPath === '/index.html') && link.id === 'home') {
            a.classList.add('active');
        }

        // Smooth scroll
        a.addEventListener('click', (e) => {
            if (link.href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        li.appendChild(a);
        navLinksContainer.appendChild(li);
    });
}

// ==================== FLOATING MOBILE MENU ====================
function initFloatingMenu() {
    const btn = document.getElementById('floating-menu-btn');
    if (!btn) return;

    let mobileMenu = document.querySelector('.mobile-menu');

    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.style.opacity = '0';
        document.body.appendChild(mobileMenu);

        const content = document.createElement('div');
        content.className = 'mobile-menu-content';

        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const clone = link.cloneNode(true);
            content.appendChild(clone);
        });

        mobileMenu.appendChild(content);
    }

    btn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                btn.textContent = '☰';
            }, 250);
        } else {
            mobileMenu.classList.add('active');
            // Small delay for transition to take effect
            setTimeout(() => {
                mobileMenu.style.opacity = '1';
            }, 10);
            btn.textContent = '✕';
        }
    });

    // Close on link
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.style.opacity = '0';
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                btn.textContent = '☰';
            }, 250);
        }
    });
}

// ==================== BLOG HEADER POPULATION ======================================
// controls the cover section of all articles, populates them based on json file
async function loadBlogHeader() {
    try {
        const response = await fetch('/data/articles.json');
        const articles = await response.json();

        const filename = window.location.pathname.split('/').pop().replace('.html', '');
        const article = articles.find(a => a.id === filename || a.slug === filename);

        if (!article) {
            console.error("No matching article found for:", filename);
            return;
        }

        document.querySelector('.blog-cover').src = article.coverImage || '';
        document.querySelector('.blog-cover').alt = article.title || '';

        document.querySelector('.blog-title').textContent = article.title || 'Untitled';

        // Blog Info Line
        const infoContainer = document.querySelector('.blog-info');
        if (infoContainer) {
            const date = new Date(article.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric'
            }) + ` '${date.getFullYear().toString().slice(2)}`;

            infoContainer.innerHTML = `
                <strong>Difficulty:</strong> ${article.attributes?.Difficulty || 'N/A'} 
                &nbsp;•&nbsp; 
                <strong>OS:</strong> ${article.attributes?.OS || 'N/A'} 
                &nbsp;•&nbsp; 
                <strong>Published:</strong> ${formattedDate}
            `;
        }

        // Tools
        const toolsContainer = document.querySelector('.tools');
        if (toolsContainer) {
            toolsContainer.innerHTML = '';
            if (article.tools && Array.isArray(article.tools)) {
                article.tools.forEach(tool => {
                    const tag = document.createElement('span');
                    tag.className = 'tool-tag';
                    tag.textContent = tool;
                    toolsContainer.appendChild(tag);
                });
            }
        }

        // TLDR
        const tldrContainer = document.querySelector('.tldr p');
        if (tldrContainer) {
            tldrContainer.textContent = article.tldr || '';
        }

    } catch (error) {
        console.error('Failed to load article data:', error);
    }
}

// ==================== RECENT POSTS POPULATION ======================================
// populate posts based on how recent they are
async function loadRecentPosts() {
    try {
        const response = await fetch('/data/articles.json');
        const articles = await response.json();

        const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');

        const recent = articles
            .filter(article => article.slug !== currentSlug)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3); // change to 4 if you want

        const grid = document.getElementById('recent-grid');
        grid.innerHTML = '';

        recent.forEach(article => {
            const card = document.createElement('a');
            card.href = article.url || '#';
            card.className = 'recent-card';

            card.innerHTML = `
                <img src="${article.coverImage || '/assets/placeholder.jpg'}" alt="${article.title}">
                <div class="recent-card-body">
                    <div class="date">${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt || article.tldr || ''}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load recent posts:', error);
    }
}


// ==================== TLDR Functionality ======================================
// this function controls the tldr expansion 
function initTldrToggle() {
    const toggleBtn = document.querySelector('.tldr-toggle');
    const content = document.querySelector('.tldr-content');

    if (!toggleBtn || !content) return;

    toggleBtn.addEventListener('click', () => {
        const isExpanded = content.classList.contains('expanded');

        content.classList.toggle('expanded');
        toggleBtn.textContent = isExpanded ? 'Expand' : 'Hide';
    });
}

// ==================== Documentation Library ======================================
// this function controls post loading
async function loadDocumentation() {
    try {
        const response = await fetch('/data/articles.json');
        let articles = await response.json();

        const grid = document.getElementById('docs-grid');
        const checkboxes = document.querySelectorAll('.filter-checkbox');
        const sortBtn = document.getElementById('sort-btn');

        let isNewestFirst = true;

        function normalizeType(type) {
            if (!type) return '';
            const t = type.toLowerCase();
            if (t.includes('project')) return 'project';
            if (t.includes('lab')) return 'lab';
            return 'blog';
        }

        function render() {
            grid.innerHTML = '';

            let filtered = articles.map(article => ({
                ...article,
                normalizedType: normalizeType(article.type)
            }));

            // Filter by checkboxes
            const activeTypes = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            // NEW: If no filters selected, show message
            if (activeTypes.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem; color: var(--text-muted);">
                        <p style="font-size: 1.4rem; margin-bottom: 1rem;">No filters selected</p>
                        <p style="max-width: 420px; margin: 0 auto; line-height: 1.6;">
                            Please select at least one category (Projects, Labs, or Articles) to view posts.
                        </p>
                    </div>
                `;
                return;
            }

            // Apply filter only if at least one is selected
            filtered = filtered.filter(a => activeTypes.includes(a.normalizedType));

            // Sort
            filtered.sort((a, b) => {
                return isNewestFirst
                    ? new Date(b.date) - new Date(a.date)
                    : new Date(a.date) - new Date(b.date);
            });

            // Render cards
            filtered.forEach(article => {
                const card = document.createElement('a');
                card.href = `/documentation/${article.id}.html`;
                card.className = 'project-card';

                card.innerHTML = `
                    <img src="${article.coverImage}" alt="${article.title}">
                    <div class="project-card-body">
                        <div class="date">${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        <h3>${article.title}</h3>
                        <p>${article.tldr || ''}</p>
                    </div>
                `;

                grid.appendChild(card);
            });
        }

        // Filter listeners
        checkboxes.forEach(cb => cb.addEventListener('change', render));

        // Sort button
        sortBtn.addEventListener('click', () => {
            isNewestFirst = !isNewestFirst;
            sortBtn.textContent = isNewestFirst ? "Newest First ↓" : "Oldest First ↑";
            render();
        });

        render(); // initial render
    } catch (error) {
        console.error('Failed to load documentation:', error);
    }
}

// ==================== META TAGS FOR INDIVIDUAL POST PAGES ====================
async function updateMetaTags() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');

    if (!filename) return;

    try {
        const response = await fetch('/data/articles.json');
        const articles = await response.json();

        const article = articles.find(a => a.id === filename);
        if (!article) return;

        const pageTitle = `${article.title} | Nick Ramos`;
        const description = article.tldr
            ? article.tldr.substring(0, 155) + (article.tldr.length > 155 ? '...' : '')
            : "Technical writeup by Nick Ramos";

        const fullImageUrl = `https://nick-ramos.com${article.coverImage}`;

        // Update title + meta
        document.title = pageTitle;
        updateMeta('description', description);

        // Open Graph
        updateMeta('og:title', pageTitle);
        updateMeta('og:description', description);
        updateMeta('og:image', fullImageUrl);
        updateMeta('og:url', window.location.href);
        updateMeta('og:type', 'article');
        updateMeta('og:site_name', 'Nick Ramos');

        // Twitter Cards
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', pageTitle);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', fullImageUrl);

    } catch (error) {
        console.error('Failed to update meta tags:', error);
    }
}

// Helper
function updateMeta(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);

    if (meta) {
        meta.setAttribute('content', content || '');
    } else {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
            meta.setAttribute('property', name);
        } else {
            meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content || '');
        document.head.appendChild(meta);
    }
}

// ==================== Fake Terminal Animation ===================================================
function initFakeTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    const sessions = [
        {
            command: "nmap -sV 10.13.37.42",
            output: [
                "Starting Nmap 7.94...",
                "PORT   STATE SERVICE VERSION",
                "22/tcp open  ssh     OpenSSH 8.2p1",
                "80/tcp open  http    Apache httpd 2.4.41"
            ]
        },
        {
            command: "gobuster dir -u http://10.13.37.42 -x php,html",
            output: [
                "/login.php          (Status: 200)",
                "/admin              (Status: 301)",
                "/uploads            (Status: 403)"
            ]
        },
        {
            command: "hydra -l jan -P /usr/share/wordlists/rockyou.txt ssh://10.13.37.42 -t 4",
            output: [
                "[22][ssh] host: 10.13.37.42   login: jan   password: Summer2026!"
            ]
        },
        {
            command: "ssh jan@10.13.37.42",
            output: [
                "Last login: Thu Jun 18 2026",
                "jan@box:~$ whoami",
                "jan"
            ]
        }
    ];

    let index = 0;

    function runSession() {
        terminalBody.innerHTML = ''; // clear screen

        const session = sessions[index];

        // Type the command
        typeLine(`nick@homelab:~$ ${session.command}`, true, () => {
            // Type the output lines
            let i = 0;
            function typeOutput() {
                if (i < session.output.length) {
                    typeLine(session.output[i], false, () => {
                        i++;
                        typeOutput();
                    });
                } else {
                    // Wait then go to next session
                    setTimeout(() => {
                        index = (index + 1) % sessions.length;
                        runSession();
                    }, 1800);
                }
            }
            typeOutput();
        });
    }

    function typeLine(text, isCommand = false, callback) {
        let i = 0;
        const lineEl = document.createElement('div');
        terminalBody.appendChild(lineEl);
        terminalBody.scrollTop = terminalBody.scrollHeight;

        const speed = isCommand ? 35 : 20;

        const interval = setInterval(() => {
            if (i < text.length) {
                lineEl.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, speed);
    }

    runSession();
}

// ==================== SKILLS / TOOLS ====================
// populates skill orbs, eventually will call a popup too
async function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    try {
        const response = await fetch('/data/skills.json');
        const data = await response.json();
        const skills = data.skills || [];

        grid.innerHTML = '';

        const ROWS_TO_SHOW = 3;
        const itemsPerRow = window.innerWidth <= 768 ? 3 : 5;
        const initialLimit = ROWS_TO_SHOW * itemsPerRow;

        const initialSkills = skills.slice(0, initialLimit);
        const hasMore = skills.length > initialLimit;

        initialSkills.forEach(skill => {
            const orb = createSkillOrb(skill);
            grid.appendChild(orb);
        });

        if (hasMore) {
            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'btn main-cta';
            showMoreBtn.style.margin = '40px auto 0';
            showMoreBtn.style.display = 'block';
            showMoreBtn.textContent = 'Show more';
            showMoreBtn.addEventListener('click', () => {
                const remaining = skills.slice(initialLimit);
                remaining.forEach(skill => {
                    const orb = createSkillOrb(skill);
                    grid.appendChild(orb);
                });
                showMoreBtn.remove();
            });
            grid.parentElement.appendChild(showMoreBtn);
        }
    } catch (error) {
        console.error('Failed to load skills:', error);
    }
}

function createSkillOrb(skill) {
    const orb = document.createElement('div');
    orb.className = 'skill-orb';

    const img = document.createElement('img');
    img.src = skill.icon;
    img.alt = skill.name;
    img.className = 'skill-icon';

    const name = document.createElement('div');
    name.className = 'skill-name';
    name.textContent = skill.name;

    orb.appendChild(img);
    orb.appendChild(name);

    return orb;
}

// ==================== PROJECTS SECTION (Homepage) ====================
// populates recent posts on homepage
async function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const response = await fetch('/data/articles.json');
        const articles = await response.json();

        // Take latest 3
        const latest = articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        grid.innerHTML = '';

        latest.forEach(article => {
            const card = document.createElement('a');
            card.href = article.url || `/documentation/${article.id}.html`;
            card.className = 'project-card';

            card.innerHTML = `
                <img src="${article.coverImage || '/assets/placeholder.jpg'}" alt="${article.title}">
                <div class="project-card-body">
                    <div class="date">${new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt || article.tldr || ''}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load projects:', error);
    }
}

// ==================== EXPERIENCE TIMELINE ====================
async function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    try {
        const response = await fetch('/data/experience.json');
        const data = await response.json();
        const experiences = data.experiences || [];

        container.innerHTML = '';

        experiences.forEach(exp => {
            const item = document.createElement('div');
            item.className = 'timeline-item';

            item.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${exp.date}</div>
                    <div class="timeline-header">
                        <h3>${exp.title}</h3>
                        <p class="timeline-company">${exp.company}</p>
                    </div>
                    <p class="timeline-desc">${exp.description}</p>
                    <ul class="experience-list">
                        ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                    <div class="timeline-tags">
                        ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;

            container.appendChild(item);
        });
    } catch (error) {
        console.error('Failed to load experience:', error);
        container.innerHTML = `
            <p style="text-align: center; color: var(--text-muted);">
                Unable to load experience data. Please try again later.
            </p>
        `;
    }
}

// ==================== CERTIFICATIONS ====================
async function renderCertifications() {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;

    try {
        const response = await fetch('/data/certifications.json');
        const data = await response.json();
        const certs = data.certifications || [];

        grid.innerHTML = '';

        certs.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'cert-card';

            card.innerHTML = `
                <img src="${cert.icon}" alt="${cert.title}" class="cert-icon">
                <h3>${cert.title}</h3>
                <p>${cert.issuer} • ${cert.date}</p>
                ${cert.link && cert.link !== "#" ? `<a href="${cert.link}" class="cert-link" target="_blank" rel="noopener">Verify →</a>` : ''}
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load certifications:', error);
        grid.innerHTML = `<p style="text-align: center; color: var(--text-muted);">Unable to load certifications at this time.</p>`;
    }
}

// ==================== DOMContent ===================================================
// DomContent loads the functions
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    initFloatingMenu();
    initTldrToggle();
    loadRecentPosts();
    loadDocumentation();
    updateMetaTags();
    initFakeTerminal();
    renderSkills()
    renderProjects()
    renderExperience()
    renderCertifications()

    if (document.querySelector('.blog-cover')) {
        loadBlogHeader();
    }
});