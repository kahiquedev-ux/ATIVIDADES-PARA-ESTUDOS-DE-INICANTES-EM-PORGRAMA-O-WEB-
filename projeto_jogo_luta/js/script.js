document.addEventListener("DOMContentLoaded", function () {

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

        setTimeout(() => {
          window.location.href = "admin.html";
        }, 1500);
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

      const nome = document.getElementById("nome")?.value;
      const email = document.getElementById("email")?.value;
      const newUsername = document.getElementById("newUsername")?.value;
      const newPassword = document.getElementById("newPassword")?.value;
      const confirmPassword = document.getElementById("confirmPassword")?.value;

      if (newPassword !== confirmPassword) {
        cadastroMessage.textContent = "As senhas não coincidem.";
        cadastroMessage.className = "mt-3 text-center text-danger";
        return;
      }

      cadastroMessage.textContent = "Cadastro realizado com sucesso! Redirecionando para o login...";
      cadastroMessage.className = "mt-3 text-center text-success";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
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

  // =========================
  // JOGO DE LUTA REAL
  // =========================
  
  // Verificar se estamos na página do jogo
  if (document.querySelector('.battle-arena')) {
    initFightingGame();
  }

  function initFightingGame() {
    let playerHealth = 100;
    let enemyHealth = 100;
    let isAttacking = false;
    let isGameOver = false;
    let playerX = 0;
    let enemyX = 0;
    let playerPosition = 50;
    let enemyPosition = 50;
    
    const playerElement = document.getElementById('player');
    const enemyElement = document.getElementById('enemy');
    const playerHpText = document.getElementById('playerHp');
    const enemyHpText = document.getElementById('enemyHp');
    const playerHpBar = document.querySelector('.player-hp');
    const enemyHpBar = document.querySelector('.enemy-hp');
    const combatLog = document.getElementById('combatLog');
    const combatEffects = document.getElementById('combatEffects');
    const resetButton = document.getElementById('resetBattle');
    
    function addLog(message, type = 'info') {
      const logDiv = document.createElement('div');
      const icon = type === 'damage' ? '💥' : (type === 'special' ? '⚡' : '🔹');
      logDiv.innerHTML = `${icon} ${message}`;
      combatLog.appendChild(logDiv);
      combatLog.scrollTop = combatLog.scrollHeight;
      
      // Limitar logs antigos
      while (combatLog.children.length > 20) {
        combatLog.removeChild(combatLog.firstChild);
      }
    }
    
    function createDamageNumber(target, damage) {
      const damageNum = document.createElement('div');
      damageNum.className = 'damage-number';
      damageNum.textContent = `-${damage}`;
      
      const rect = target.getBoundingClientRect();
      const arenaRect = document.querySelector('.battle-arena').getBoundingClientRect();
      
      damageNum.style.position = 'absolute';
      damageNum.style.left = (rect.left - arenaRect.left + rect.width / 2) + 'px';
      damageNum.style.top = (rect.top - arenaRect.top + 50) + 'px';
      
      combatEffects.appendChild(damageNum);
      
      setTimeout(() => {
        damageNum.remove();
      }, 1000);
    }
    
    function shakeElement(element) {
      element.classList.add('shake');
      setTimeout(() => {
        element.classList.remove('shake');
      }, 300);
    }
    
    function hitFlash(element) {
      const fighter = element.querySelector('.fighter-sprite');
      fighter.classList.add('hit-flash');
      setTimeout(() => {
        fighter.classList.remove('hit-flash');
      }, 200);
    }
    
    function updateHealthBars() {
      playerHpBar.style.width = playerHealth + '%';
      enemyHpBar.style.width = enemyHealth + '%';
      playerHpText.textContent = Math.max(0, playerHealth);
      enemyHpText.textContent = Math.max(0, enemyHealth);
      
      // Mudar cor da barra baseado na vida
      if (playerHealth < 30) {
        playerHpBar.style.background = 'linear-gradient(90deg, #ff0000, #cc0000)';
      } else {
        playerHpBar.style.background = 'linear-gradient(90deg, #00ff00, #ff0000)';
      }
      
      if (enemyHealth < 30) {
        enemyHpBar.style.background = 'linear-gradient(90deg, #ff0000, #cc0000)';
      } else {
        enemyHpBar.style.background = 'linear-gradient(90deg, #00ff00, #ff0000)';
      }
    }
    
    function checkGameOver() {
      if (playerHealth <= 0 && !isGameOver) {
        isGameOver = true;
        addLog('💀 VOCÊ FOI DERROTADO! GAME OVER! 💀', 'damage');
        Swal.fire({
          title: '💀 DERROTA! 💀',
          text: 'Você foi derrotado na arena! Quer tentar novamente?',
          icon: 'error',
          background: '#1a1a2e',
          color: 'white',
          confirmButtonColor: '#ff0000',
          confirmButtonText: 'Revanche!',
          showCancelButton: true,
          cancelButtonText: 'Sair'
        }).then((result) => {
          if (result.isConfirmed) {
            resetBattle();
          } else {
            window.location.href = '#personagens';
          }
        });
        return true;
      } else if (enemyHealth <= 0 && !isGameOver) {
        isGameOver = true;
        addLog('🏆 VITÓRIA! Você derrotou o inimigo! 🏆', 'special');
        Swal.fire({
          title: '🏆 VITÓRIA! 🏆',
          text: 'Parabéns! Você venceu a batalha!',
          icon: 'success',
          background: '#1a1a2e',
          color: 'white',
          confirmButtonColor: '#ff0000',
          confirmButtonText: 'Nova Batalha!'
        }).then(() => {
          resetBattle();
        });
        return true;
      }
      return false;
    }
    
    function playerAttack(damage, attackName) {
      if (isAttacking || isGameOver) return false;
      isAttacking = true;
      
      // Animação de ataque
      playerElement.style.transform = 'translateX(30px)';
      setTimeout(() => {
        playerElement.style.transform = 'translateX(0)';
      }, 150);
      
      shakeElement(enemyElement);
      hitFlash(enemyElement);
      
      const actualDamage = Math.floor(damage * (Math.random() * 0.3 + 0.85));
      enemyHealth = Math.max(0, enemyHealth - actualDamage);
      updateHealthBars();
      createDamageNumber(enemyElement, actualDamage);
      addLog(`🎯 Você usou ${attackName}! Causou ${actualDamage} de dano!`, 'damage');
      
      setTimeout(() => {
        isAttacking = false;
        if (!checkGameOver()) {
          setTimeout(() => enemyAttack(), 500);
        }
      }, 500);
      
      return true;
    }
    
    function enemyAttack() {
      if (isAttacking || isGameOver) return;
      
      const attacks = [
        { name: 'Golpe Pesado', damage: 15, min: 12, max: 20 },
        { name: 'Investida', damage: 10, min: 8, max: 15 },
        { name: 'Golpe Rápido', damage: 8, min: 5, max: 12 }
      ];
      
      const attack = attacks[Math.floor(Math.random() * attacks.length)];
      const actualDamage = Math.floor(attack.damage * (Math.random() * 0.3 + 0.85));
      
      isAttacking = true;
      
      enemyElement.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        enemyElement.style.transform = 'translateX(0)';
      }, 150);
      
      shakeElement(playerElement);
      hitFlash(playerElement);
      
      playerHealth = Math.max(0, playerHealth - actualDamage);
      updateHealthBars();
      createDamageNumber(playerElement, actualDamage);
      addLog(`👊 Inimigo usou ${attack.name}! Você perdeu ${actualDamage} de vida!`, 'damage');
      
      setTimeout(() => {
        isAttacking = false;
        checkGameOver();
      }, 500);
    }
    
    function resetBattle() {
      playerHealth = 100;
      enemyHealth = 100;
      isAttacking = false;
      isGameOver = false;
      updateHealthBars();
      
      // Limpar logs
      combatLog.innerHTML = '';
      addLog('⚔️ A BATALHA RECOMEÇOU! ⚔️', 'special');
      addLog('🔹 Use ESPAÇO para socar!', 'info');
      addLog('🔹 Use ENTER para chutar!', 'info');
      addLog('🔹 Use as setas para se mover!', 'info');
      
      // Limpar efeitos
      combatEffects.innerHTML = '';
    }
    
    // Controles do teclado
    document.addEventListener('keydown', (e) => {
      if (isGameOver) return;
      
      switch(e.key) {
        case ' ':
        case 'Space':
          e.preventDefault();
          playerAttack(18, 'Soco Poderoso');
          break;
        case 'Enter':
          e.preventDefault();
          playerAttack(22, 'Chute Giratório');
          break;
        case 'ArrowRight':
          e.preventDefault();
          playerPosition = Math.min(70, playerPosition + 10);
          playerElement.style.transform = `translateX(${playerPosition - 50}px)`;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          playerPosition = Math.max(30, playerPosition - 10);
          playerElement.style.transform = `translateX(${playerPosition - 50}px)`;
          break;
        case 'ArrowUp':
          e.preventDefault();
          playerElement.style.transform += 'translateY(-20px)';
          setTimeout(() => {
            playerElement.style.transform = `translateX(${playerPosition - 50}px)`;
          }, 300);
          break;
      }
    });
    
    if (resetButton) {
      resetButton.addEventListener('click', resetBattle);
    }
    
    // Adicionar efeito de pulo
    addLog('⚔️ A BATALHA COMEÇOU! ⚔️', 'special');
    addLog('🔹 Aperte ESPAÇO para socar!', 'info');
    addLog('🔹 Aperte ENTER para chutar!', 'info');
    addLog('🔹 Use as setas ← → para mover', 'info');
    addLog('🔹 Use ↑ para pular', 'info');
    
    updateHealthBars();
  }
});