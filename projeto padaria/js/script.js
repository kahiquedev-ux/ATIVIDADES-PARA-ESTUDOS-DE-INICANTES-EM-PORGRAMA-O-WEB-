document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // CARRINHO DE COMPRAS LATERAL
  // =========================
  let cart = JSON.parse(localStorage.getItem('padariaCart')) || [];
  
  function saveCart() {
    localStorage.setItem('padariaCart', JSON.stringify(cart));
    updateCartUI();
  }
  
  function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const sidebarCartTotal = document.getElementById('sidebarCartTotal');
    
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
    
    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = `
          <div class="empty-cart">
            <i class="fas fa-shopping-basket"></i>
            <p>Seu carrinho está vazio</p>
            <small>Adicione produtos clicando em "Adicionar"</small>
          </div>
        `;
        if (sidebarCartTotal) sidebarCartTotal.textContent = 'R$ 0,00';
        return;
      }
      
      let html = '';
      let total = 0;
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
          <div class="cart-item">
            <img src="${item.img || './img/logo.png'}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
              <h5>${item.name}</h5>
              <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                <button class="cart-item-remove" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
            <div class="cart-item-total"><strong>R$ ${itemTotal.toFixed(2)}</strong></div>
          </div>
        `;
      });
      cartItemsList.innerHTML = html;
      if (sidebarCartTotal) sidebarCartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
  }
  
  window.updateQuantity = function(index, change) {
    if (cart[index].quantity + change <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity += change;
    }
    saveCart();
  };
  
  window.removeItem = function(index) {
    cart.splice(index, 1);
    saveCart();
  };
  
  function addToCart(name, price, img = './img/logo.png') {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1, img });
    }
    saveCart();
    
    Swal.fire({
      icon: 'success',
      title: 'Adicionado!',
      text: `${name} foi adicionado ao carrinho`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }
  
  // Eventos de adicionar ao carrinho
  document.querySelectorAll('.btn-add-cart, .btn-promo-add').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      addToCart(name, price);
    });
  });
  
  // Sidebar Carrinho
  const cartSidebarBtn = document.getElementById('cartSidebarBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const closeSidebarBtn = document.getElementById('closeSidebarBtn');
  
  if (cartSidebarBtn) {
    cartSidebarBtn.addEventListener('click', () => {
      cartSidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });
  }
  
  function closeSidebar() {
    cartSidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }
  
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
  
  // Finalizar pedido
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        Swal.fire('Carrinho Vazio', 'Adicione produtos ao carrinho primeiro!', 'warning');
        return;
      }
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      Swal.fire({
        title: '🍞 Pedido Realizado!',
        html: `<p>Total: <strong>R$ ${total.toFixed(2)}</strong></p><p>Entraremos em contato em breve para confirmar!</p>`,
        icon: 'success',
        confirmButtonColor: '#D2691E',
        confirmButtonText: 'OK'
      }).then(() => {
        cart = [];
        saveCart();
        closeSidebar();
      });
    });
  }
  
  // Limpar carrinho
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Limpar Carrinho?',
        text: 'Todos os itens serão removidos!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Sim, limpar!'
      }).then((result) => {
        if (result.isConfirmed) {
          cart = [];
          saveCart();
          Swal.fire('Carrinho limpo!', '', 'success');
        }
      });
    });
  }
  
  // Newsletter
  const newsletterBtn = document.getElementById('newsletterBtn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const email = document.getElementById('newsletterEmail').value;
      if (email && email.includes('@') && email.includes('.')) {
        Swal.fire('Inscrito!', 'Ganhe 10% OFF na primeira compra!', 'success');
        document.getElementById('newsletterEmail').value = '';
      } else {
        Swal.fire('Email inválido', 'Digite um email válido!', 'error');
      }
    });
  }
  
  // Formulário de contato
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      Swal.fire('Mensagem Enviada!', 'Entraremos em contato em breve!', 'success');
      contactForm.reset();
    });
  }
  
  // Smooth scroll para links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  updateCartUI();
  
  // =========================
  // LOGIN
  // =========================
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userRole", "admin");
        window.location.href = "admin.html";
      } else {
        if (loginMessage) loginMessage.textContent = "Usuário ou senha incorretos.";
      }
    });
  }
  
  // =========================
  // CADASTRO
  // =========================
  const cadastroForm = document.getElementById("cadastroForm");
  const cadastroMessage = document.getElementById("cadastroMessage");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (newPassword !== confirmPassword) {
        if (cadastroMessage) cadastroMessage.textContent = "As senhas não coincidem.";
        return;
      }
      if (cadastroMessage) cadastroMessage.textContent = "Cadastro realizado com sucesso!";
      setTimeout(() => window.location.href = "login.html", 1500);
    });
  }
  
  // =========================
  // ADMIN
  // =========================
  const menuToggle = document.getElementById("menu-toggle");
  const wrapper = document.getElementById("wrapper");
  const logoutAdmin = document.getElementById("logoutAdmin");
  
  if (wrapper && window.location.pathname.includes("admin.html")) {
    if (localStorage.getItem("userRole") !== "admin") window.location.href = "login.html";
  }
  
  if (menuToggle) {
    menuToggle.addEventListener("click", function(e) {
      e.preventDefault();
      wrapper.classList.toggle("toggled");
    });
  }
  
  if (logoutAdmin) {
    logoutAdmin.addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
  
  // Animação de números (admin)
  function animateNumber(element, end, duration = 2000) {
    if (!element) return;
    let start = 0, startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  
  // Simular atividades em tempo real
  setInterval(() => {
    const activities = document.getElementById('activitiesFeed');
    if (activities && window.location.pathname.includes('admin.html')) {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}`;
      const newActivity = document.createElement('div');
      newActivity.className = 'activity-item';
      newActivity.innerHTML = `<strong>🛒 Novo Pedido</strong><span class="activity-time float-end">agora</span><p class="mb-0">Pedido #00${Math.floor(Math.random()*100)} realizado</p>`;
      activities.insertBefore(newActivity, activities.firstChild);
      while (activities.children.length > 6) activities.removeChild(activities.lastChild);
    }
  }, 30000);
});