document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // CARRINHO DE COMPRAS
  // =========================
  let cart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
  updateCartCount();

  function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }

  function saveCart() {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    updateCartCount();
  }

  function showNotification(message, type = 'success') {
    Swal.fire({
      title: type === 'success' ? '🍕 Adicionado!' : '⚠️ Atenção',
      text: message,
      icon: type,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }

  // Adicionar ao Carrinho
  document.querySelectorAll('.order-btn, .promo-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name: name, price: price, quantity: 1 });
      }
      saveCart();
      showNotification(`${name} adicionado ao carrinho!`);
    });
  });

  // Abrir Modal do Carrinho
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeModal = document.querySelector('.cart-modal-close');

  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderCartModal();
      cartModal.style.display = 'flex';
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });

  function renderCartModal() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p class="text-center text-muted">Seu carrinho está vazio 🍕</p>';
      cartTotalSpan.textContent = 'R$ 0,00';
      return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <h6>${item.name}</h6>
            <small>R$ ${item.price.toFixed(2)} x ${item.quantity}</small>
          </div>
          <div class="cart-item-actions">
            <button onclick="updateQuantity(${index}, -1)">➖</button>
            <span class="mx-2">${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">➕</button>
            <button onclick="removeItem(${index})" style="color: #dc3545;">🗑️</button>
          </div>
          <div><strong>R$ ${itemTotal.toFixed(2)}</strong></div>
        </div>
      `;
    });
    
    cartItemsDiv.innerHTML = html;
    cartTotalSpan.textContent = `R$ ${total.toFixed(2)}`;
  }

  window.updateQuantity = function(index, change) {
    if (cart[index].quantity + change <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity += change;
    }
    saveCart();
    renderCartModal();
  };

  window.removeItem = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartModal();
  };

  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      cart = [];
      saveCart();
      renderCartModal();
      showNotification('Carrinho limpo!', 'info');
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showNotification('Carrinho vazio! Adicione pizzas.', 'warning');
        return;
      }
      Swal.fire({
        title: '🍕 Finalizar Pedido!',
        html: `
          <p>Total: <strong>${document.getElementById('cartTotal').textContent}</strong></p>
          <p>Entraremos em contato em breve!</p>
        `,
        icon: 'success',
        confirmButtonColor: '#d9534f',
        confirmButtonText: 'Confirmar Pedido'
      }).then(() => {
        cart = [];
        saveCart();
        renderCartModal();
        cartModal.style.display = 'none';
      });
    });
  }

  // Newsletter
  const newsletterBtn = document.getElementById('newsletterBtn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const email = document.getElementById('newsletterEmail').value;
      if (email && email.includes('@')) {
        showNotification('Inscrito com sucesso! Ganhe 10% OFF na primeira compra!');
        document.getElementById('newsletterEmail').value = '';
      } else {
        showNotification('Digite um email válido!', 'warning');
      }
    });
  }

  // =========================
  // LOGIN
  // =========================
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const adminUser = "admin";
      const adminPass = "admin123";

      if (username === adminUser && password === adminPass) {
        loginMessage.textContent = "Login realizado com sucesso! Redirecionando...";
        loginMessage.className = "mt-3 text-center text-success";
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userRole", "admin");
        setTimeout(() => { window.location.href = "admin.html"; }, 1500);
      } else {
        loginMessage.textContent = "Usuário ou senha incorretos.";
        loginMessage.className = "mt-3 text-center text-danger";
      }
    });
  }

  // =========================
  // CADASTRO
  // =========================
  const cadastroForm = document.getElementById("cadastroForm");
  const cadastroMessage = document.getElementById("cadastroMessage");

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (newPassword !== confirmPassword) {
        cadastroMessage.textContent = "As senhas não coincidem.";
        cadastroMessage.className = "mt-3 text-center text-danger";
        return;
      }
      cadastroMessage.textContent = "Cadastro realizado com sucesso! Redirecionando...";
      cadastroMessage.className = "mt-3 text-center text-success";
      setTimeout(() => { window.location.href = "login.html"; }, 2000);
    });
  }

  // =========================
  // ADMIN
  // =========================
  const menuToggle = document.getElementById("menu-toggle");
  const wrapper = document.getElementById("wrapper");
  const logoutAdmin = document.getElementById("logoutAdmin");

  if (wrapper && window.location.pathname.includes("admin.html")) {
    if (localStorage.getItem("userRole") !== "admin") {
      alert("Acesso negado! Faça login como administrador.");
      window.location.href = "login.html";
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      wrapper.classList.toggle("toggled");
    });
  }

  if (logoutAdmin) {
    logoutAdmin.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userRole");
      window.location.href = "index.html";
    });
  }
});