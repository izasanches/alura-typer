$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function () {
            $("#erro").show();
            setTimeout(() => {
                $("#erro").toggle();
            }, 2000);

        })
        .always(function () {
            $("#spinner").toggle();
        });
}

function trocaFraseAleatoria(data) {
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempo(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    let fraseId = $("#frase-id").val();
    var dados = { id: fraseId };
    $.get("http://localhost:3000/frases", dados, trocaFrase)
        .fail(function () {
            $("#erro").show();
            setTimeout(() => {
                $("#erro").toggle();
            }, 2000);

        })
        .always(function () {
            $("#spinner").toggle();
        });
}

function trocaFrase(data) {
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempo(data.tempo);
}