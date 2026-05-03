// Este arquivo JavaScript contém a lógica para as páginas de login,
// cadastro, carrinho e o painel administrativo do E-commerce.

document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // Inicializar Carrinho
  // =========================
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();

  // Função para atualizar contador do carrinho
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Esconder badge se estiver vazio
      if (totalItems === 0) {
        cartCount.style.display = 'none';
      } else {
        cartCount.style.display = 'inline-block';
      }
    }
  }

  // Função para salvar carrinho
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }

  // =========================
  // Adicionar ao Carrinho
  // =========================
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const productName = this.getAttribute('data-product');
      const productPrice = parseFloat(this.getAttribute('data-price'));
      
      // Verificar se produto já está no carrinho
      const existingItem = cart.find(item => item.name === productName);
      
      if (existingItem) {
        existingItem.quantity++;
        showNotification(`${productName} quantidade atualizada!`, 'success');
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          quantity: 1
        });
        showNotification(`${productName} adicionado ao carrinho!`, 'success');
      }
      
      saveCart();
    });
  });

  // =========================
  // Sistema de Notificações
  // =========================
  function showNotification(message, type = 'success') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    
    // Estilizar notificação
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Poppins', sans-serif;
      animation: slideInRight 0.3s ease;
      cursor: pointer;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Clicar para remover
    notification.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    });
  }

  // Adicionar estilos de animação para notificações
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // =========================
  // Login
  // =========================
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const adminUser = 'admin';
      const adminPass = 'admin123';

      if (username === adminUser && password === adminPass) {
        loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
        loginMessage.className = 'mt-3 text-center text-success';

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userRole', 'admin');

        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 1500);
      } else {
        loginMessage.textContent = 'Usuário ou senha incorretos.';
        loginMessage.className = 'mt-3 text-center text-danger';
        showNotification('Usuário ou senha incorretos!', 'error');
      }
    });
  }

  // =========================
  // Cadastro
  // =========================
  const cadastroForm = document.getElementById('cadastroForm');
  const cadastroMessage = document.getElementById('cadastroMessage');

  if (cadastroForm) {
    cadastroForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const newUsername = document.getElementById('newUsername').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Validações
      if (nome.length < 3) {
        cadastroMessage.textContent = 'Nome deve ter pelo menos 3 caracteres.';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        cadastroMessage.textContent = 'Digite um e-mail válido.';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }

      if (newUsername.length < 4) {
        cadastroMessage.textContent = 'Usuário deve ter pelo menos 4 caracteres.';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }

      if (newPassword.length < 6) {
        cadastroMessage.textContent = 'Senha deve ter pelo menos 6 caracteres.';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }

      if (newPassword !== confirmPassword) {
        cadastroMessage.textContent = 'As senhas não coincidem.';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }

      // Salvar usuário (simulado)
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.find(u => u.username === newUsername || u.email === email);
      
      if (userExists) {
        cadastroMessage.textContent = 'Usuário ou e-mail já cadastrado!';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }
      
      users.push({
        nome: nome,
        email: email,
        username: newUsername,
        password: newPassword
      });
      
      localStorage.setItem('users', JSON.stringify(users));

      cadastroMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
      cadastroMessage.className = 'mt-3 text-center text-success';
      
      showNotification('Cadastro realizado com sucesso!', 'success');

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    });
  }

  // =========================
  // Painel Administrativo
  // =========================
  const menuToggle = document.getElementById('menu-toggle');
  const wrapper = document.getElementById('wrapper');
  const logoutAdmin = document.getElementById('logoutAdmin');

  if (wrapper && window.location.pathname.includes('admin.html')) {
    if (localStorage.getItem('userRole') !== 'admin') {
      alert('Acesso negado! Faça login como administrador.');
      window.location.href = 'login.html';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      wrapper.classList.toggle('toggled');
    });
  }

  if (logoutAdmin) {
    logoutAdmin.addEventListener('click', function (e) {
      e.preventDefault();

      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userRole');

      showNotification('Você foi desconectado!', 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }

  // =========================
  // Carrinho (Página)
  // =========================
  const cartLink = document.getElementById('cartLink');
  if (cartLink) {
    cartLink.addEventListener('click', function (e) {
      e.preventDefault();
      showCartModal();
    });
  }

  function showCartModal() {
    if (cart.length === 0) {
      showNotification('Seu carrinho está vazio!', 'error');
      return;
    }
    
    let cartHtml = '<div style="max-height: 400px; overflow-y: auto;">';
    let total = 0;
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      cartHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
          <div>
            <strong>${item.name}</strong><br>
            <small>R$ ${item.price.toFixed(2)} x ${item.quantity}</small>
          </div>
          <div>
            <span style="color: #e83e8c; font-weight: bold;">R$ ${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" style="margin-left: 10px; background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
    
    cartHtml += `
        <div style="padding: 15px; text-align: right; font-size: 1.2rem; font-weight: bold;">
          Total: R$ ${total.toFixed(2)}
        </div>
        <div style="padding: 15px; text-align: center;">
          <button onclick="checkout()" class="btn btn-primary" style="width: 100%;">Finalizar Compra</button>
        </div>
      </div>
    `;
    
    // Criar modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;
    
    modal.innerHTML = `
      <div style="background: white; border-radius: 15px; width: 90%; max-width: 500px; max-height: 80vh; overflow: auto;">
        <div style="padding: 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">Meu Carrinho</h3>
          <button onclick="this.closest('div').parentElement.remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>
        <div style="padding: 20px;">
          ${cartHtml}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Função global para remover do carrinho
  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    // Recarregar modal
    const modal = document.querySelector('div[style*="position: fixed"][style*="z-index: 10000"]');
    if (modal) {
      modal.remove();
      showCartModal();
    }
  };

  // Função global para finalizar compra
  window.checkout = function() {
    if (cart.length === 0) {
      showNotification('Carrinho vazio!', 'error');
      return;
    }
    
    showNotification('Compra finalizada com sucesso! Obrigado pela preferência!', 'success');
    cart = [];
    saveCart();
    
    // Fechar modal
    const modal = document.querySelector('div[style*="position: fixed"][style*="z-index: 10000"]');
    if (modal) {
      modal.remove();
    }
  };
});