// Space Canvas Logic with Spaceships
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    const colors = ['#ffffff', '#c8d6e5', '#e8c8e5', '#74b9ff', '#ffb8b8', '#a29bfe'];
    for (let i = 0; i < 400; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.2, // vary sizes more drastically
            speedX: (Math.random() - 0.5) * 0.15, // agonizingly slow drift
            speedY: (Math.random() - 0.5) * 0.15,
            color: colors[Math.floor(Math.random() * colors.length)],
            glow: Math.random() > 0.85,
            alpha: Math.random() * 0.6 + 0.4 
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.globalAlpha = star.alpha;

        if (star.glow) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = star.color;
            ctx.fillStyle = '#ffffff';
        } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = star.color;
        }

        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around smoothly
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;
    });

    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;

    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize();
initStars();
animateStars();

// Data for the Creators
const creatorsData = [
    {
        name: "ARJAV\nJAIN", // Split with newline for formatting
        shortName: "ARJAV JAIN",
        role: "FullStack Developer",
        desc: "Turning coffee into codes and bugs into features.",
        cardImage: "images/Arjav_Jain.jpeg",
        heroImage: "images/Arjav_Jain_Model.png",
        skills: ["react", "Express.js", "Node.js", "MongoDB", "TailwindCSS", "Framer Motion"],
        social: { linkedin: "https://www.linkedin.com/in/arjav-jain-9a5199328/", github: "https://github.com/jainarjav80-sys", codeforces: "https://codeforces.com/profile/Arjavvvvv" }
    },
    {
        name: "NIMIT\nJAIN",
        shortName: "Nimit Jain",
        role: "Frontend Developer",
        desc: "Just me, my keyboard, and a mission to stand out online.",
        cardImage: "images/Nimit_Jain.jpeg",
        heroImage: "images/Nimit_Jain_Model.png",
        skills: ["GSAP", "Three.js", "Framer Motion", "react", "TailwindCSS"],
        social: { linkedin: "https://www.linkedin.com/in/nimitjain2025/", github: "https://github.com/Nimit0808", codeforces: "https://codeforces.com/profile/Nimit0808" }
    },
    {
        name: "NAGORAO DINKAR \n KUTE",
        shortName: "NAGORAO",
        role: "Animations Designer",
        desc: "Always a curious learner.",
        cardImage: "images/Nagorao.png",
        heroImage: "images/Nagorao_Model.png",
        skills: ["CP", "Framer Motion", "Web Animations", "MySQL", "WebGL"],
        social: { linkedin: "https://www.linkedin.com/in/nagorao-kute-b5183136b/", github: "https://github.com/Nagorao001", codeforces: "https://codeforces.com/profile/Shadowlesss" }
    }
];

// DOM Elements
const infoContainer = document.getElementById('info-container');
const imageContainer = document.getElementById('image-container');
const elName = document.getElementById('creator-name');
const elRole = document.getElementById('creator-role');
const elDesc = document.getElementById('creator-desc');
const elImage = document.getElementById('creator-image');
const elMobileImage = document.getElementById('mobile-creator-image');
const skillsContainer = document.getElementById('skills-container');
const cardsContainer = document.getElementById('cards-container');
const linkLinkedin = document.getElementById('link-linkedin');
const linkGithub = document.getElementById('link-github');
const linkCodeforces = document.getElementById('link-codeforces');
const mLinkLinkedin = document.getElementById('mobile-link-linkedin');
const mLinkGithub = document.getElementById('mobile-link-github');
const mLinkCodeforces = document.getElementById('mobile-link-codeforces');

let currentIndex = 0;

// Render Bottom Cards & Initial Setup
let isAutomating = false;

function renderCards() {
    const oldScroll = cardsContainer.scrollLeft;
    cardsContainer.innerHTML = '';
    
    // Render 1 set initially to gauge width
    const setHTML = creatorsData.map((creator, dataIndex) => `
        <div class="creator-card flex-shrink-0 w-80 mr-4 rounded-xl overflow-hidden flex shadow-lg cursor-pointer" onclick="changeCreator(${dataIndex})">
            <div class="w-1/3 h-full bg-[#111522]">
                <img src="${creator.cardImage}" class="w-full h-full object-cover opacity-90" alt="${creator.shortName}">
            </div>
            <div class="w-2/3 p-4 flex flex-col justify-center">
                <h3 class="font-heading font-bold text-xl leading-tight uppercase">${creator.shortName}</h3>
                <p class="role-text font-heading text-sm tracking-widest uppercase mb-3"></p>
                <button class="action-btn px-4 py-1.5 rounded-full text-sm font-heading tracking-widest transition-colors w-fit shadow-lg">
                    VIEW PROFILE
                </button>
            </div>
        </div>
    `).join('');

    cardsContainer.innerHTML = setHTML;
    
    // Evaluate if they fit exactly on screen
    if (cardsContainer.scrollWidth > cardsContainer.clientWidth) {
        isAutomating = true;
        cardsContainer.innerHTML = setHTML + setHTML + setHTML;
        cardsContainer.classList.remove('justify-center');
        cardsContainer.scrollLeft = oldScroll;
    } else {
        isAutomating = false;
        cardsContainer.classList.add('justify-center');
    }
    
    updateActiveCardVisuals();
}

function updateActiveCardVisuals() {
    const cards = cardsContainer.querySelectorAll('.creator-card');
    cards.forEach((card, i) => {
        const dataIndex = i % creatorsData.length;
        const isActive = dataIndex === currentIndex;
        
        const p = card.querySelector('.role-text');
        const btn = card.querySelector('.action-btn');

        if (isActive) {
            card.classList.add('active-card', 'bg-[#0b0f19]', 'border', 'border-[#8090B8]');
            card.classList.remove('bg-white/5', 'text-white', 'backdrop-blur-md', 'hover:bg-white/10', 'border-white/10');
            p.classList.add('text-accent');
            p.classList.remove('text-gray-400');
            btn.classList.add('bg-accent', 'text-[#060608]', 'font-bold', 'border-none', 'glow-button');
            btn.classList.remove('bg-transparent', 'border', 'border-white/30', 'text-white', 'hover:bg-white/10');
        } else {
            card.classList.add('bg-white/5', 'text-white', 'backdrop-blur-md', 'hover:bg-white/10', 'border', 'border-white/10');
            card.classList.remove('active-card', 'bg-[#0b0f19]', 'border-[#8090B8]');
            p.classList.add('text-gray-400');
            p.classList.remove('text-accent');
            btn.classList.add('bg-transparent', 'border', 'border-white/30', 'text-white', 'hover:bg-white/10');
            btn.classList.remove('bg-accent', 'text-[#060608]', 'font-bold', 'border-none', 'glow-button');
        }
        
        // Dynamically insert role text so we don't have to keep swapping outerHTML
        p.innerText = creatorsData[dataIndex].role;
    });
}

function renderSkills(data) {
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        // Glowing button look
        skillsContainer.innerHTML += `
            <div class="lightning-glow text-texture font-bold px-6 py-2.5 rounded-full text-base md:text-lg font-heading tracking-widest w-fit cursor-default flex items-center justify-center mt-2">
                ${skill}
            </div>
        `;
    });
}

// Change Active Creator with Animations
window.changeCreator = function (index) {
    if (window.isCardDragging) return; // Prevent click if dragging
    if (index === currentIndex) return;

    currentIndex = index;

    // Trigger exit animations
    infoContainer.classList.remove('active');
    imageContainer.classList.remove('active');

    // Update styling without restructuring the entire DOM
    updateActiveCardVisuals();

    // Wait for exit animation, then update content and animate in
    setTimeout(() => {
        const data = creatorsData[index];

        elName.innerHTML = data.name.replace('\n', '<br>') + '.';
        elRole.innerText = data.role;
        elDesc.innerText = data.desc;
        elImage.src = data.heroImage;
        if (elMobileImage) elMobileImage.src = data.heroImage;

        linkLinkedin.href = data.social.linkedin;
        linkGithub.href = data.social.github;
        linkCodeforces.href = data.social.codeforces;
        
        if (mLinkLinkedin) mLinkLinkedin.href = data.social.linkedin;
        if (mLinkGithub) mLinkGithub.href = data.social.github;
        if (mLinkCodeforces) mLinkCodeforces.href = data.social.codeforces;

        // Render specific skills for the active creator
        renderSkills(data);

        // Trigger enter animations
        infoContainer.classList.add('active');
        imageContainer.classList.add('active');

    }, 500); // Wait for CSS transition
}

// Initial Initialization
function init() {
    renderCards();
    // Render initial skills
    const data = creatorsData[currentIndex];
    renderSkills(data);
    linkLinkedin.href = data.social.linkedin;
    linkGithub.href = data.social.github;
    linkCodeforces.href = data.social.codeforces;
    
    if (mLinkLinkedin) mLinkLinkedin.href = data.social.linkedin;
    if (mLinkGithub) mLinkGithub.href = data.social.github;
    if (mLinkCodeforces) mLinkCodeforces.href = data.social.codeforces;

    startAutoPlay();
}

// Run Init
document.addEventListener('DOMContentLoaded', init);

// Resize handler to re-evaluate card automation
let resizeTimeout;
window.addEventListener('resize', () => { 
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (cardsContainer) renderCards();
    }, 200);
});

// --- Auto-play and Mouse Drag to Scroll Logic ---

let scrollAnimationId;
let autoScrollSpeed = 0.5; // pixels per frame

function animateScroll() {
    if (!cardsContainer) return;
    
    // Smooth infinite scrolling if not hovering or dragging, and if automation is required
    if (isAutomating && !window.isCardDragging && !window.isHoveringCards) {
        cardsContainer.scrollLeft += autoScrollSpeed;
        
        const setWidth = cardsContainer.scrollWidth / 3;
        
        // Loop when reaching the end of the second set
        if (cardsContainer.scrollLeft >= setWidth * 2) {
            cardsContainer.scrollLeft -= setWidth;
        } else if (cardsContainer.scrollLeft <= 0) {
            // Or loop backwards if they somehow drag to the start
            cardsContainer.scrollLeft += setWidth;
        }
    }
    
    scrollAnimationId = requestAnimationFrame(animateScroll);
}

function startAutoPlay() {
    if (!scrollAnimationId) {
        animateScroll();
    }
}

function stopAutoPlay() {
    // Rely exclusively on isHoveringCards and isCardDragging to stop the scrolling logic instead of killing the animation frame entirely
    // This provides a much smoother resume execution
}

// Mouse Drag to Scroll for Cards Container
let isDown = false;
let startX;
let scrollLeft;
window.isCardDragging = false;
window.isHoveringCards = false;

// Interactions that should stop auto scrolling
cardsContainer.addEventListener('mouseenter', () => window.isHoveringCards = true);
cardsContainer.addEventListener('mouseleave', () => {
    window.isHoveringCards = false;
    if (isDown) { // Resume only if we were dragging
        isDown = false;
        cardsContainer.classList.remove('cursor-grabbing');
    }
});

cardsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    window.isCardDragging = false;
    window.isHoveringCards = true;
    cardsContainer.classList.add('cursor-grabbing');
    startX = e.pageX - cardsContainer.offsetLeft;
    scrollLeft = cardsContainer.scrollLeft;
});

cardsContainer.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    cardsContainer.classList.remove('cursor-grabbing');
    // Delay resetting the dragging flag so it covers the ensuing click event
    setTimeout(() => {
        window.isCardDragging = false;
    }, 50);
});

cardsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardsContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
        window.isCardDragging = true;
    }
    
    cardsContainer.scrollLeft = scrollLeft - walk;
});

// Pause autoplay strictly during touch interactions on screens
cardsContainer.addEventListener('touchstart', () => window.isHoveringCards = true, {passive: true});
cardsContainer.addEventListener('touchend', () => window.isHoveringCards = false, {passive: true});
