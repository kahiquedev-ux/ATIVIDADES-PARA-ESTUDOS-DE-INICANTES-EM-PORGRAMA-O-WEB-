// ==================== CURSOR GLOW ====================
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 15 + 'px';
    cursor.style.top = e.clientY - 15 + 'px';
});

// ==================== ANIMAÇÃO DE TYPING ====================
const titles = ['Maria Fernanda', 'Desenvolvedora Front-end', 'UI/UX Designer', 'Criadora de Experiências'];
let titleIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector('.typing-title');

function typeWriter() {
    if (charIndex < titles[titleIndex].length) {
        typingElement.innerHTML += titles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingElement.innerHTML = titles[titleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeWriter, 200);
    }
}

typeWriter();

// ==================== 20 PROJETOS COM LINK GITHUB ====================
const projectsData = [];
for (let i = 1; i <= 20; i++) {
    projectsData.push({
        title: `Projeto Criativo ${i}`,
        description: `Um projeto incrível desenvolvido com tecnologias modernas e design elegante.`,
        githubLink: `https://github.com/mariafernanda/projeto-${i}`,
        img: 'img/projeto.png'
    });
}

const projectsGrid = document.getElementById('projectsGrid');
function renderProjects() {
    projectsGrid.innerHTML = '';
    projectsData.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animationDelay = `${index * 0.02}s`;
        card.innerHTML = `
            <div class="project-img">
                <img src="${project.img}" alt="${project.title}">
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.githubLink}" class="project-link" target="_blank">
                <i class="fab fa-github"></i> Ver no GitHub
            </a>
        `;
        projectsGrid.appendChild(card);
    });
}
renderProjects();

// ==================== SCROLL REVEAL ANIMATION ====================
const revealElements = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

// ==================== MENU ATIVO E SCROLL SUAVE ====================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ==================== FORMULÁRIO COM ANIMAÇÃO E VALIDAÇÃO ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formMessage.innerHTML = '<span style="color:#b83b5e">❌ Por favor, preencha todos os campos.</span>';
        formMessage.style.animation = 'fadeInUp 0.3s ease';
        setTimeout(() => formMessage.innerHTML = '', 3000);
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        formMessage.innerHTML = '<span style="color:#b83b5e">❌ Insira um e-mail válido.</span>';
        setTimeout(() => formMessage.innerHTML = '', 3000);
        return;
    }
    formMessage.innerHTML = '<span style="color:#2d6a4f">✨ Mensagem enviada com sucesso! Em breve retornarei 💖</span>';
    contactForm.reset();
    setTimeout(() => formMessage.innerHTML = '', 4000);
});

// ==================== MENU MOBILE ====================
const mobileBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#fff9fc';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });
}

// ==================== ANIMAÇÃO EXTRA NOS CARDS AO HOVER ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
});