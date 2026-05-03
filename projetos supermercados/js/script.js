// ===================== DADOS GLOBAIS =====================
let produtos = [];
let usersDB = JSON.parse(localStorage.getItem('super_users')) || [
    { id: 1, nome: "Admin Master", email: "admin@super.com", senha: "admin123", tipo: "admin" },
    { id: 2, nome: "João Silva", email: "joao@email.com", senha: "123456", tipo: "cliente" }
];

// Carrinho de compras
let carrinho = JSON.parse(localStorage.getItem('super_carrinho')) || [];

// Inicializar 40 produtos
if (!localStorage.getItem('super_produtos')) {
    const marcas = ["Nestlé", "Coca-Cola", "P&G", "Itambé", "Sadia", "Unilever", "Parmalat", "Heinz"];
    const categorias = ["Bebidas", "Alimentos", "Limpeza", "Higiene", "Frios", "Padaria", "Hortifruti"];
    const nomes = ["Leite Integral", "Arroz Premium", "Feijão Carioca", "Café Torrado", "Refrigerante Cola", "Sabão em Pó", "Shampoo", "Queijo Mussarela", "Presunto", "Pão Francês", "Batata", "Tomate", "Cerveja", "Vinho Tinto", "Suco Natural", "Biscoito Recheado", "Macarrão", "Molho de Tomate", "Óleo de Soja", "Farinha de Trigo", "Açúcar Refinado", "Sal Refinado", "Manteiga", "Iogurte", "Detergente", "Água Sanitária", "Papel Higiênico", "Fralda", "Ração para Cães", "Chocolate", "Sorvete", "Margarina", "Creme Dental", "Desodorante", "Sabonete", "Esponja", "Vela", "Pilha", "Lâmpada", "Fósforo"];
    
    for (let i = 0; i < 40; i++) {
        produtos.push({
            id: i + 1,
            nome: nomes[i % nomes.length] + (i > 30 ? " Premium" : ""),
            marca: marcas[i % marcas.length],
            categoria: categorias[i % categorias.length],
            preco: Number((5 + (i * 1.2) + Math.random() * 10).toFixed(2)),
            img: "img/outros.png",
            estoque: Math.floor(Math.random() * 100) + 10
        });
    }
    localStorage.setItem('super_produtos', JSON.stringify(produtos));
} else {
    produtos = JSON.parse(localStorage.getItem('super_produtos'));
}

function saveProdutos() { localStorage.setItem('super_produtos', JSON.stringify(produtos)); }
function saveUsers() { localStorage.setItem('super_users', JSON.stringify(usersDB)); }
function saveCarrinho() { 
    localStorage.setItem('super_carrinho', JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
}

// ===================== FUNÇÕES DO CARRINHO =====================
window.adicionarAoCarrinho = function(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;
    
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade++;
        itemExistente.subtotal = itemExistente.quantidade * itemExistente.preco;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            subtotal: produto.preco,
            img: produto.img
        });
    }
    
    saveCarrinho();
    mostrarNotificacao(`✅ ${produto.nome} adicionado ao carrinho!`);
}

window.removerDoCarrinho = function(id) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        carrinho = carrinho.filter(item => item.id !== id);
        saveCarrinho();
        mostrarNotificacao(`🗑️ ${item.nome} removido do carrinho!`);
        renderizarCarrinho();
    }
}

window.atualizarQuantidade = function(id, novaQuantidade) {
    if (novaQuantidade < 1) {
        removerDoCarrinho(id);
        return;
    }
    
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade = novaQuantidade;
        item.subtotal = item.quantidade * item.preco;
        saveCarrinho();
        renderizarCarrinho();
    }
}

window.limparCarrinho = function() {
    if (confirm("⚠️ Tem certeza que deseja limpar todo o carrinho?")) {
        carrinho = [];
        saveCarrinho();
        mostrarNotificacao("🛒 Carrinho esvaziado!");
        renderizarCarrinho();
    }
}

window.finalizarCompra = function() {
    if (carrinho.length === 0) {
        alert("❌ Seu carrinho está vazio!");
        return;
    }
    
    const total = carrinho.reduce((acc, item) => acc + item.subtotal, 0);
    alert(`🎉 COMPRA REALIZADA COM SUCESSO!\n\n💰 Total: R$ ${total.toFixed(2)}\n\n🚚 Seu pedido será entregue em até 2 horas!`);
    
    carrinho = [];
    saveCarrinho();
    renderizarCarrinho();
}

function atualizarBadgeCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    const badges = document.querySelectorAll('.carrinho-badge');
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = totalItens;
            badge.style.display = totalItens > 0 ? 'inline-flex' : 'none';
        }
    });
}

function mostrarNotificacao(mensagem) {
    let notificacao = document.querySelector('.toast-notificacao');
    if (notificacao) notificacao.remove();
    
    notificacao = document.createElement('div');
    notificacao.className = 'toast-notificacao';
    notificacao.innerHTML = `<i class="fas fa-check-circle"></i><span>${mensagem}</span>`;
    document.body.appendChild(notificacao);
    
    setTimeout(() => notificacao.classList.add('show'), 100);
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => notificacao.remove(), 300);
    }, 2500);
}

function renderizarCarrinho() {
    const container = document.getElementById('carrinhoContainer');
    const resumoContainer = document.getElementById('carrinhoResumo');
    
    if (!container) return;
    
    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="carrinho-vazio">
                <i class="fas fa-shopping-cart fa-4x"></i>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos clicando em "Comprar" na página de produtos!</p>
                <a href="produtos.html" class="btn-primary">Ver Produtos</a>
            </div>
        `;
        if (resumoContainer) resumoContainer.innerHTML = '';
        return;
    }
    
    container.innerHTML = carrinho.map(item => `
        <div class="carrinho-item">
            <img src="${item.img}" onerror="this.src='img/outros.png'" alt="${item.nome}">
            <div class="carrinho-item-info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="carrinho-item-quantidade">
                <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                <span>${item.quantidade}</span>
                <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
            </div>
            <div class="carrinho-item-subtotal">R$ ${item.subtotal.toFixed(2)}</div>
            <button class="carrinho-item-remover" onclick="removerDoCarrinho(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
    
    const subtotal = carrinho.reduce((acc, item) => acc + item.subtotal, 0);
    const frete = subtotal > 100 ? 0 : 15.90;
    const total = subtotal + frete;
    
    if (resumoContainer) {
        resumoContainer.innerHTML = `
            <div class="resumo-card">
                <h3>Resumo do Pedido</h3>
                <div class="resumo-linha"><span>Subtotal:</span><span>R$ ${subtotal.toFixed(2)}</span></div>
                <div class="resumo-linha"><span>Frete:</span><span>${frete === 0 ? 'GRÁTIS' : `R$ ${frete.toFixed(2)}`}</span></div>
                ${frete === 0 ? '<div class="frete-gratis"><i class="fas fa-truck"></i> Frete grátis!</div>' : `<div class="frete-info">Compre mais R$ ${(100 - subtotal).toFixed(2)} e ganhe frete grátis!</div>`}
                <div class="resumo-total"><span>TOTAL:</span><span>R$ ${total.toFixed(2)}</span></div>
                <button class="btn-primary btn-finalizar" onclick="finalizarCompra()"><i class="fas fa-check-circle"></i> Finalizar Compra</button>
                <button class="btn-limpar" onclick="limparCarrinho()"><i class="fas fa-trash-alt"></i> Limpar Carrinho</button>
            </div>
        `;
    }
}

// ===================== RENDER PRODUTOS =====================
function renderProductsGrid() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    let filtered = [...produtos];
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || 999999;
    const brand = document.getElementById('brandFilter')?.value || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    
    if (search) filtered = filtered.filter(p => p.nome.toLowerCase().includes(search));
    filtered = filtered.filter(p => p.preco >= minPrice && p.preco <= maxPrice);
    if (brand) filtered = filtered.filter(p => p.marca === brand);
    if (category) filtered = filtered.filter(p => p.categoria === category);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding:60px;">Nenhum produto encontrado 😢</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(p => `
        <div class="product-card fade-up">
            <img src="${p.img}" onerror="this.src='img/outros.png'" alt="${p.nome}">
            <h4>${p.nome}</h4>
            <p>${p.marca} • ${p.categoria}</p>
            <div class="price">R$ ${p.preco.toFixed(2)}</div>
            <button onclick="adicionarAoCarrinho(${p.id})"><i class="fas fa-cart-plus"></i> Comprar</button>
        </div>
    `).join('');
}

// Eventos de filtro
if (document.getElementById('productsGrid')) {
    renderProductsGrid();
    const filterElements = ['searchInput', 'minPrice', 'maxPrice', 'brandFilter', 'categoryFilter'];
    filterElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', renderProductsGrid);
    });
    document.getElementById('clearFilters')?.addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
        document.getElementById('brandFilter').value = '';
        document.getElementById('categoryFilter').value = '';
        renderProductsGrid();
    });
}

// ===================== CARROSSEL =====================
if (document.querySelector('.carousel-slides')) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesContainer = document.querySelector('.carousel-slides');
    
    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() { currentIndex = (currentIndex + 1) % totalSlides; updateCarousel(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateCarousel(); }
    
    document.querySelector('.next')?.addEventListener('click', nextSlide);
    document.querySelector('.prev')?.addEventListener('click', prevSlide);
    
    const dotsContainer = document.querySelector('.carousel-dots');
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); });
            dotsContainer.appendChild(dot);
        }
    }
    setInterval(nextSlide, 5000);
}

// ===================== ADMIN =====================
if (document.getElementById('adminProductList')) {
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    chartScript.onload = () => {
        const ctx1 = document.getElementById('salesChart')?.getContext('2d');
        if (ctx1) {
            new Chart(ctx1, {
                type: 'line',
                data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ label: 'Vendas (R$ mil)', data: [32, 45, 38, 52, 48, 68], borderColor: '#145a48', backgroundColor: 'rgba(20,90,72,0.1)', fill: true, tension: 0.4 }] },
                options: { responsive: true }
            });
        }
        const ctx2 = document.getElementById('categoryChart')?.getContext('2d');
        if (ctx2) {
            const categorias = [...new Set(produtos.map(p => p.categoria))];
            const quantidades = categorias.map(cat => produtos.filter(p => p.categoria === cat).length);
            new Chart(ctx2, { type: 'doughnut', data: { labels: categorias, datasets: [{ data: quantidades, backgroundColor: ['#145a48', '#f5b042', '#dc2626', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'] }] }, options: { responsive: true } });
        }
    };
    document.head.appendChild(chartScript);
    
    function renderAdminTable() {
        const tbody = document.getElementById('adminProductList');
        if (tbody) {
            tbody.innerHTML = produtos.map(p => `
                <tr><td>${p.id}</td><td>${p.nome}</td><td>${p.marca}</td><td>${p.categoria}</td><td>R$ ${p.preco.toFixed(2)}</td><td>${p.estoque}</td><td><button class="btn-primary" style="padding:5px 12px;" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button> <button class="btn-danger" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button></td></tr>
            `).join('');
        }
    }
    
    window.editProduct = (id) => {
        const p = produtos.find(x => x.id === id);
        const novoNome = prompt("Novo nome:", p.nome);
        if (novoNome) p.nome = novoNome;
        const novoPreco = prompt("Novo preço:", p.preco);
        if (novoPreco) p.preco = parseFloat(novoPreco);
        saveProdutos();
        renderAdminTable();
        renderProductsGrid();
    };
    
    window.deleteProduct = (id) => {
        if (confirm("Remover este produto?")) {
            produtos = produtos.filter(p => p.id !== id);
            saveProdutos();
            renderAdminTable();
            renderProductsGrid();
        }
    };
    
    document.getElementById('addProductBtn')?.addEventListener('click', () => {
        const newId = Math.max(...produtos.map(p => p.id), 0) + 1;
        produtos.push({ id: newId, nome: "Novo Produto", marca: "Geral", categoria: "Alimentos", preco: 19.99, img: "img/outros.png", estoque: 50 });
        saveProdutos();
        renderAdminTable();
        renderProductsGrid();
        alert("✅ Produto adicionado!");
    });
    
    function renderUsersTable() {
        const tbody = document.getElementById('usersListBody');
        if (tbody) {
            tbody.innerHTML = usersDB.map(u => `<tr><td>${u.nome}</td><td>${u.email}</td><td>${u.tipo || 'cliente'}</td><td><button class="btn-danger" onclick="deleteUser(${u.id})">Excluir</button></td></tr>`).join('');
        }
    }
    
    window.deleteUser = (id) => {
        if (confirm("Remover usuário?")) {
            usersDB = usersDB.filter(u => u.id !== id);
            saveUsers();
            renderUsersTable();
        }
    };
    
    document.getElementById('addUserBtn')?.addEventListener('click', () => {
        const nome = prompt("Nome:");
        const email = prompt("E-mail:");
        const senha = prompt("Senha:");
        if (nome && email && senha) {
            usersDB.push({ id: Date.now(), nome, email, senha, tipo: "cliente" });
            saveUsers();
            renderUsersTable();
            alert("✅ Usuário adicionado!");
        }
    });
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabs.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            if (tabId === 'productsTab') renderAdminTable();
            if (tabId === 'usersTab') renderUsersTable();
        });
    });
    
    renderAdminTable();
    renderUsersTable();
}

// ===================== NEWSLETTER =====================
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
        alert(`📧 Obrigado por se inscrever! Enviaremos ofertas para ${email}`);
        document.getElementById('newsletterEmail').value = '';
    }
});

// ===================== LOGIN =====================
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginPassword').value;
    const user = usersDB.find(u => u.email === email && u.senha === senha);
    if (user) {
        alert(`✅ Bem-vindo, ${user.nome}!`);
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginMessage').innerHTML = '<p style="color:#dc2626; text-align:center;">❌ E-mail ou senha incorretos</p>';
    }
});

// ===================== CADASTRO =====================
document.getElementById('cadastroForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cadNome').value;
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;
    const confirmar = document.getElementById('cadConfirmar').value;
    
    if (senha !== confirmar) return alert("❌ As senhas não coincidem!");
    if (usersDB.find(u => u.email === email)) return alert("❌ Este e-mail já está cadastrado!");
    
    usersDB.push({ id: Date.now(), nome, email, senha, tipo: "cliente" });
    saveUsers();
    alert("✅ Cadastro realizado! Faça login.");
    window.location.href = 'login.html';
});

// ===================== INICIALIZAR =====================
atualizarBadgeCarrinho();
if (document.getElementById('carrinhoContainer')) renderizarCarrinho();

// Animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .product-card, .stat-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
});

console.log("🚀 Carrinho 100% funcional!");