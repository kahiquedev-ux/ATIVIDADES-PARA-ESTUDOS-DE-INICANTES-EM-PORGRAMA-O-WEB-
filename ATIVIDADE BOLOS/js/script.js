// Este arquivo JavaScript contém a lógica para as páginas de login,
// cadastro e o painel administrativo.

document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // Lógica para a página de Login
  // =========================
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Previne o envio padrão do formulário

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Credenciais fixas para demonstração
      const adminUser = 'admin';
      const adminPass = 'admin123';

      if (username === adminUser && password === adminPass) {

        // Login bem-sucedido
        loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
        loginMessage.className = 'mt-3 text-center text-success'; // Muda para cor verde

        // Armazena um token simples no localStorage para simular a sessão
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userRole', 'admin');

        window.location.href = 'admin.html'; // Redireciona para o painel admin

      } else {

        // Login falhou
        loginMessage.textContent = 'Usuário ou senha incorretos.';
        loginMessage.className = 'mt-3 text-center text-danger'; // Cor vermelha para erro
      }
    });
  }

  // =========================
  // Lógica para a página de Cadastro
  // =========================
  const cadastroForm = document.getElementById('cadastroForm');
  const cadastroMessage = document.getElementById('cadastroMessage');

  if (cadastroForm) {
    cadastroForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Previne o envio padrão do formulário

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const newUsername = document.getElementById('newUsername').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (newPassword !== confirmPassword) {
        cadastroMessage.textContent = 'As senhas não coincidem.';
        cadastroMessage.className = 'mt-3 text-center text-danger';
        return;
      }

      // Simulação de cadastro bem-sucedido (sem persistência real)
      cadastroMessage.textContent = 'Cadastro realizado com sucesso! Você já pode fazer login.';
      cadastroMessage.className = 'mt-3 text-center text-success';

      // Em um sistema real, aqui você enviaria os dados para um servidor.
      // Por enquanto, apenas limpamos o formulário.
      cadastroForm.reset();

      // Opcional: redirecionar para a página de login após um tempo
      // setTimeout(() => { window.location.href = 'login.html'; }, 3000);
    });
  }

  // =========================
  // Lógica para o Painel Administrativo
  // =========================
  const menuToggle = document.getElementById('menu-toggle');
  const wrapper = document.getElementById('wrapper');
  const logoutAdmin = document.getElementById('logoutAdmin');

  // Verifica se o usuário está logado ao carregar a página admin.html
  if (wrapper && localStorage.getItem('userRole') !== 'admin') {
    alert('Acesso negado! Faça login como administrador.');
    window.location.href = 'login.html'; // Redireciona para login
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      wrapper.classList.toggle('toggled'); // Mostra/esconde sidebar
    });
  }

  if (logoutAdmin) {
    logoutAdmin.addEventListener('click', function (e) {
      e.preventDefault();

      localStorage.removeItem('loggedIn'); // Remove o status de login
      localStorage.removeItem('userRole'); // Remove a role do usuário

      alert('Você foi desconectado.');
      window.location.href = 'index.html'; // Redireciona para a página inicial
    });
  }

});