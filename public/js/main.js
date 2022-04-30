var tempoInicial = $("#cronometro").text();
var campoDigitacao = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    inicializaMarcadores()
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    let frase = $(".frase").text();
    let numeroPalavras = frase.split(" ").length;
    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroPalavras);
}

function inicializaContador() {
    campoDigitacao.on("input", function () {
        let conteudo = campoDigitacao.val();

        let contadorCaracteres = conteudo.length;
        $("#contador-caracteres").text(contadorCaracteres);

        let contadorPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(contadorPalavras);
    });
}

function inicializaCronometro() {
    let cronometro = $("#cronometro").text();
    campoDigitacao.one("focus", function () {
        let cronometroID = setInterval(() => {
            cronometro--;
            $("#cronometro").text(cronometro);
            if (cronometro < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }

        }, 1000);
    });
}

function finalizaJogo() {
    campoDigitacao.attr("disabled", true);
    campoDigitacao.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    let frase = $(".frase").text();
    campoDigitacao.on("input", function () {
        let digitado = campoDigitacao.val();
        let comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campoDigitacao.addClass("borda-verde");
            campoDigitacao.removeClass("borda-vermelha");
        } else {
            campoDigitacao.addClass("borda-vermelha");
            campoDigitacao.removeClass("borda-verde");
        }

    });
}

function reiniciaJogo() {
    campoDigitacao.val("");
    campoDigitacao.attr("disabled", false);
    $("#contador-caracteres").text(0);
    $("#contador-palavras").text(0);
    $("#cronometro").text(tempoInicial);
    campoDigitacao.toggleClass("campo-desativado");
    campoDigitacao.removeClass("borda-verde");
    campoDigitacao.removeClass("borda-vermelha");
    inicializaCronometro();
}


