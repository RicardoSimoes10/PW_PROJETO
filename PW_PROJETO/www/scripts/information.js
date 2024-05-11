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

        document.getElementById("editForm").style.display = "none";
        document.getElementById("addForm").style.display = "block";

        document.getElementById("tarefaTitle").textContent = "Adicionar Tarefa"; //Muda o titulo

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
        console.log("add");
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
    updateTasks(id) {
        console.log(id);

        var editText = document.getElementById("editTaskInput").value;
        var editDate = document.getElementById("editTaskDate").value;

        /*let input = prompt("Editar Tarefa:", text + "|" + date);
        let editedTask = input.split('|');

        if (!input || !input.includes('|')) {
            alert("Preencha com dados válidos!");
            return;
        }

        //Verifica se o input está correto
        if (text.length !== 2 || text.trim() === '' || text.trim() === '') {
            alert("Preencha com dados válidos!");
            return;
        }

        const dateFormat = /^\d{4}-\d{2}-\d{2}$/; //Padrao do formato data (yyyy-mm-dd)

        //Verifica se o padrão é diferente do input
        if (!dateFormat.test(date.trim())) {
            alert("A data deve estar no formato aaaa-mm-dd!");
            return;
        }*/

        console.log(editText);
        console.log(editDate);

        let taskToUpdate = this.tasks.find(task => task.id === id); //Encontra a tarefa pelo o ID
        taskToUpdate.taskContent = editText; //Edita o texto
        taskToUpdate.taskDate = editDate; //Edita a data

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

    testeEdit(id, text, date) {
        document.getElementById("editTaskInput").value = text;
        document.getElementById("editTaskDate").value = date;

        document.getElementById("mainInformation").style.display = "none";

        document.getElementById("editForm").style.display = "block";
        document.getElementById("addForm").style.display = "none";

        window.callEdit(id);
    }
}