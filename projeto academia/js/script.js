// ===== SISTEMA DE LOGIN COMPLETO =====

// Credenciais válidas (simulando banco de dados)
const usuariosValidos = [
    { email: 'admin@ironfit.com', senha: 'admin123', nome: 'Administrador', tipo: 'admin' },
    { email: 'aluno@ironfit.com', senha: 'aluno123', nome: 'Aluno Teste', tipo: 'aluno' },
    { email: 'professor@ironfit.com', senha: 'prof123', nome: 'Professor Silva', tipo: 'professor' }
];

// Verificar sessão ao carregar página
function verificarSessao() {
    // Verificar localStorage primeiro (lembrar-me)
    let sessao = localStorage.getItem('ironfit_sessao');
    if (!sessao) {
        sessao = sessionStorage.getItem('ironfit_sessao');
    }
    
    if (sessao) {
        const dados = JSON.parse(sessao);
        // Verificar se sessão expirou (24 horas)
        const agora = new Date().getTime();
        if (agora - dados.timestamp < 24 * 60 * 60 * 1000) {
            atualizarInterfaceUsuario(dados.usuario);
            return dados.usuario;
        } else {
            // Sessão expirada
            logout();
        }
    }
    return null;
}

// Atualizar interface com informações do usuário
function atualizarInterfaceUsuario(usuario) {
    const navLinks = document.getElementById('navLinks');
    if (navLinks && usuario) {
        // Verificar se já existe o elemento de usuário
        let userInfo = document.querySelector('.user-info');
        if (!userInfo) {
            userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sair';
            logoutBtn.onclick = logout;
            
            userInfo.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>${usuario.nome}</span>
            `;
            userInfo.appendChild(logoutBtn);
            
            // Remover link de login se existir
            const loginLink = Array.from(navLinks.children).find(link => link.textContent === 'Login');
            if (loginLink) loginLink.remove();
            
            navLinks.appendChild(userInfo);
        } else {
            userInfo.querySelector('span').textContent = usuario.nome;
        }
        
        // Mostrar toast de boas-vindas
        mostrarToast(`Bem-vindo(a) de volta, ${usuario.nome}!`, 'success');
    }
}

// Função de login
function fazerLogin(email, senha, remember = false) {
    const usuario = usuariosValidos.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        // Salvar sessão
        const sessao = {
            logado: true,
            usuario: {
                email: usuario.email,
                nome: usuario.nome,
                tipo: usuario.tipo
            },
            timestamp: new Date().getTime()
        };
        
        if (remember) {
            localStorage.setItem('ironfit_sessao', JSON.stringify(sessao));
        } else {
            sessionStorage.setItem('ironfit_sessao', JSON.stringify(sessao));
        }
        
        return { success: true, usuario: usuario };
    }
    
    return { success: false, message: 'E-mail ou senha inválidos!' };
}

// Função de logout
function logout() {
    localStorage.removeItem('ironfit_sessao');
    sessionStorage.removeItem('ironfit_sessao');
    
    mostrarToast('Você saiu da sua conta.', 'info');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Mostrar toast notification
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${tipo}`;
    
    let icone = '';
    switch(tipo) {
        case 'success':
            icone = '<i class="fas fa-check-circle" style="color: #28a745;"></i>';
            break;
        case 'error':
            icone = '<i class="fas fa-times-circle" style="color: #ff3b30;"></i>';
            break;
        default:
            icone = '<i class="fas fa-info-circle" style="color: #17a2b8;"></i>';
    }
    
    toast.innerHTML = `${icone} <span>${mensagem}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== CARROSSEL AUTOMÁTICO =====
const slides = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentSlide = 0;
let slideInterval;
const totalSlides = slides.length;

function createDots() {
    if (!dotsContainer) return;
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    updateDots();
}

function nextSlide() {
    if (totalSlides === 0) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    if (totalSlides === 0) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetInterval();
}

function resetInterval() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Inicializar carrossel
if (slides.length > 0 && prevBtn && nextBtn) {
    createDots();
    resetInterval();
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (mobileMenu) {
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});

// ===== ANIMAÇÕES ON SCROLL =====
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

// ===== NEWSLETTER INTERACTION =====
const newsBtn = document.getElementById('newsBtn');
const newsEmail = document.getElementById('newsEmail');

if (newsBtn && newsEmail) {
    newsBtn.addEventListener('click', () => {
        const email = newsEmail.value.trim();
        if (email && email.includes('@') && email.includes('.')) {
            mostrarToast(`✅ Inscrito com sucesso! ${email} receberá novidades.`, 'success');
            newsEmail.value = '';
        } else {
            mostrarToast('❌ Por favor, insira um e-mail válido.', 'error');
        }
    });
}

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== FORMULÁRIO DE CADASTRO =====
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome')?.value;
        const email = document.getElementById('email')?.value;
        const telefone = document.getElementById('telefone')?.value;
        const plano = document.getElementById('planoInteresse')?.value;
        
        if (nome && email && telefone) {
            // Salvar no localStorage para o admin ver
            const novosAlunos = JSON.parse(localStorage.getItem('ironfit_alunos') || '[]');
            novosAlunos.push({ nome, email, telefone, plano, data: new Date().toLocaleDateString() });
            localStorage.setItem('ironfit_alunos', JSON.stringify(novosAlunos));
            
            mostrarToast(`🎉 Parabéns ${nome}! Cadastro realizado com sucesso.`, 'success');
            cadastroForm.reset();
        } else {
            mostrarToast('⚠️ Preencha todos os campos obrigatórios.', 'error');
        }
    });
}

// ===== ADMIN LOGIN =====
const adminForm = document.getElementById('adminForm');
if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('adminUser')?.value;
        const pass = document.getElementById('adminPass')?.value;
        
        if (user === 'admin' && pass === 'iron2025') {
            document.getElementById('adminPanel')?.classList.remove('hidden');
            document.getElementById('adminLoginSection')?.classList.add('hidden');
            carregarAlunos();
            mostrarToast('Login realizado com sucesso!', 'success');
        } else {
            mostrarToast('❌ Credenciais inválidas! Use admin / iron2025', 'error');
        }
    });
}

// Carregar alunos do localStorage
function carregarAlunos() {
    const tableBody = document.getElementById('alunosTableBody');
    if (tableBody) {
        const alunos = JSON.parse(localStorage.getItem('ironfit_alunos') || '[]');
        
        if (alunos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhum aluno cadastrado ainda.</td></tr>';
        } else {
            tableBody.innerHTML = '';
            alunos.forEach(aluno => {
                const row = `
                    <tr>
                        <td>${aluno.nome}</td>
                        <td>${aluno.email}</td>
                        <td>${aluno.telefone}</td>
                        <td>${aluno.plano || 'Não informado'}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }
}

// ===== LOGIN PAGE HANDLER =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const senha = document.getElementById('loginPassword')?.value;
        const remember = document.getElementById('rememberCheckbox')?.checked;
        
        const result = fazerLogin(email, senha, remember);
        
        if (result.success) {
            mostrarToast(`Bem-vindo, ${result.usuario.nome}!`, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            mostrarToast(result.message, 'error');
        }
    });
}

// ===== FORGOT PASSWORD =====
const forgotBtn = document.getElementById('forgotPassword');
if (forgotBtn) {
    forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarToast('🔐 Instruções de recuperação enviadas para seu e-mail cadastrado.', 'info');
    });
}

// ===== VERIFICAR SESSÃO AO CARREGAR =====
document.addEventListener('DOMContentLoaded', () => {
    verificarSessao();
});

// ===== BOTÃO DE LOGIN NA NAVEGAÇÃO =====
// Verificar se precisa adicionar link de login no menu
function adicionarLinkLogin() {
    const navContainer = document.querySelector('.nav-links');
    if (navContainer && !document.querySelector('.nav-link-login')) {
        const sessao = localStorage.getItem('ironfit_sessao') || sessionStorage.getItem('ironfit_sessao');
        if (!sessao) {
            const loginLink = document.createElement('a');
            loginLink.href = 'login.html';
            loginLink.className = 'nav-link nav-link-login';
            loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            navContainer.appendChild(loginLink);
        }
    }
}

setTimeout(adicionarLinkLogin, 100);