// ==================== PROJECTS (Homepage) ====================
const projects = [
    {
        title: "Zero Trust Architecture",
        description: "Designed and implemented a segmented Zero Trust network architecture using OPNsense, UniFi, and Cloudflare Tunnel. Features VLAN micro-segmentation across 6 zones, strict firewall rules, and secure remote access.",
        image: "/assets/web-images/zero-trust-network.jpg",
        tags: ["Zero Trust", "Network Security", "VLAN Segmentation", "OPNsense", "Cybersecurity"],
        date: "2025-04-15",
        link: "/documentation/zero-trust-network.html"
    },
    {
        title: "Proxmox Self-Hosted Infrastructure",
        description: "Built a complete self-hosted homelab on Proxmox with Jellyfin, media automation, Nginx reverse proxy, and AI stack (Ollama + N8N). Running on a single node with Docker containers and Zero Trust access controls.",
        image: "/assets/web-images/proxmox-selfhosted-infra.jpg",
        tags: ["Proxmox", "Homelab", "Self-Hosted", "Virtualization", "Docker"],
        date: "2025-02-10",
        link: "/documentation/proxmox-infrastructure.html"
    }
];

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const sortedProjects = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));

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

// ==================== DOCUMENTATION POSTS ====================
const documentationPosts = [
    {
        title: "Zero Trust Architecture",
        description: "Designed and implemented a segmented Zero Trust network architecture using OPNsense, UniFi, and Cloudflare Tunnel.",
        image: "/assets/post-images/zero-trust-network/cover-photo.jpg",
        tags: ["Zero Trust", "Network Security", "OPNsense", "Cybersecurity"],
        date: "2025-04-15",
        type: "project",
        link: "/documentation/zero-trust-network.html"
    },
    {
        title: "Proxmox Self-Hosted Infrastructure",
        description: "Built a complete self-hosted homelab on Proxmox with Jellyfin, media automation, Nginx reverse proxy, and AI stack.",
        image: "/assets/post-images/proxmox-infrastructure.jpg",
        tags: ["Proxmox", "Homelab", "Ubuntu", "Docker"],
        date: "2025-02-10",
        type: "project",
        link: "/documentation/proxmox-infrastructure.html"
    }
];

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
    const grid = document.getElementById('docs-grid');
    if (!grid) return;

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

        filtered.sort((a, b) => {
            return isNewestFirst
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date);
        });

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

    skills.forEach(skill => {
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
        grid.appendChild(orb);
    });
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

    const post = documentationPosts.find(p =>
        p.link.includes(currentPath.split('/').pop())
    );

    if (!post) return;

    // Set Title
    const postTitle = document.querySelector('h1.section-title');
    if (postTitle) postTitle.textContent = post.title;

    // Set Cover Image
    const coverImg = document.getElementById('post-cover');
    if (coverImg) coverImg.src = post.image;

    // Add Tags
    const tagsContainer = document.getElementById('post-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = post.tags.map(tag => `
            <span class="post-tag">${tag}</span>
        `).join('');
    }
}

// ==================== TLDR TOGGLE ====================
function initTldrToggle() {
    const content = document.getElementById('tldr-content');
    const toggleBtn = document.getElementById('tldr-toggle');

    if (!content || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isExpanded = content.classList.toggle('expanded');
        toggleBtn.textContent = isExpanded ? 'Show less ↑' : 'Read full TLDR ↓';
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

    // NEW: Populate single documentation post
    if (document.body.classList.contains('docs-page')) {
        populatePostFromData();
    }

    // TLDR Toggle
    initTldrToggle();

    setTimeout(() => {
        if (typeof Iconify !== 'undefined') {
            Iconify.scan();
        }
    }, 100);
});