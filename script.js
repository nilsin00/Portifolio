var botaoTema = document.getElementById("botao-tema");

function mudarTema() {
  document.body.classList.toggle("claro");

  if (document.body.classList.contains("claro")) {
    botaoTema.textContent = "Tema escuro";
    localStorage.setItem("tema", "claro");
  } else {
    botaoTema.textContent = "Tema claro";
    localStorage.setItem("tema", "escuro");
  }
}

botaoTema.addEventListener("click", mudarTema);

if (localStorage.getItem("tema") == "claro") {
  document.body.classList.add("claro");
  botaoTema.textContent = "Tema escuro";
}

document.getElementById("ano").textContent = new Date().getFullYear();

var nivel = 1;
var xp = 0;

if (localStorage.getItem("nivel")) {
  nivel = Number(localStorage.getItem("nivel"));
  xp = Number(localStorage.getItem("xp"));
}

function atualizarXp() {
  document.getElementById("nivel").textContent = "Nível " + nivel;
  document.getElementById("barra-xp").style.width = xp + "%";
}

function ganharXp() {
  xp = xp + 20;

  if (xp >= 100) {
    xp = 0;
    nivel = nivel + 1;
    document.getElementById("msg-xp").textContent = "Subiu de nível! Agora você está no nível " + nivel + ".";
  } else {
    document.getElementById("msg-xp").textContent = "+20 XP! Faltam " + (100 - xp) + " pra subir de nível.";
  }

  localStorage.setItem("nivel", nivel);
  localStorage.setItem("xp", xp);
  atualizarXp();
}

atualizarXp();

var botaoXp = document.getElementById("botao-xp");
if (botaoXp) {
  botaoXp.addEventListener("click", ganharXp);
}

var fraseMudando = document.getElementById("frase-mudando");

if (fraseMudando) {
  var frases = [
    "estudante",
    "gamer",
    "programador em início de carreira",
    "muito família"
  ];
  var posicao = 0;

  setInterval(function () {
    posicao = posicao + 1;
    if (posicao == frases.length) {
      posicao = 0;
    }
    fraseMudando.textContent = frases[posicao];
  }, 2000);
}

var formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var mensagem = document.getElementById("mensagem");
    var aviso = document.getElementById("aviso");
    var tudoCerto = true;

    nome.classList.remove("erro");
    email.classList.remove("erro");
    mensagem.classList.remove("erro");

    if (nome.value.trim() == "") {
      nome.classList.add("erro");
      tudoCerto = false;
    }

    if (email.value.indexOf("@") == -1) {
      email.classList.add("erro");
      tudoCerto = false;
    }

    if (mensagem.value.trim() == "") {
      mensagem.classList.add("erro");
      tudoCerto = false;
    }

    if (tudoCerto == false) {
      aviso.textContent = "Preencha todos os campos direito.";
      return;
    }

    aviso.textContent = "Obrigado, " + nome.value + "! Abrindo seu e-mail...";

    var assunto = encodeURIComponent("Contato pelo portfólio");
    var texto = encodeURIComponent("Nome: " + nome.value + "\nE-mail: " + email.value + "\n\n" + mensagem.value);
    window.location.href = "mailto:nilsonknuppgrechi@gmail.com?subject=" + assunto + "&body=" + texto;

    formulario.reset();
  });
}