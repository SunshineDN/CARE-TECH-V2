// npm install -g json-server
// json-server --watch ./database/contas.json --port 5000

// Códigos error ps1:
// set-ExecutionPolicy RemoteSigned -Scope CurrentUser
// Get-ExecutionPolicy
// Get-ExecutionPolicy -list

const port = "5000"
const api = `http://localhost:${port}`;

const nomeCadastro = document.querySelector(".input_nome");
const emailCadastro = document.querySelector(".input_email");
const dataNascimentoCadastro = document.querySelector(".input_data_nascimento");
const senhaCadastro = document.querySelector(".input_senha");
const confirmSenha = document.querySelector(".input_confirmar_senha");




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

const Cadastrar = async () => {
    console.log(emailCadastro.value)
    if (emailCadastro.value == "" || senhaCadastro.value == "" || nomeCadastro.value == "" || dataNascimentoCadastro.value == "" || confirmSenha.value == "") {
        alert("Algum dos dados em CADASTRO estão vazios!");
        return
    } else if (await VerificarEmail(emailCadastro.value) != false) {
        alert("Email já cadastrado!");
        return
    } else if (senhaCadastro.value == emailCadastro.value || senhaCadastro.value == nomeCadastro.value) {
        alert("A senha não pode ser idêntica ao email ou nome utilizado!");
        return
    }

    if (confirmSenha.value !== senhaCadastro.value) {
        alert("As senhas não batem! Coloque-as corretamente.");
        return;
    }

    const apiLen = await fetch(api + "/contas")
        .then(response => response.json())
        .then(data => { console.log(data); return data });

    const cadastro = {
        "id": apiLen.length + 1,
        "email": emailCadastro.value,
        "name": nomeCadastro.value,
        "birthDate": dataNascimentoCadastro.value,
        "password": senhaCadastro.value,
    }

    alert("Cadastrado com sucesso! Você será redirecionado à página inicial.");

    await fetch(api + "/contas", {
        method: "POST",
        body: JSON.stringify(cadastro),
        headers: {
            "Content-Type": "application/json",
        },
    });

    window.location.href = "/Tela_Inicial/index.html";
}

var inputsCadastro = document.querySelectorAll('.emailPassCadastro');
for (let element of inputsCadastro) {
    element.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            Cadastrar();
        }
    })
}