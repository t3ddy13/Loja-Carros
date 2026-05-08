let utilizador = null;

// CARRINHO (contador)
let carrinhoCount = 0;


// VERIFICAR LOGIN
function estaLogado() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user && user.id;
}


// MOSTRAR NOME NO HEADER + CARRINHO
document.addEventListener("DOMContentLoaded", () => {

    let user = JSON.parse(localStorage.getItem("user"));

    // nome no header
    if (user && user.nome) {
        let el = document.getElementById("userName");
        if (el) el.innerText = `Bem-vindo, ${user.nome}`;
    }

    // carrinho badge
    atualizarCarrinhoUI();
});


// ATUALIZAR CARRINHO NA UI
function atualizarCarrinhoUI() {

    let badge = document.getElementById("cartCount");

    if (!badge) return;

    if (carrinhoCount > 0) {
        badge.style.display = "inline-block";
        badge.innerText = carrinhoCount;
    } else {
        badge.style.display = "none";
    }
}


// REGISTAR
function registar() {

    let nome = document.querySelector("#reg input[placeholder='Nome']").value.trim();
    let email = document.querySelector("#reg input[placeholder='Email']").value.trim();
    let telefone = document.querySelector("#reg input[placeholder='Telefone']").value.trim();
    let endereco = document.querySelector("#reg input[placeholder='Endereço']").value.trim();
    let senha = document.querySelector("#reg input[placeholder='Senha']").value.trim();

    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
        alert("Email inválido!");
        return;
    }

    if (!nome || !email || !telefone || !endereco || !senha) {
        alert("Preenche todos os campos!");
        return;
    }

    fetch("http://localhost:3000/registar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, endereco, senha })
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "ok") {
            alert("Conta criada com sucesso!");
            document.querySelectorAll("#reg input").forEach(i => i.value = "");
        } else {
            alert("Erro no registo");
        }

    })
    .catch(() => alert("Erro de ligação ao servidor"));
}


// LOGIN (PERSISTENTE)
function login() {

    let email = document.querySelector("#login input[placeholder='Email']").value.trim();
    let senha = document.querySelector("#login input[placeholder='Senha']").value.trim();

    if (!email || !senha) {
        alert("Preenche email e senha!");
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "ok") {

            utilizador = {
                id: data.id,
                nome: data.nome
            };

            localStorage.setItem("user", JSON.stringify(utilizador));

            // vai para cliente e mantém login
            window.location.href = "cliente.html";

        } else {
            alert("Email ou senha inválidos");
        }

    })
    .catch(() => alert("Erro de ligação ao servidor"));
}


// LOGOUT
function logout() {
    localStorage.removeItem("user");
    carrinhoCount = 0;
    window.location.href = "index.html";
}


// COMPRA DE CARRO + CARRINHO
function comprarCarro(id_carro, valor) {

    if (!estaLogado()) {
        alert("Tens de iniciar sessão primeiro!");
        return;
    }

    let user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3000/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_cliente: user.id,
            id_carro: id_carro,
            valor: valor
        })
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "ok") {

            alert("Carro adicionado!");

            // aumenta carrinho
            carrinhoCount++;
            atualizarCarrinhoUI();

        } else {
            alert("Erro na compra");
        }

    })
    .catch(() => alert("Erro de ligação ao servidor"));
}