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

const Cadastrar = async () => {
    if (emailCadastro.value == "" || senhaCadastro.value == "" || nomeCadastro.value == "" || dataNascimentoCadastro.value == "" || confirmSenha.value == "") {
        alert("Algum dos dados em CADASTRO estão vazios!");
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
        "logged": false,
        "remember": false
    }

    await fetch(api + "/contas", {
        method: "POST",
        body: JSON.stringify(cadastro),
        headers: {
            "Content-Type": "application/json",
        },
    });

    confirm("Cadastrado com sucesso!");
    window.history.back();

    emailCadastro.value = "";
    nomeCadastro.value = "";
    dataNascimentoCadastro.value = "";
    senhaCadastro.value = "";
    confirmSenha.value = "";
}

var inputsCadastro = document.querySelectorAll('.emailPassCadastro');
for (let element of inputsCadastro) {
    element.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            cadastrar();
        }
    })
}