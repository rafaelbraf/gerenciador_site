var url = "https://akicursosapi.herokuapp.com/api/cursos";
var listaCursos = [];
var api = document.getElementById('api');

var formNome = document.getElementById('inputNome');
var formDescricao = document.getElementById('inputDescricao');
var formUrlImagem = document.getElementById('inputUrlImagem');
var formUrlCurso = document.getElementById('inputUrlCurso');
var formCategoria = document.getElementById('inputCategoria');
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
        }        
    });

}

function excluirCurso(id) {

    $.ajax({
        type: "DELETE",
        url: `https://akicursosapi.herokuapp.com/api/curso/delete/${id}`,
        dataType: "json",
    });

    mostrarAlert("Curso excluido com sucesso!");

}

function mostrarAlert(texto) {
    alert(texto);
    window.location.reload();
}

async function mostrarCursos(res) {

    let template = "";

    for (var i in res) {
        template += `
        <div class="card mb-2">
            <div class="row">
                <div class="col-md-9">
                    <h5 class="mt-2 ml-2">${res[i].nome}</h5>
                    <span class="mb-2 ml-2">${res[i].categoria}</span>
                </div> 
                <div class="col-md-3 text-right">
                    <button type="button" class="btn btn-primary" onclick="mostrarCursoPorId(${res[i].idCurso})" data-target="#editar" data-toggle="modal">Editar</button>
                    <button type="button" class="btn btn-danger m-2" onclick="excluirCurso(${res[i].idCurso})">Excluir</button>  
                </div>
            </div>    
        </div>
        `;
        console.log(res[i].nome);
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