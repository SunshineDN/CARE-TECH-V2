const result = document.querySelector(".result");
const title = document.title;

let segundos = 4;

let intervalo = setInterval(Contar ,1000);

function Contar() {
    result.textContent = segundos;
    segundos--;
    if (segundos < 0) {
        clearInterval(intervalo);
        console.log("Terminou");
        window.location.href = "/Tela_Inicial/index.html";
    }
}