// ==================== Particle System ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay and duration
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 2;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// ==================== Name Animation ====================
function animateName(name) {
    const nameDisplay = document.getElementById('nameDisplay');
    const inputSection = document.getElementById('inputSection');
    const animationSection = document.getElementById('animationSection');

    // Clear previous content
    nameDisplay.innerHTML = '';

    // Hide input, show animation section
    inputSection.style.opacity = '0';
    setTimeout(() => {
        inputSection.style.display = 'none';
        animationSection.classList.remove('hidden');
        animationSection.style.opacity = '1';
    }, 300);

    // Split name into letters and create animated spans
    const letters = name.split('');
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'name-letter';
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.setAttribute('data-letter', letter === ' ' ? '\u00A0' : letter);
        span.style.animationDelay = (index * 0.1) + 's';

        // Add hover effect
        span.addEventListener('mouseenter', () => {
            span.style.animation = 'letterBounce 0.5s ease';
        });

        span.addEventListener('animationend', (e) => {
            if (e.animationName === 'letterBounce') {
                span.style.animation = '';
            }
        });

        nameDisplay.appendChild(span);
    });

    // Create spectacular particle burst
    createParticleBurst();
}

// ==================== Particle Burst Effect ====================
function createParticleBurst() {
    const nameDisplay = document.getElementById('nameDisplay');
    const burstCount = 30;

    for (let i = 0; i < burstCount; i++) {
        const burstParticle = document.createElement('div');
        burstParticle.style.position = 'absolute';
        burstParticle.style.width = '8px';
        burstParticle.style.height = '8px';
        burstParticle.style.borderRadius = '50%';
        burstParticle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        burstParticle.style.left = '50%';
        burstParticle.style.top = '50%';
        burstParticle.style.pointerEvents = 'none';
        burstParticle.style.zIndex = '1000';

        const angle = (Math.PI * 2 * i) / burstCount;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        burstParticle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }).onfinish = () => burstParticle.remove();

        nameDisplay.appendChild(burstParticle);
    }
}

// ==================== Form Handling ====================
function initializeForm() {
    const form = document.getElementById('nameForm');
    const nameInput = document.getElementById('nameInput');
    const resetBtn = document.getElementById('resetBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();

        if (name) {
            animateName(name);
        }
    });

    resetBtn.addEventListener('click', () => {
        const inputSection = document.getElementById('inputSection');
        const animationSection = document.getElementById('animationSection');

        animationSection.style.opacity = '0';
        setTimeout(() => {
            animationSection.classList.add('hidden');
            inputSection.style.display = 'block';
            setTimeout(() => {
                inputSection.style.opacity = '1';
            }, 50);
            nameInput.value = '';
            nameInput.focus();
        }, 300);
    });

    // Add floating effect to input on typing
    nameInput.addEventListener('input', (e) => {
        if (e.target.value) {
            e.target.style.transform = 'translateY(-2px)';
        } else {
            e.target.style.transform = 'translateY(0)';
        }
    });
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initializeForm();

    // Focus on input
    document.getElementById('nameInput').focus();
});

// ==================== Easter Egg: Konami Code ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateSpecialMode();
    }
});

function activateSpecialMode() {
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}
