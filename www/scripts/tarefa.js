"use strict";

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade tarefa 
* @constructs Tarefa
* @param {int} id - id da tarefa
* @param {string} taskContent - nome da pessoa
* @param {Date} taskDate - data de nascimento da pessoa
*/
class Tarefa {
    constructor(id, taskContent, taskDate, taskValid){
        this.id = id;
        this.taskContent = taskContent;
        this.taskDate = taskDate;
        this.taskValid = taskValid;
    }
}