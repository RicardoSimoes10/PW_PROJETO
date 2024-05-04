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
    info.tasks.push(new Tarefa(1, "teste1", "2000-12-20"));
    info.tasks.push(new Tarefa(2, "teste2", "2000-12-20"));
    info.tasks.push(new Tarefa(3, "teste3", "2000-12-20"));
}


function tableLine(task, index) {
    var li = document.createElement("li");
    
    var detailsDiv = document.createElement("div");
    detailsDiv.style.display = "inline-block";
    
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
    
    // Cria uma div para os buttons
    var buttonDiv = document.createElement("div");
    buttonDiv.className = "divButtonEditRemove";

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        window.info.removeTasks(index);
    });
    deleteBtn.className = "removeTaskButton";

    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function() {
        window.info.updateTasks(index);
    });
    editBtn.className = "editTaskButton";

    //Adiciona os buttons à div
    buttonDiv.appendChild(deleteBtn);
    buttonDiv.appendChild(editBtn);

    li.appendChild(detailsDiv); //Adiciona a div com o texto e a data à lista
    li.appendChild(buttonDiv); //Adiciona a div com os buttons à lista

    return li;
}



