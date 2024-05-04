"use strict";

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var info = new Information("mainInformation");
    window.info = info;
    generateMockupdateTask();
};

function generateMockupdateTask() {
    info.tasks.push(new Tarefa(1, "teste1"/*, "2000-12-20"*/));
    info.tasks.push(new Tarefa(2, "teste2"/*, "2000-12-20"*/));
    info.tasks.push(new Tarefa(3, "teste3"/*, "2000-12-20"*/));
}


function tableLine(task, index) {
    //Cria uma lista e adiona os elementos do array na lista
    var li = document.createElement("li");
    for (var property in task) {
        if (task.hasOwnProperty(property) && property !== 'id') {
            li.textContent += task[property] + " ";
        }
    }

    var buttonDiv = document.createElement("div"); //cria uma div

    var deleteBtn = document.createElement("button"); //cria um button para remover
    deleteBtn.textContent = "Delete";

    //Adiciona um evento "click" ao button remover
    deleteBtn.addEventListener("click", function () {
        window.info.removeTasks(index);
    });
    deleteBtn.className = "removeTaskButton"; //cria uma class para o button remover


    var editBtn = document.createElement("button"); //cria um button para editar
    editBtn.textContent = "Edit";

    //Adiciona um evento "click" ao button editar
    editBtn.addEventListener("click", function () {
        window.info.updateTasks(index);
    });
    editBtn.className = "editTaskButton"; //cria uma class para o button editar

    //Adiciona os dois buttons na div
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(buttonDiv); //Adiciona a div na lista

    return li;
}


