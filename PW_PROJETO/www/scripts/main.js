"use strict";

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var info = new Information("mainInformation");
    window.info = info;
    //generateMockupdateTask();
};

function generateMockupdateTask() {
    info.tasks.push(new Tarefa(1, "teste1", "2000-12-20"));
    info.tasks.push(new Tarefa(2, "teste2", "2000-12-20"));
    info.tasks.push(new Tarefa(3, "teste3", "2000-12-20"));
}


function tableLine(object) {
    var ul = document.createElement("ul");
    for (var property in object) {
        if (object.hasOwnProperty(property) && typeof object[property] !== 'function') {
            var li = document.createElement("li");
            li.textContent = object[property];
            ul.appendChild(li);
        }
    }
    return ul;
}

