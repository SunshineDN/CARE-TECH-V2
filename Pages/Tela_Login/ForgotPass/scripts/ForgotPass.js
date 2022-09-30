const port = "5000"
const api = `http://localhost:${port}`;

const form = document.querySelector(".form");

const VerificarEmail = async (emailVerif) => {
    const data = await fetch(api + "/contas")
        .then(res => res.json());
    let verify = false;
    for (let contas of data) {
        const { email } = contas;
        if (emailVerif === email) {
            verify = true;
            break;
        }
    }
    return verify;
}

const Enviar = async () => {
    window.location.href = "./Congrats/index.html"
}