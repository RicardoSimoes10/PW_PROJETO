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
            let li = tableLine(task);
            lista.appendChild(li);
        });
        document.getElementById("taskListDivInformation").replaceChildren(lista);
    }


    /*Adiciona uma tarefa*/
    addTasks() {
        event.preventDefault();
        console.log("add");
        let taskId = this.tasks.length + 1;
        let taskText = document.getElementById("taskInput").value;
        let taskDate = document.getElementById("taskDate").value;

        //Verifica se o texto e a data não estão preenchidos só com espaços
        if ((taskText.trim() === "") || (taskDate.trim() === "")) {
            alert("Preencha os campos!!");
            return;
        }

        let currentDate = new Date(); // Current system date
        let inputDate = new Date(taskDate); // Date from the input field

        // Verifica se a data da tarefa é anterior à data atual
        if (inputDate < currentDate) {
            alert("A data da tarefa não pode ser anterior à data atual!");
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
    updateTasks(id) {
        event.preventDefault();
        
        var editText = document.getElementById("editTaskInput").value;
        var editDate = document.getElementById("editTaskDate").value;

        
        //Verifica se o input está correto
        if (editText.trim() === '' || editText.trim() === '' || editDate === '') {
            alert("Preencha todos os campos!!");
            return;
        }

        let currentDate = new Date(); // Data atual do sistema
        let inputDate = new Date(editDate); // Data introduzida

        // Verifica se a data da tarefa é anterior à data atual
        if (inputDate < currentDate) {
            alert("A data da tarefa não pode ser anterior à data atual!");
            return;
        }

        //UPDATE
        let taskToUpdate = this.tasks.find(task => task.id === parseInt(id)); //Encontra a tarefa pelo o ID
        taskToUpdate.taskContent = editText;
        taskToUpdate.taskDate = editDate;

        //Guarda o array no localStorage
        let data = JSON.stringify(this.tasks);
        localStorage.setItem("tarefas", data);

        this.showTasks(); //Atualiza a tabela
    }


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
        document.getElementById("editTaskInput").value = text;
        document.getElementById("editTaskDate").value = date;
        document.getElementById("editTaskId").value = id;

        document.getElementById("mainInformation").style.display = "none";
        document.getElementById("editForm").style.display = "block";
        document.getElementById("addForm").style.display = "none";
    }
}