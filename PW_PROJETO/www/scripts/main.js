"use strict";

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var info = new Information("mainInformation");
    window.info = info;
};