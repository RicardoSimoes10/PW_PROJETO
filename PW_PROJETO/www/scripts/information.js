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
    }

    /*Mostra todas as tarefas*/
    showTasks() {
        this.tasks = dados; //Atribui ao array "tasks" os valores do ficheiro data.js (dados) 

        //Verifica se existe tarefas
        if (this.tasks != "") {
            document.getElementById("tituloListaTarefas").style.display = "block";
            document.getElementById(this.id).style.display = "block";
        }

        document.getElementById("editForm").style.display = "none";
        document.getElementById("addForm").style.display = "block";

        document.getElementById("tarefaTitle").textContent = "Adicionar Tarefa";

        
        document.getElementById("taskInput").value = "";
        document.getElementById("taskDate").value = "";

        document.getElementById("addForm").style.display = "block";
        document.getElementById("information").innerText = "";

        let lista = document.getElementById("information");
        this.tasks.forEach(task => {
            let li = tableLine(task);
            lista.appendChild(li);
        });
        document.getElementById("taskListDivInformation").replaceChildren(lista);
    }

    callEdit(id, text, date) {
        document.getElementById("editTaskInput").value = text;
        document.getElementById("editTaskDate").value = date;
        document.getElementById("editTaskId").value = id;

        document.getElementById("mainInformation").style.display = "none";
        document.getElementById("editForm").style.display = "block";
        document.getElementById("addForm").style.display = "none";
    }
}