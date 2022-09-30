// npm install -g json-server
// json-server --watch ./database/contas.json --port 5000

// Códigos error ps1:
// set-ExecutionPolicy RemoteSigned -Scope CurrentUser
// Get-ExecutionPolicy
// Get-ExecutionPolicy -list

const port = "5000"
const api = `http://localhost:${port}`;

const emailLogin = document.querySelector(".input_login");
const passLogin = document.querySelector(".input_senha");
const check = document.querySelector("#remember");

const SetLogin = () => {
    let localLogin = JSON.parse(localStorage.getItem("login"));

    if (localLogin === null) {
        return;
    } else {
        emailLogin.value = localLogin[0] ?? "";
        passLogin.value = localLogin[1] ?? "";
        check.checked = localLogin[2] ?? "";
    }
}

SetLogin();

const VerificarLogin = async (emailVerif) => {
    const data = await fetch(api + "/contas")
        .then(response => response.json());

    if (data.length === 0) {
        alert('Nenhum usuário cadastrado.')
        return
    }

    let account = data.filter(element => {
        const { email } = element;
        if (emailVerif === email) {
            return element;
        } else {
            return;
        }
    })
    
    if (account[0] === undefined) {
        alert("Email não cadastrado.");
    }

    return account[0];
}

const Logar = async () => {

    if (emailLogin.value == "" || passLogin.value == "") {
        alert("Algum dos dados do LOGIN estão vazios, verifique!");
        return
    }

    const infoLogin = await VerificarLogin(emailLogin.value);
    if (infoLogin === undefined) {
        return;
    }

    if (passLogin.value !== infoLogin.password) {
        alert("Senha incorreta, tente novamente!");
        passLogin.value = "";
        return;
    } else if (emailLogin.value !== infoLogin.email) {
        alert("Email digitado não identificado, tente novamente!");
        emailLogin.value = "";
        return;
    } else {

        if (check.checked) {
            localStorage.setItem("login", JSON.stringify([emailLogin.value, passLogin.value, check.checked]))
        } else localStorage.clear();

        alert("Usuário LOGADO com sucesso!");
        window.location.href = "/Pages/Tela_Principal/index.html";
        return;
    }
}

var inputsLogin = document.querySelectorAll('.emailPassLogin');
for (let element of inputsLogin) {
    element.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            Logar();
        }
    })
}