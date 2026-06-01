// ==================== CENTRAL DATA SOURCE ====================
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
    }
];

// ==================== PROJECTS SECTION (Homepage) ====================
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

// ==================== DOCUMENTATION GRID (docs.html) ====================
function renderDocsGrid(filteredPosts) {
    const grid = document.getElementById('docs-grid');
    if (!grid) return;

    grid.innerHTML = '';

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

// ==================== SKILLS ====================
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

    const ROWS_TO_SHOW = 2;        // ← Change back to 5 when done testing
    const itemsPerRow = window.innerWidth <= 768 ? 3 : 5;
    const initialLimit = ROWS_TO_SHOW * itemsPerRow;

    const initialSkills = skills.slice(0, initialLimit);
    const hasMore = skills.length > initialLimit;

    // Render initial skills (with animation)
    initialSkills.forEach(skill => {
        const orb = createSkillOrb(skill);
        grid.appendChild(orb);

        // Trigger animation
        setTimeout(() => orb.classList.add('visible'), 10);
    });

    if (hasMore) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'btn main-cta';
        showMoreBtn.style.margin = '40px auto 0';
        showMoreBtn.style.display = 'block';
        showMoreBtn.textContent = 'Show All Skills';

        showMoreBtn.addEventListener('click', () => {
            const remainingSkills = skills.slice(initialLimit);

            remainingSkills.forEach((skill, index) => {
                const orb = createSkillOrb(skill);
                grid.appendChild(orb);

                // Staggered animation
                setTimeout(() => {
                    orb.classList.add('visible');
                }, 15 + (index * 25)); // nice staggered effect
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

// ==================== CERTIFICATIONS ====================
const certifications = [
    {
        title: "CompTIA Network+",
        issuer: "CompTIA",
        date: "2026",
        icon: "https://www.svgrepo.com/show/532872/network-wired.svg",
        link: "https://www.credly.com/badges/4aa00f9f-2abc-41b7-bcdd-2e82d3a3cc84/public_url"
    },
    {
        title: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2026 (Pending)",
        icon: "https://www.svgrepo.com/show/398289/shield.svg",
        link: "#"
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
            ${cert.link && cert.link !== "#" ? `<a href="${cert.link}" class="cert-link" target="_blank">Verify with Credly →</a>` : ''}
        `;
        grid.appendChild(card);
    });
}

// ==================== SINGLE DOC POST ====================
function populatePostFromData() {
    const currentPath = window.location.pathname;
    const post = documentationPosts.find(p => p.link.includes(currentPath.split('/').pop()));

    if (!post) return;

    const postTitle = document.querySelector('h1.section-title');
    if (postTitle) postTitle.textContent = post.title;

    const coverImg = document.getElementById('post-cover');
    if (coverImg) coverImg.src = post.image;

    const tagsContainer = document.getElementById('post-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('');
    }
}

// ==================== HAMBURGER MENU ====================
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

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
    renderCertifications();

    if (document.getElementById('docs-grid')) {
        initDocsFilters();
    }

    if (document.body.classList.contains('docs-page')) {
        populatePostFromData();
    }

    initHamburger();
});