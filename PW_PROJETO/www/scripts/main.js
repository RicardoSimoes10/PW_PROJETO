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
    loadData();
};

function generateMockupdateTask() {
    info.tasks.push(new Tarefa(1, "teste1 teste1 teste1 teste1", "2000-12-20"));
    info.tasks.push(new Tarefa(2, "teste2", "2000-12-20"));
    info.tasks.push(new Tarefa(3, "teste3", "2000-12-20"));
}


function loadData(){
    window.info.tasks = JSON.parse(localStorage.getItem("tarefas"));
}


function tableLine(task) {
    var detailsDiv = document.createElement("div");
    detailsDiv.style.display = "inline-block";

    var li = document.createElement("li");

    for (var property in task) {
        if (task.hasOwnProperty(property) && property !== 'id') {
            var span = document.createElement("span");
            span.textContent = task[property];
            
            if (property === 'taskText') {
                span.style.fontSize = "inherit";
            } else if (property === 'taskDate') {
                span.style.fontSize = "11px";
            }
            detailsDiv.appendChild(span);
            detailsDiv.appendChild(document.createElement("br"));
        }
    }
    
    // Create a div for the buttons
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "divButtonEditRemove";

    // Create a button to remove 
    var deleteBtn = document.createElement("button");
    deleteBtn.title = "Remover Tarefa";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        window.info.removeTasks(task.id); // Automatically pass the task id to remove it
    });
    deleteBtn.className = "removeTaskButton";

    // Create a button to edit 
    var editBtn = document.createElement("button");
    editBtn.title = "Editar Tarefa";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function() {
        window.info.updateTasks(task.id, task.taskContent, task.taskDate); // Automatically pass the task id to edit it
    });
    editBtn.className = "editTaskButton";

    // Add buttons to the div
    buttonDiv.appendChild(deleteBtn);
    buttonDiv.appendChild(editBtn);

    li.appendChild(detailsDiv); // Add the div with text and date to the list
    li.appendChild(buttonDiv); // Add the div with buttons to the list

    return li;
}




