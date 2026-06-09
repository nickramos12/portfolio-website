// ==================== CENTRAL DATA SOURCE
const documentationPosts = [
    {
        title: "Designing a Risk-Based Zero Trust Architecture for Homelab",
        description: "Designed and implemented a segmented Zero Trust network architecture using OPNsense, UniFi, and Cloudflare Tunnel.",
        image: "/assets/post-images/zero-trust-network/cover-photo.jpg",
        tags: ["Zero Trust", "Network Security", "OPNsense", "Cybersecurity"],
        date: "2025-04-15",
        type: "project",
        link: "/documentation/zero-trust-network.html"
    },
    {
        title: "Building a Private Cloud Homelab on Proxmox",
        description: "Built a complete self-hosted homelab on Proxmox with Jellyfin, media automation, Nginx reverse proxy, and AI stack.",
        image: "/assets/post-images/proxmox-cluster/cover-photo.jpg",
        tags: ["Proxmox", "Homelab", "Ubuntu", "Docker"],
        date: "2025-02-10",
        type: "project",
        link: "/documentation/proxmox-infrastructure.html"
    },
    {
        title: "Pickle Rick - Easy",
        description: "I compromised a Rick and Morty-themed web server by enumerating directories, bypassing command restrictions, and escalating privileges via sudo to collect all three secret ingredients.",
        image: "/assets/post-images/pickle-rick/cover-photo.jpg",
        tags: ["TryHackMe", "Easy", "Web Exploitation", "Command Execution"],
        date: "2025-06-05",
        type: "lab",
        link: "/documentation/pickle_rick.html"
    },
    {
        title: "HeartBleed - Easy",
        description: "Exploited the infamous OpenSSL Heartbleed vulnerability (CVE-2014-0160) on a vulnerable HTTPS service to leak sensitive memory contents, successfully extracting private keys and credentials.",
        image: "/assets/post-images/heartbleed/cover-photo.jpg",
        tags: ["TryHackMe", "Easy", "Web Exploitation", "Cryptography", "Heartbleed"],
        date: "2026-06-08",
        type: "lab",
        link: "/documentation/heartbleed.html"
    }
];

// Type Options: "project" "lab" or "blog"

// ==================== CENTRAL NAVBAR DATA
const navbarLinks = [
    { text: "Home", href: "/index.html", id: "home" },
    { text: "Skills", href: "/index.html#skills", id: "skills" },
    { text: "Projects", href: "/index.html#projects", id: "projects" },
    { text: "Documentation", href: "/documentation/index.html", id: "documentation" },
    { text: "Experience", href: "/index.html#experience", id: "experience" },
    { text: "Certifications", href: "/index.html#certifications", id: "certifications" },
    { text: "Contact", href: "/index.html#contact", id: "contact" }
];

// ==================== DYNAMIC NAVBAR
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

        // Mark active link
        if (currentPath.includes('documentation') && link.id === 'documentation') {
            a.classList.add('active');
        } else if (currentPath === '/' || currentPath === '/index.html') {
            if (link.id === 'home') a.classList.add('active');
        }

        li.appendChild(a);
        navLinksContainer.appendChild(li);
    });
}

// ==================== PROJECTS SECTION (Homepage)
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const sortedProjects = [...documentationPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn" style="margin-top: 20px; display: inline-block;">Read Full →</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==================== DOCUMENTATION GRID
function renderDocsGrid(filteredPosts) {
    const grid = document.getElementById('docs-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (filteredPosts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: #888;">
                <p style="font-size: 1.3rem; margin-bottom: 12px;">No posts selected</p>
                <p>Select at least one filter above to see documentation posts.</p>
            </div>
        `;
        return;
    }

    filteredPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="project-info">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <div class="project-tags">
                    ${post.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.link}" class="btn" style="margin-top: auto;">Read Full →</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initDocsFilters() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    const sortBtn = document.getElementById('sort-btn');
    let isNewestFirst = true;

    function filterAndRender() {
        const checkedTypes = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let filtered = [...documentationPosts];

        if (checkedTypes.length > 0) {
            filtered = filtered.filter(post => checkedTypes.includes(post.type));
        } else {
            filtered = [];   // Show nothing when all filters are off
        }

        filtered.sort((a, b) => isNewestFirst
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date)
        );

        renderDocsGrid(filtered);
    }

    checkboxes.forEach(cb => cb.addEventListener('change', filterAndRender));

    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            isNewestFirst = !isNewestFirst;
            sortBtn.textContent = isNewestFirst ? "Sort: Newest First" : "Sort: Oldest First";
            filterAndRender();
        });
    }

    filterAndRender();
}

// ==================== SKILLS
const skills = [
    { name: "Proxmox", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/proxmox/proxmox-original-wordmark.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    { name: "Ubuntu", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg" },
    { name: "OPNsense", icon: "https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/svg/opnsense.svg" },
    { name: "UniFi", icon: "https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/svg/ubiquiti-unifi.svg" },
    { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" },
    { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" }
];

function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const ROWS_TO_SHOW = 3;

    // More accurate column count based on current CSS (minmax 160px)
    let itemsPerRow = 5; // default desktop
    if (window.innerWidth <= 768) {
        itemsPerRow = 3;
    } else if (window.innerWidth >= 1800) {
        itemsPerRow = 7;   // wider screens
    } else if (window.innerWidth >= 1400) {
        itemsPerRow = 6;
    }

    const initialLimit = ROWS_TO_SHOW * itemsPerRow;

    const initialSkills = skills.slice(0, initialLimit);
    const hasMore = skills.length > initialLimit;

    initialSkills.forEach(skill => {
        const orb = createSkillOrb(skill);
        grid.appendChild(orb);
        setTimeout(() => orb.classList.add('visible'), 10);
    });

    if (hasMore) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn main-cta';
        showMoreBtn.style.margin = '40px auto 0';
        showMoreBtn.style.display = 'block';
        showMoreBtn.textContent = 'Show more';

        showMoreBtn.addEventListener('click', () => {
            const remaining = skills.slice(initialLimit);
            remaining.forEach((skill, i) => {
                const orb = createSkillOrb(skill);
                grid.appendChild(orb);
                setTimeout(() => orb.classList.add('visible'), 20 + i * 30);
            });
            showMoreBtn.remove();
        });

        grid.parentElement.appendChild(showMoreBtn);
    }
}

function createSkillOrb(skill) {
    const orb = document.createElement('div');
    orb.className = 'skill-orb';

    const img = document.createElement('img');
    img.src = skill.icon;
    img.alt = skill.name;
    img.className = 'skill-icon';

    const nameElement = document.createElement('div');
    nameElement.className = 'skill-name';
    nameElement.textContent = skill.name;

    orb.appendChild(img);
    orb.appendChild(nameElement);
    return orb;
}

// ==================== CERTIFICATIONS
const certifications = [
    {
        title: "CompTIA Network+",
        issuer: "CompTIA",
        date: "2026",
        icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/comptia.svg",
        link: "https://www.credly.com/badges/4aa00f9f-2abc-41b7-bcdd-2e82d3a3cc84/public_url"
    },
    {
        title: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2026 (Pending)",
        icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/comptia.svg",
        link: "#"
    },
    {
        title: "Pre Security",
        issuer: "TryHackMe",
        date: "2026",
        icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tryhackme.svg",
        link: "https://tryhackme.com/certificate/THM-VSHL5ZVMR3"
    }
];

function renderCertifications() {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;
    grid.innerHTML = '';

    certifications.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.innerHTML = `
            <img src="${cert.icon}" alt="${cert.title}" class="cert-icon">
            <h3>${cert.title}</h3>
            <p>${cert.issuer} • ${cert.date}</p>
            ${cert.link && cert.link !== "#" ? `<a href="${cert.link}" class="cert-link" target="_blank">Verify →</a>` : ''}
        `;
        grid.appendChild(card);
    });
}

// ==================== SINGLE DOC POST
function populatePostFromData() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop();

    const post = documentationPosts.find(p => p.link.includes(fileName));

    if (!post) return;

    // Update page title in <head>
    document.title = `${post.title} - Nick Ramos`;

    // Update visible h1
    const postTitle = document.querySelector('h1.section-title');
    if (postTitle) postTitle.textContent = post.title;

    // Update cover image
    const coverImg = document.getElementById('post-cover');
    if (coverImg) coverImg.src = post.image;

    // Update tags
    const tagsContainer = document.getElementById('post-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = post.tags.map(tag =>
            `<span class="post-tag">${tag}</span>`
        ).join('');
    }
}

// ==================== HAMBURGER MENU
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Auto-close menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==================== TLDR TOGGLE (Conditional + working expand)
function initTldrToggle() {
    const toggleBtn = document.getElementById('tldr-toggle');
    const content = document.getElementById('tldr-content');

    if (!toggleBtn || !content) return;

    function shouldTruncate() {
        // Force full render measurement
        content.style.maxHeight = 'none';
        const fullHeight = content.scrollHeight;
        content.style.maxHeight = '130px';
        return fullHeight > 160;   // increased threshold slightly
    }

    // Run after full load for accurate heights
    function initialize() {
        const needsButton = shouldTruncate();

        if (needsButton) {
            toggleBtn.style.display = 'inline-block';
            toggleBtn.textContent = 'More ↓';
            content.style.maxHeight = '130px';
        } else {
            toggleBtn.style.display = 'none';
            content.style.maxHeight = 'none';
        }
    }

    // Click handler - use JS to control height (more reliable than class alone)
    toggleBtn.addEventListener('click', () => {
        if (content.classList.contains('expanded')) {
            content.style.maxHeight = '130px';
            toggleBtn.textContent = 'More ↓';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            toggleBtn.textContent = 'Less ↑';
        }
        content.classList.toggle('expanded');
    });

    // Initialize when ready
    if (document.readyState === 'complete') {
        initialize();
    } else {
        window.addEventListener('load', initialize);
    }
}

// ==================== INITIALIZATION 
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderProjects();
    renderSkills();
    renderCertifications();

    if (document.getElementById('docs-grid')) {
        initDocsFilters();
    }

    if (document.body.classList.contains('docs-page')) {
        populatePostFromData();
        initTldrToggle();
    }

    initHamburger();
});