
"use strict";

/** 
* @class Guarda toda informação necessaria na execução do exercicio 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* @property {tarefa[]} tasks - Array de objetos do tipo tarefa, para guardar todas as tarefas do nosso sistema
* @property {string} id - id do elemento HTML que contém a informação.
*/

class Information {
    constructor(id) {
        this.id = id;
        this.tasks = [];
    }

    /*Mostra todas as tarefas*/
    showTasks(){
        document.getElementById(this.id).style.display = "block";
    };

    /*Adiciona uma tarefa*/
    addTasks(){
        /*TODO - Adicionar Tarefas*/
        console.log("ADD");
    };

    /*Edita uma tarefa*/
    updateTasks(){
        /*TODO - Editar Tarefas*/
        console.log("UPDATE");
    };

    /*Remove uma tarefa*/
    removeTasks(){
        /*TODO - Remover Tarefas*/
        console.log("REMOVE");
    };
}
