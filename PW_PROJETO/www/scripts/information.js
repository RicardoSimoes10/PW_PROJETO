
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

    /*Mostra todas as tarefas*/
    showTasks() {
        if (this.tasks != "") {
            document.getElementById("tituloListaTarefas").style.display = "block";
            document.getElementById(this.id).style.display = "block";
        }

        document.getElementById("form").style.display = "block";
        document.getElementById("information").innerHTML = "";

        let lista = document.getElementById("information");
        this.tasks.forEach(task => {
            let li = tableLine(task);
            lista.appendChild(li);
        });
        document.getElementById("taskListDivInformation").replaceChildren(lista);
    }


    /*Adiciona uma tarefa*/
    addTasks() {
        let taskId = this.tasks.length + 1;
        let taskText = document.getElementById("taskInput").value;
        let taskDate = document.getElementById("taskDate").value;

        if ((taskText == "") || (taskDate == "")) {
            alert("Preencha os campos!!");
            return;
        }

        let newTask = new Tarefa(taskId, taskText, taskDate);
        this.tasks.push(newTask);

        this.showTasks();

        console.log(this.tasks);
    };

    /*Edita uma tarefa*/
    updateTasks(id) {
        let input = prompt("Ex:  TEXTO|DATA");
        let editedTask = input.split('|');

        let taskToUpdate = this.tasks.find(task => task.id === id); //Encontra a tarefa pelo o ID

        taskToUpdate.taskContent = editedTask[0]; //Edita o texto
        taskToUpdate.taskDate = editedTask[1]; //Edita a data

        this.showTasks(); //Atualiza a tabela
    };

    /*Remove uma tarefa*/
    removeTasks() {
        /*TODO - Remover Tarefas*/
        console.log("REMOVE");

    };
}
