"use strict";

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */

import data from '../data.json' with {type: 'json'};

window.onload = function (event) {
    var info = new Information("mainInformation");
    window.info = info;
    window.info.tasks = data.reverse();
    window.tableLine = tableLine;
};

function tableLine(task) {  
    var detailsDiv = document.createElement("div");
    detailsDiv.style.display = "inline-block";

    var li = document.createElement("li");
    li.value = task.id; // Colocamos o id como valor
    li.className = "task-item";

    for (var property in task) {
        if (task.hasOwnProperty(property) && property !== 'id' && property !== 'valid') {
            var span = document.createElement("span");
            span.textContent = task[property];
            if (property === 'taskContent') {
                span.style.fontSize = "inherit";
            } else if (property === 'taskDate') {
                span.style.fontSize = "11px";
            }
            detailsDiv.appendChild(span);
            detailsDiv.appendChild(document.createElement("br"));
        }
    }

    var buttonDiv = document.createElement("div");
    buttonDiv.className = "divButtonEditRemove";

    var deleteBtn = document.createElement("button");
    deleteBtn.title = "Remover Tarefa";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        window.info.removeTasks(task.id);
    });
    deleteBtn.className = "removeTaskButton";

    var editBtn = document.createElement("button");
    editBtn.title = "Editar Tarefa";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
        window.info.callEdit(task.id, task.content, task.date);
    });
    editBtn.className = "editTaskButton";

    buttonDiv.appendChild(deleteBtn);
    buttonDiv.appendChild(editBtn);

    li.appendChild(detailsDiv);
    li.appendChild(buttonDiv);

    return li;
}
