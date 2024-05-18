"use strict";
/** 
* @class Guarda toda informação necessaria na execução do exercicio 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.

* @property {string} id - id do elemento HTML que contém a informação.
* @property {tarefa[]} tasks - Array de objetos do tipo tarefa, para guardar todas as tarefas do nosso sistema
*/

class Information {
    constructor(id) {
        this.id = id;
        this.tasks = [];
    }

    showTasks() {
        document.getElementById("editForm").style.display = "none";
        document.getElementById("addForm").style.display = "block";

        document.getElementById("tarefaTitle").textContent = "Adicionar Tarefa";

        //Limpa os inputs depois de editar a tarefa
        document.getElementById("taskInput").value = "";
        document.getElementById("taskDate").value = "";

        document.getElementById("addForm").style.display = "block";
        document.getElementById("information").innerHTML = "";

        let lista = document.getElementById("information");
        let count = 0;
        this.tasks.forEach(task => {
            if (task.valid == true) {
                let li = window.tableLine(task);
                lista.appendChild(li);
                count++;
            }
        });
        document.getElementById("taskListDivInformation").replaceChildren(lista);

        //Verifica se existe tarefas
        if (count > 0) {
            document.getElementById("tituloListaTarefas").style.display = "block";
            document.getElementById(this.id).style.display = "block";
        } else {
            document.getElementById("tituloListaTarefas").style.display = "none";
            document.getElementById(this.id).style.display = "none";
        }
    }

    callEdit(id, text, date) {
        document.getElementById("editTaskInput").value = text;
        document.getElementById("editTaskDate").value = date;
        document.getElementById("editTaskId").value = id;

        document.getElementById("mainInformation").style.display = "none";
        document.getElementById("editForm").style.display = "block";
        document.getElementById("addForm").style.display = "none";

        document.getElementById("editForm").action = `/editTask/${id}`;
    }
}