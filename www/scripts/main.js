"use strict";

/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
window.onload = function (event) {
    var info = new Information("mainInformation");
    window.info = info;
    //addTasks();
    loadData();
};

function loadData() {
    window.info.tasks = JSON.parse(localStorage.getItem("tarefas")); //Carrega as tarefas guardadas no localStorage
}

function addTasks() {
    info.tasks.push(new Tarefa(1, "teste1", "2000-12-21"));
    info.tasks.push(new Tarefa(2, "teste2", "2000-12-21"));
    info.tasks.push(new Tarefa(3, "teste3", "2000-12-21"));
}

function tableLine(task) {
    var detailsDiv = document.createElement("div");
    detailsDiv.style.display = "inline-block";

    var li = document.createElement("li");
    li.className = "task-item";


    for (var property in task) {
        if (task.hasOwnProperty(property) && property !== 'id') {
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
        window.info.callEdit(task.id, task.taskContent, task.taskDate);
    });
    editBtn.className = "editTaskButton";

    buttonDiv.appendChild(deleteBtn);
    buttonDiv.appendChild(editBtn);

    li.appendChild(detailsDiv);
    li.appendChild(buttonDiv);

    return li;
}