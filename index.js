var url = "https://akicursosapi.herokuapp.com/api/cursos";
var listaCursos = [];
var api = document.getElementById('api');

var formNome = document.getElementById('inputNome');
var formDescricao = document.getElementById('inputDescricao');
var formUrlImagem = document.getElementById('inputUrlImagem');
var formUrlCurso = document.getElementById('inputUrlCurso');
var formCategoria = document.getElementById('inputCategoria');

var nomeCurso = document.getElementById('nomeCurso');
var categoriaCurso = document.getElementById('categoriaCurso');
var descricaoCurso = document.getElementById('descricaoCurso');
var url_curso = document.getElementById('urlCurso');
var urlImagemCurso = document.getElementById('urlImagemCurso');

var curso;

function main() {
    requestApi().then(res => mostrarCursos(res));
}

function adicionarCurso() {

    var nome = formNome.value;
    var descricao = formDescricao.value;
    var categoria = formCategoria.value;
    var urlImagem = formUrlImagem.value;
    var urlCurso = formUrlCurso.value;

    var dadosJson = {
        "nome" : nome,
        "descricao" : descricao,
        "categoria" : categoria,
        "urlImagem" : urlImagem,
        "urlCurso" : urlCurso        
    }

    console.log(dadosJson);

    $.ajax({
        type: "POST",
        url: 'https://akicursosapi.herokuapp.com/api/curso/save',
        dataType: "json",
        data: dadosJson,
    });

    mostrarAlert("Curso cadastrado com sucesso!");

}

function mostrarCursoPorId(id) {

    $.ajax({
        type: "GET",
        url: `https://akicursosapi.herokuapp.com/api/curso/id/${id}`,
        dataType: "json",
        success: function(data) {
            curso = data;
            nomeCurso.innerHTML = "<strong>" + curso["nome"] + "</strong>";
            categoriaCurso.innerHTML = curso["categoria"];
            descricaoCurso.innerHTML = curso["descricao"];
            url_curso.innerHTML = `<a href="${curso['urlCurso']}" target="blank">${curso["urlCurso"]}</a>`;
            urlImagemCurso.innerHTML = `<a href="${curso['urlImagem']}" target="blank">${curso["urlImagem"]}</a>`;
        }
    });

}

function excluirCurso(id) {

    var resultado = confirm("Tem certeza que deseja excluir esse curso?");
    
    if(resultado == true) {

        $.ajax({
            type: "DELETE",
            url: `https://akicursosapi.herokuapp.com/api/curso/delete/${id}`,
            dataType: "json",
        });
    
        mostrarAlert("Curso excluido com sucesso!");

    } else {
        return false;
    }

}

function mostrarAlert(texto) {

    alert(texto);
    window.location.reload();
    limparCampos();

}

function limparCampos() {
    formNome.value = "";
    formDescricao.value = "";
    formCategoria.value = "";
    formUrlCurso.value = "";
    formUrlImagem = "";    
}

async function mostrarCursos(res) {

    let template = "";

    listaCursos = res.sort(function(a, b) {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    })    

    for (var i in listaCursos) {
        template += `
        <div class="card mb-2">
            <div class="row">
                <div class="col-md-9">
                    <h5 class="mt-2 ml-2">${listaCursos[i].nome}</h5>
                    <span class="mb-2 ml-2">${listaCursos[i].categoria}</span>
                </div> 
                <div class="col-md-3 text-right">
                    <button type="button" class="btn btn-primary" onclick="mostrarCursoPorId(${listaCursos[i].idCurso})" data-target="#editar" data-toggle="modal">Ver curso</button>
                    <button type="button" class="btn btn-danger m-2" onclick="excluirCurso(${listaCursos[i].idCurso})">Excluir</button>  
                </div>
            </div>    
        </div>
        `;
    }

    api.innerHTML += template;

}

async function requestApi() {
    let response = await fetch(url);
    response = await response.json();
    $('#loader').hide();
    return response;
}

main();