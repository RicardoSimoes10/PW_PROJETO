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

function tableLine(task) {
    var li = document.createElement("li");
    li.className = "task-item";

    var detailsDiv = document.createElement("div");
    detailsDiv.style.display = "inline-block";

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

    var editBtn = document.createElement("button");
    editBtn.title = "Editar Tarefa";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
        window.info.callEdit(task.id, task.content, task.date);
    });
    editBtn.className = "editTaskButton";

    var form = document.createElement("form");
    form.method = "post";
    form.action = "/removeTask";

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button"; // Set type to button to prevent form submission
    deleteBtn.title = "Remover Tarefa";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        form.submit();
    });

    deleteBtn.className = "removeTaskButton";

    var removeTaskIdInput = document.createElement("input");
    removeTaskIdInput.type = "hidden";
    removeTaskIdInput.id = "removeTaskId";
    removeTaskIdInput.name = "removeTaskId";
    removeTaskIdInput.value = task.id;


    form.appendChild(removeTaskIdInput);
    form.appendChild(deleteBtn);
    buttonDiv.appendChild(form);
    buttonDiv.appendChild(editBtn); // Edit button appended before the form

    li.appendChild(detailsDiv);
    li.appendChild(buttonDiv);

    return li;
}


