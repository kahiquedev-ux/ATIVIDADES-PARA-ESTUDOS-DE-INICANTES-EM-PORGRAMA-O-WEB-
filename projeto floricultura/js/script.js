// ========== BANCO DE DADOS DE PRODUTOS (30 PRODUTOS) ==========
let products = [
    { id: 1, name: "Buquê Romântico Vermelho", category: "buques", price: 89.90, promoPrice: 79.90, stock: 15, description: "Lindas rosas vermelhas em buquê elegante", rating: 5, image: "img/produto.png" },
    { id: 2, name: "Buquê de Flores do Campo", category: "buques", price: 69.90, promoPrice: null, stock: 20, description: "Flores variadas com tons campestres", rating: 4, image: "img/produto.png" },
    { id: 3, name: "Orquídea Phalaenopsis", category: "plantas", price: 120.00, promoPrice: 99.90, stock: 8, description: "Orquídea de vaso duradoura", rating: 5, image: "img/produto.png" },
    { id: 4, name: "Kit Aniversário Especial", category: "aniversario", price: 149.90, promoPrice: 129.90, stock: 12, description: "Flores + chocolate + balão", rating: 5, image: "img/produto.png" },
    { id: 5, name: "Arranjo de Casamento", category: "casamento", price: 250.00, promoPrice: null, stock: 5, description: "Arranjo perfeito para cerimônias", rating: 5, image: "img/produto.png" },
    { id: 6, name: "Rosa do Deserto", category: "plantas", price: 55.90, promoPrice: 49.90, stock: 25, description: "Suculenta exótica e resistente", rating: 4, image: "img/produto.png" },
    { id: 7, name: "Buquê Azul do Amor", category: "buques", price: 99.90, promoPrice: 89.90, stock: 10, description: "Rosas azuis importadas", rating: 5, image: "img/produto.png" },
    { id: 8, name: "Girassol de Vaso", category: "flores", price: 45.90, promoPrice: 39.90, stock: 30, description: "Girassol fresco em vaso decorativo", rating: 4, image: "img/produto.png" },
    { id: 9, name: "Cesta de Café da Manhã", category: "presentes", price: 89.90, promoPrice: null, stock: 18, description: "Cesta com flores e café especial", rating: 5, image: "img/produto.png" },
    { id: 10, name: "Lírios Brancos", category: "flores", price: 79.90, promoPrice: 69.90, stock: 14, description: "Lírios perfumados para decoração", rating: 4, image: "img/produto.png" },
    { id: 11, name: "Buquê Outono", category: "buques", price: 74.90, promoPrice: null, stock: 22, description: "Cores quentes do outono", rating: 4, image: "img/produto.png" },
    { id: 12, name: "Suculentas Decorativas", category: "plantas", price: 35.90, promoPrice: 29.90, stock: 40, description: "Kit com 3 suculentas", rating: 5, image: "img/produto.png" },
    { id: 13, name: "Flor de Maio", category: "plantas", price: 49.90, promoPrice: null, stock: 15, description: "Cacto florido colorido", rating: 4, image: "img/produto.png" },
    { id: 14, name: "Buquê Primavera", category: "buques", price: 84.90, promoPrice: 74.90, stock: 19, description: "Flores coloridas da primavera", rating: 5, image: "img/produto.png" },
    { id: 15, name: "Vaso de Violetas", category: "flores", price: 39.90, promoPrice: 34.90, stock: 28, description: "Violetas em vaso decorativo", rating: 4, image: "img/produto.png" },
    { id: 16, name: "Kit Spa e Flores", category: "presentes", price: 159.90, promoPrice: 139.90, stock: 7, description: "Flores + produtos de spa", rating: 5, image: "img/produto.png" },
    { id: 17, name: "Bromélia Imperial", category: "plantas", price: 95.00, promoPrice: null, stock: 6, description: "Bromélia grande e vistosa", rating: 4, image: "img/produto.png" },
    { id: 18, name: "Buquê Corporativo", category: "buques", price: 110.00, promoPrice: 99.90, stock: 11, description: "Arranjo para escritórios", rating: 4, image: "img/produto.png" },
    { id: 19, name: "Flor de Lis", category: "flores", price: 65.90, promoPrice: 59.90, stock: 16, description: "Flor de lis azul", rating: 5, image: "img/produto.png" },
    { id: 20, name: "Kit Namorados", category: "presentes", price: 129.90, promoPrice: 109.90, stock: 13, description: "Kit romântico com flores", rating: 5, image: "img/produto.png" },
    { id: 21, name: "Cacto Colunar", category: "plantas", price: 45.00, promoPrice: 39.90, stock: 22, description: "Cacto de crescimento vertical", rating: 4, image: "img/produto.png" },
    { id: 22, name: "Buquê de Lavanda", category: "buques", price: 59.90, promoPrice: null, stock: 25, description: "Lavanda perfumada", rating: 5, image: "img/produto.png" },
    { id: 23, name: "Mini Jardim", category: "presentes", price: 79.90, promoPrice: 69.90, stock: 20, description: "Mini jardim com 5 plantas", rating: 4, image: "img/produto.png" },
    { id: 24, name: "Hortênsia Azul", category: "flores", price: 85.00, promoPrice: 75.00, stock: 12, description: "Hortênsia de vaso", rating: 5, image: "img/produto.png" },
    { id: 25, name: "Buquê de Casamento", category: "casamento", price: 299.90, promoPrice: 279.90, stock: 4, description: "Buquê especial para noivas", rating: 5, image: "img/produto.png" },
    { id: 26, name: "Samambaia Americana", category: "plantas", price: 55.00, promoPrice: 49.90, stock: 18, description: "Samambaia pendente", rating: 4, image: "img/produto.png" },
    { id: 27, name: "Buquê Inverno", category: "buques", price: 79.90, promoPrice: 69.90, stock: 14, description: "Flores de inverno", rating: 4, image: "img/produto.png" },
    { id: 28, name: "Vaso de Crisântemo", category: "flores", price: 49.90, promoPrice: 44.90, stock: 21, description: "Crisântemo amarelo", rating: 4, image: "img/produto.png" },
    { id: 29, name: "Kit Chá das Flores", category: "presentes", price: 99.90, promoPrice: null, stock: 10, description: "Flores + chá especial", rating: 5, image: "img/produto.png" },
    { id: 30, name: "Flor de Papel", category: "flores", price: 35.00, promoPrice: 29.90, stock: 35, description: "Flor artificial de alta qualidade", rating: 4, image: "img/produto.png" }
];

// ========== CARRINHO ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ========== FUNÇÕES DO CARRINHO ==========
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartSidebar();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.promoPrice || product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    showToast(`${product.name} adicionado ao carrinho!`);
    openCartSidebar();
}

function updateCartSidebar() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        updateCartTotals();
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <span class="cart-item-remove" onclick="removeFromCart(${item.id})">Remover</span>
                </div>
            </div>
        </div>
    `).join('');
    updateCartTotals();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartSidebar();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartSidebar();
}

function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const frete = parseFloat(localStorage.getItem('shippingCost') || '0');
    const total = subtotal + frete;
    
    const subtotalEl = document.getElementById('cart-subtotal');
    const freteEl = document.getElementById('cart-frete');
    const grandtotalEl = document.getElementById('cart-grandtotal');
    
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (freteEl) freteEl.textContent = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2)}`;
    if (grandtotalEl) grandtotalEl.textContent = `R$ ${total.toFixed(2)}`;
}

// ========== CALCULAR FRETE ==========
function calcularFrete(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) {
        document.getElementById('shipping-result').innerHTML = '<span style="color: red;">CEP inválido</span>';
        return;
    }
    
    // Simulação de cálculo de frete
    setTimeout(() => {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        let frete = 0;
        
        if (subtotal >= 50) {
            frete = 0;
            document.getElementById('shipping-result').innerHTML = '<span style="color: green;">Frete Grátis! 🎉</span>';
        } else {
            frete = 15.90;
            document.getElementById('shipping-result').innerHTML = '<span>Frete: R$ 15,90</span>';
        }
        
        localStorage.setItem('shippingCost', frete);
        updateCartTotals();
    }, 500);
}

// ========== CARRINHO SIDEBAR ==========
function openCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
}

function closeCartSidebar() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

// ========== TOAST NOTIFICATION ==========
function showToast(message) {
    let toast = document.querySelector('.toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-message';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== RENDERIZAR PRODUTOS ==========
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Nenhum produto encontrado</p>';
        return;
    }
    
    container.innerHTML = productsToRender.map(product => {
        const currentPrice = product.promoPrice || product.price;
        const hasPromo = product.promoPrice !== null;
        const ratingStars = '⭐'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        
        return `
            <div class="product-card">
                ${hasPromo ? '<span class="product-badge">Promoção</span>' : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${getCategoryName(product.category)}</p>
                    <div class="product-price">
                        R$ ${currentPrice.toFixed(2)}
                        ${hasPromo ? `<span class="product-price-old">R$ ${product.price.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-rating">${ratingStars}</div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Adicionar
                        </button>
                        <button class="btn-view" onclick="viewProduct(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getCategoryName(category) {
    const categories = {
        'buques': 'Buquês Românticos',
        'aniversario': 'Aniversário',
        'casamento': 'Casamento',
        'plantas': 'Plantas',
        'flores': 'Flores de Vaso',
        'presentes': 'Kits Presente'
    };
    return categories[category] || category;
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-detail-content');
    if (modal && content) {
        const currentPrice = product.promoPrice || product.price;
        content.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 12px; margin-bottom: 15px;">
            <h3>${product.name}</h3>
            <p><strong>Categoria:</strong> ${getCategoryName(product.category)}</p>
            <p><strong>Preço:</strong> R$ ${currentPrice.toFixed(2)}</p>
            <p><strong>Estoque:</strong> ${product.stock} unidades</p>
            <p><strong>Descrição:</strong> ${product.description}</p>
            <button class="btn-primary" style="margin-top: 15px;" onclick="addToCart(${product.id}); closeModal();">Adicionar ao Carrinho</button>
        `;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.remove('active');
}

// ========== FILTRAR PRODUTOS ==========
function filterProducts() {
    let filtered = [...products];
    
    // Filtro de categorias
    const selectedCategories = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
        .filter(cb => cb.value !== 'todos')
        .map(cb => cb.value);
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Filtro de preço
    const minPrice = parseFloat(document.getElementById('min-price-val')?.textContent || 0);
    const maxPrice = parseFloat(document.getElementById('max-price-val')?.textContent || 500);
    filtered = filtered.filter(p => (p.promoPrice || p.price) >= minPrice && (p.promoPrice || p.price) <= maxPrice);
    
    // Ordenação
    const sort = document.getElementById('sort-products')?.value || 'default';
    if (sort === 'price-asc') {
        filtered.sort((a, b) => (a.promoPrice || a.price) - (b.promoPrice || b.price));
    } else if (sort === 'price-desc') {
        filtered.sort((a, b) => (b.promoPrice || b.price) - (a.promoPrice || a.price));
    } else if (sort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    renderProducts(filtered, 'all-products-grid');
    
    const resultCount = document.getElementById('result-count');
    if (resultCount) {
        resultCount.textContent = `Mostrando ${filtered.length} de ${products.length} produtos`;
    }
}

// ========== FUNÇÕES DO ADMIN ==========
function renderAdminProducts() {
    const tbody = document.getElementById('admin-products-list');
    if (!tbody) return;
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn-view-product" onclick="viewProduct(${product.id})"><i class="fas fa-eye"></i></button>
                <button class="btn-edit" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
    
    const totalProducts = document.getElementById('total-products');
    if (totalProducts) totalProducts.textContent = products.length;
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Preencher formulário para edição
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-category').value = product.category;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-promo').value = product.promoPrice || '';
    document.getElementById('prod-stock').value = product.stock;
    document.getElementById('prod-description').value = product.description;
    
    // Mudar para tab de adicionar e indicar edição
    document.querySelector('[data-tab="add-product"]').click();
    
    // Armazenar ID para edição
    window.editingProductId = productId;
}

function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== productId);
        renderAdminProducts();
        renderProducts(products.slice(0, 8), 'featured-products');
        if (document.getElementById('all-products-grid')) {
            filterProducts();
        }
        showToast('Produto excluído com sucesso!');
    }
}

function addNewProduct(event) {
    if (event) event.preventDefault();
    
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('prod-name').value,
        category: document.getElementById('prod-category').value,
        price: parseFloat(document.getElementById('prod-price').value),
        promoPrice: document.getElementById('prod-promo').value ? parseFloat(document.getElementById('prod-promo').value) : null,
        stock: parseInt(document.getElementById('prod-stock').value),
        description: document.getElementById('prod-description').value,
        rating: 4,
        image: 'img/produto.png'
    };
    
    if (window.editingProductId) {
        // Editar produto existente
        const index = products.findIndex(p => p.id === window.editingProductId);
        if (index !== -1) {
            newProduct.id = window.editingProductId;
            products[index] = newProduct;
        }
        delete window.editingProductId;
        showToast('Produto atualizado com sucesso!');
    } else {
        // Adicionar novo produto
        products.push(newProduct);
        showToast('Produto adicionado com sucesso!');
    }
    
    renderAdminProducts();
    renderProducts(products.slice(0, 8), 'featured-products');
    if (document.getElementById('all-products-grid')) {
        filterProducts();
    }
    
    document.getElementById('admin-product-form').reset();
}

// ========== GRÁFICOS DO ADMIN ==========
function initCharts() {
    const salesCtx = document.getElementById('sales-chart')?.getContext('2d');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Vendas (R$ mil)',
                    data: [12, 19, 15, 25, 22, 30, 28, 35, 32, 40, 45, 50],
                    borderColor: '#2d6a4f',
                    backgroundColor: 'rgba(45, 106, 79, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
    
    const topCtx = document.getElementById('top-products-chart')?.getContext('2d');
    if (topCtx) {
        new Chart(topCtx, {
            type: 'bar',
            data: {
                labels: ['Buquê Romântico', 'Orquídea', 'Kit Aniversário', 'Girassol', 'Suculentas'],
                datasets: [{
                    label: 'Unidades Vendidas',
                    data: [45, 38, 32, 28, 25],
                    backgroundColor: '#ffb703',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

// ========== AUTENTICAÇÃO ==========
function initAuth() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email === 'admin@bellaflor.com' && password === 'admin123') {
                localStorage.setItem('userLogged', 'true');
                window.location.href = 'admin.html';
            } else if (email && password) {
                localStorage.setItem('userLogged', 'true');
                showToast('Login realizado com sucesso!');
                setTimeout(() => window.location.href = 'index.html', 1500);
            } else {
                showToast('Email ou senha inválidos');
            }
        });
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            if (password !== confirm) {
                showToast('As senhas não coincidem');
                return;
            }
            
            document.getElementById('success-modal').classList.add('active');
            setTimeout(() => {
                document.getElementById('success-modal').classList.remove('active');
                window.location.href = 'login.html';
            }, 2000);
        });
    }
}

function closeSuccessModal() {
    document.getElementById('success-modal')?.classList.remove('active');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// ========== CARROSSEL ==========
function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        document.querySelector('.carousel-slides').style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
    }
    
    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
    
    setInterval(nextSlide, 5000);
}

// ========== MENU MOBILE ==========
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// ========== ADMIN TABS ==========
function initAdminTabs() {
    const tabs = document.querySelectorAll('.admin-nav-item');
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.getElementById(`${target}-tab`).classList.add('active');
        });
    });
}

// ========== EVENT LISTENERS ==========
function initEventListeners() {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openCartSidebar();
    });
    
    const closeCartBtn = document.querySelector('.close-cart');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartSidebar);
    
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
    
    const calcShipping = document.getElementById('calc-shipping');
    if (calcShipping) {
        calcShipping.addEventListener('click', () => {
            const cep = document.getElementById('cep-input').value;
            calcularFrete(cep);
        });
    }
    
    const resetFilters = document.getElementById('reset-filters');
    if (resetFilters) {
        resetFilters.addEventListener('click', () => {
            document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => cb.checked = false);
            document.querySelector('.filter-group input[value="todos"]').checked = true;
            document.getElementById('price-min').value = 0;
            document.getElementById('price-max').value = 500;
            document.getElementById('min-price-val').textContent = 0;
            document.getElementById('max-price-val').textContent = 500;
            filterProducts();
        });
    }
    
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    if (priceMin && priceMax) {
        priceMin.addEventListener('input', () => {
            document.getElementById('min-price-val').textContent = priceMin.value;
            filterProducts();
        });
        priceMax.addEventListener('input', () => {
            document.getElementById('max-price-val').textContent = priceMax.value;
            filterProducts();
        });
    }
    
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) sortSelect.addEventListener('change', filterProducts);
    
    const categoryFilters = document.querySelectorAll('.filter-group input[type="checkbox"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            if (filter.value === 'todos' && filter.checked) {
                document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => {
                    if (cb.value !== 'todos') cb.checked = false;
                });
            } else if (filter.value !== 'todos' && filter.checked) {
                const todosCheckbox = document.querySelector('.filter-group input[value="todos"]');
                if (todosCheckbox) todosCheckbox.checked = false;
            }
            filterProducts();
        });
    });
    
    const adminForm = document.getElementById('admin-product-form');
    if (adminForm) adminForm.addEventListener('submit', addNewProduct);
    
    const logoutBtn = document.getElementById('logout-admin');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userLogged');
            window.location.href = 'login.html';
        });
    }
    
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('product-modal');
        if (e.target === modal) closeModal();
    });
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMobileMenu();
    initEventListeners();
    initAuth();
    initAdminTabs();
    
    if (document.getElementById('featured-products')) {
        renderProducts(products.slice(0, 8), 'featured-products');
    }
    
    if (document.getElementById('all-products-grid')) {
        renderProducts(products, 'all-products-grid');
        document.getElementById('result-count').textContent = `Mostrando ${products.length} de ${products.length} produtos`;
    }
    
    if (document.getElementById('admin-products-list')) {
        renderAdminProducts();
        initCharts();
    }
    
    updateCartCount();
    updateCartSidebar();
});

// Adicionar estilo do toast dinamicamente
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast-message {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 9999;
        transition: 0.3s ease;
        opacity: 0;
        font-weight: 500;
    }
    .toast-message.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(toastStyle);