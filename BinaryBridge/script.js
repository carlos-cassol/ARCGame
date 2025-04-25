    let levels = [];
      let currentLevel = 0;
      let binary = "";
      let position = -1;
      let chances = 3;
  
      function generateLevels() {
        levels = [];
        for (let i = 0; i < 10; i++) {
          levels.push(Math.floor(Math.random() * 32)); // 0 a 31 (5 bits)
        }
      }
  
      function startLevel() {
        const decimal = levels[currentLevel];
        binary = decimal.toString(2).padStart(5, '0');
        position = -1;
        chances = 3;
        document.getElementById("decimalValue").innerText = `Valor Decimal: ${decimal} | Chances restantes: ${chances}`;
        document.getElementById("level").innerText = `Fase: ${currentLevel + 1}`;
        document.getElementById("message").innerText = "";
        document.getElementById("victoryMessage").innerText = "";
        drawBridge();
      }
  
      function drawBridge(jumpOut = false) {
        const game = document.getElementById("game");
        game.innerHTML = "";
  
        const startTile = document.createElement("div");
        startTile.className = "tile";
        if (position === -1) {
          const player = document.createElement("div");
          player.className = "player";
          startTile.appendChild(player);
        }
        game.appendChild(startTile);
  
        for (let i = 0; i < binary.length; i++) {
          const tile = document.createElement("div");
          tile.className = "tile";
          if (i === position && !jumpOut) {
            const player = document.createElement("div");
            player.className = "player";
            tile.appendChild(player);
          }
          game.appendChild(tile);
        }
  
        if (jumpOut) {
          const lastTile = game.lastElementChild;
          const player = document.createElement("div");
          player.className = "player";
          lastTile.appendChild(player);
          document.getElementById("victoryMessage").innerText = "Vitória!";
          document.getElementById("victoryMessage").style.opacity = 1;
  
          setTimeout(() => {
            document.getElementById("victoryMessage").style.opacity = 0;
          }, 8000);
        }
      }
  
      function move(action) {
        if (position >= binary.length || chances <= 0) return;
  
        const nextPos = position + (action === 'forward' ? 1 : 2);
        const checkIndex = position + 1;
        const current = binary[checkIndex];
        const isOne = current === '1';
  
        if ((action === 'forward' && isOne) || (action === 'jump' && !isOne)) {
          position = nextPos;
  
          if (position >= binary.length) {
            drawBridge(true);
            document.getElementById("message").innerText = "Fase concluída!";
            setTimeout(() => {
              currentLevel++;
              if (currentLevel < levels.length) {
                startLevel();
              } else {
                document.getElementById("message").innerText = "Parabéns! Você venceu todas as fases!";
                document.getElementById("controls").style.display = "none";
              }
            }, 1500);
          } else {
            drawBridge();
          }
  
        } else {
          chances--;
          document.getElementById("message").innerText = `Movimento inválido! Chances restantes: ${chances}`;
          document.getElementById("decimalValue").innerText = `Valor Decimal: ${levels[currentLevel]} | Chances restantes: ${chances}`;
          if (chances <= 0) {
            document.getElementById("message").innerText = "Você perdeu! Reiniciando a fase...";
            setTimeout(() => {
              startLevel();
            }, 1500);
          }
        }
      }
  
      generateLevels();
      startLevel();