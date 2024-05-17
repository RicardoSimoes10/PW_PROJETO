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
        //Verifica se existe tarefas
        console.log(this.tasks);
        if (this.tasks != "") {
            document.getElementById("tituloListaTarefas").style.display = "block";
            document.getElementById(this.id).style.display = "block";
        }

        document.getElementById("editForm").style.display = "none";
        document.getElementById("addForm").style.display = "block";

        document.getElementById("tarefaTitle").textContent = "Adicionar Tarefa";

        //Limpa os inputs depois de editar a tarefa
        document.getElementById("taskInput").value = "";
        document.getElementById("taskDate").value = "";

        document.getElementById("addForm").style.display = "block";
        document.getElementById("information").innerHTML = "";

        let lista = document.getElementById("information");
        this.tasks.forEach(task => {
            let li = window.tableLine(task);
            lista.appendChild(li);
        });
        document.getElementById("taskListDivInformation").replaceChildren(lista);
    }

    /*Remove uma tarefa*/
    removeTasks(id) {
        let indexToRemove = this.tasks.findIndex(task => task.id === id); // Encontra o índice da tarefa pelo ID

        if (indexToRemove !== -1) {
            this.tasks.splice(indexToRemove, 1); // Remove a tarefa do array

            //Ajusta os IDs das tarefas
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id > id) {
                    this.tasks[i].id--;
                }
            }
        }
        else
            alert("Tarefa não encontrada!!");

        //Guarda o array no localStorage
        let data = JSON.stringify(this.tasks);
        localStorage.setItem("tarefas", data);

        this.showTasks();//Atualiza a tabela

        //Se o array for vazio, nao mostra nenhum tipo de informação (HTML)
        if (this.tasks.length == 0) {
            document.getElementById("mainInformation").style.display = "none";
        }
    }

    callEdit(id, text, date) {
        console.log(id);
        console.log(text);
        console.log(date);
        document.getElementById("editTaskInput").value = text;
        document.getElementById("editTaskDate").value = date;
        document.getElementById("editTaskId").value = id;

        document.getElementById("mainInformation").style.display = "none";
        document.getElementById("editForm").style.display = "block";
        document.getElementById("addForm").style.display = "none";
    }
}