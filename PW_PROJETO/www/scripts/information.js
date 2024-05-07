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

        //Verifica se o texto e a data não estão preenchidos só com espaços
        if ((taskText.trim() === "") || (taskDate.trim() === "")) {
            alert("Preencha os campos!!");
            return;
        }

        let newTask = new Tarefa(taskId, taskText, taskDate);
        this.tasks.unshift(newTask);

        //Guarda o array no localStorage
        let data = JSON.stringify(this.tasks);
        localStorage.setItem("tarefas", data);

        this.showTasks(); //Atualiza a tabela

        //Limpa os inputs depois de adicionar tarefa
        document.getElementById("taskInput").value = "";
        document.getElementById("taskDate").value = "";
    };

    /*Edita uma tarefa*/
    updateTasks(id, text, date) {

        let input = prompt("Editar Tarefa:", text + "|" + date);
        let editedTask = input.split('|');

        if (!input || !input.includes('|')) {
            alert("Preencha com dados válidos!");
            return;
        }

        //Verifica se o input está correto
        if (editedTask.length !== 2 || editedTask[0].trim() === '' || editedTask[1].trim() === '') {
            alert("Preencha com dados válidos!");
            return;
        }

        const dateFormat = /^\d{4}-\d{2}-\d{2}$/; //Padrao do formato data (yyyy-mm-dd)

        //Verifica se o padrão é diferente do input
        if (!dateFormat.test(editedTask[1].trim())) {
            alert("A data deve estar no formato aaaa-mm-dd!");
            return;
        }

        let taskToUpdate = this.tasks.find(task => task.id === id); //Encontra a tarefa pelo o ID
        taskToUpdate.taskContent = editedTask[0]; //Edita o texto
        taskToUpdate.taskDate = editedTask[1]; //Edita a data

        //Guarda o array no localStorage
        let data = JSON.stringify(this.tasks);
        localStorage.setItem("tarefas", data);

        this.showTasks(); //Atualiza a tabela
    };

    /*Remove uma tarefa*/
    removeTasks(id) {
        let indexToRemove = this.tasks.findIndex(task => task.id === id); // Encontra o índice da tarefa pelo ID

        if (indexToRemove !== -1) {
            this.tasks.splice(indexToRemove, 1); // Remove a tarefa do array

            //Ajusta os IDs das tarefas
            for (let i = 0; i < this.tasks.length; i++) {
                //Decrementa o ID de todas as tarefas cujo ID é maior que o ID da tarefa a ser removida
                if (this.tasks[i].id > id) {
                    this.tasks[i].id--;
                }
            }
        } else {
            alert("Tarefa não encontrada!!");
        }

        //Guarda o array no localStorage
        let data = JSON.stringify(this.tasks);
        localStorage.setItem("tarefas", data);

        this.showTasks();//Atualiza a tabela

        //Se o array for vazio, nao mostra nenhum tipo de informação (HTML)
        if (this.tasks.length == 0) {
            document.getElementById("mainInformation").style.display = "none";
        }
    }

    /*testeEdit(id, text, date){
        document.getElementById("tarefaTitle").textContent = "Editar Tarefa"

        var taskText = document.getElementById("taskInput").value = text;
        var taskDate = document.getElementById("taskDate").value = date;

        document.getElementById("mainInformation").style.display = "none";

        var editButton = document.getElementById("taskButton");
        editButton.innerHTML = "&#x2713;"
        editButton.title = "Editar Tarefa";
        editButton.addEventListener("click", function() {
            updateTasks(id, taskText, taskDate); // Automatically pass the task id to edit it
            this.upda
        });

        //this.updateTasks(id, taskText, taskDate);
    }*/

}