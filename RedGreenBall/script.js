const operadores = [
  { simbolo: "OR", nome: "OU", descricao: "É 1 se ao menos uma entrada for 1", funcao: (a, b) => a || b },
  { simbolo: "AND", nome: "E", descricao: "É 1 apenas se ambas as entradas forem 1", funcao: (a, b) => a && b },
  { simbolo: "XOR", nome: "OU Exclusivo", descricao: "É 1 se as entradas forem diferentes", funcao: (a, b) => a !== b },
  { simbolo: "NAND", nome: "NÃO E", descricao: "É o inverso da AND", funcao: (a, b) => !(a && b) },
  { simbolo: "NOR", nome: "NÃO OU", descricao: "É o inverso da OR", funcao: (a, b) => !(a || b) }
];

let faseAtual = 0;
let totalFases = 50;

function corAleatoria() {
  return Math.random() < 0.5 ? "red" : "green";
}

function gerarBolinhas() {
  const cor1 = corAleatoria();
  const cor2 = corAleatoria();
  const op = operadores[Math.floor(Math.random() * operadores.length)];

  document.getElementById("bolinha1").style.background = cor1;
  document.getElementById("bolinha2").style.background = cor2;
  document.getElementById("operador").innerText = op.simbolo;
  document.getElementById("pergunta").innerText = `Fase ${faseAtual + 1}/${totalFases}: Bola ${cor1.toUpperCase()} ${op.nome} Bola ${cor2.toUpperCase()} = ?`;
  document.getElementById("descricao").innerText = `📘 ${op.simbolo} (${op.nome}): ${op.descricao}`;
  document.getElementById("mensagem").innerText = "";

  const val1 = cor1 === "green";
  const val2 = cor2 === "green";
  window.respostaCorreta = op.funcao(val1, val2);
}

function responder(respostaUsuario) {
  if (respostaUsuario === window.respostaCorreta) {
    document.getElementById("mensagem").innerText = "✅ Acertou!";
    faseAtual++;
    if (faseAtual >= totalFases) {
      document.getElementById("mensagem").innerText = "🏆 Você completou todas as 50 fases!";
      faseAtual = 0;
      setTimeout(gerarBolinhas, 3000);
    } else {
      setTimeout(gerarBolinhas, 1500);
    }
  } else {
    document.getElementById("mensagem").innerText = "❌ Errou! Recomeçando...";
    faseAtual = 0;
    setTimeout(gerarBolinhas, 2000);
  }
}

window.onload = gerarBolinhas;
