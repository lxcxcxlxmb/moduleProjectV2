const api = 'http://localhost:3000/'

async function auth() {
    let formData = getFormData();
    let authorization = formData.username + ':' + formData.password;
    let base64 = btoa(authorization);

    let headers = new Headers({
        authorization: "Basic " + base64
    });

    let options = {
        headers: headers,
        method: 'GET',
        cache: 'no-store'
    }

    let url = api + 'auth';
    const response = await fetch(url, options);
    const usuario = await response.json();

    if (usuario != null) {
        localStorage.setItem('logado', JSON.stringify(usuario));
        alert('Login efetuado com sucesso.');
        window.location.reload();
    } else {
        alert('Nn rolou fi.');
    };

    console.log(usuario);
};

function setLogado(usuario) {
    localStorage.setItem('logado', JSON.stringify(usuario));
    return true;
}

function getLogado() {
    return JSON.parse(localStorage.getItem('logado'));
};

async function verify() {
    let logado = getLogado();

    if (logado == null) {
        return;
    }

    let authorization = logado.email + ':' + logado.senha;
    let base64 = btoa(authorization);

    let headers = new Headers({
        authorization: "Basic " + base64
    });

    let options = {
        headers: headers,
        method: 'GET',
        cache: 'no-store'
    }

    let url = api + 'verify';
    const response = await fetch(url, options);
    const usuario = await response.json();

    if (usuario) {
        // document.body.innerHTML = 'Bem vindo(a), ' + logado.nome;
        // document.body.innerHTML += '<br>';
        // document.body.innerHTML += '<a href="/login.html" onclick="out()">Sair</a>';
        window.location.href = "home.html";
    };
};

function out() {
    localStorage.removeItem('logado');
    // window.location.reload;
}

function getFormData() {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let dados = Object.fromEntries(formData);
    return dados;
};

verify();