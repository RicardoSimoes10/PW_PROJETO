const fs = require('fs');
const path = require('path');

function addTask(req, res) {
    const { taskContent, taskDate } = req.body;
    
    // Verifica se existe algum dado
    if (taskContent != "" && taskDate != "") {
        const filePath = path.join(__dirname, 'www', 'data.json');

        // Array de objetos do tipo task
        let data = [];
        
        let nextId = 1;
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileContent);
            if (data.length > 0) {
                const maxId = Math.max(...data.map(task => task.id));
                nextId = maxId + 1;
            }
        }
        

        // Cria varios objetos do tipo task
        const value = {
            id: nextId,
            content: taskContent,
            date: taskDate,
            valid: true
        };
    
        data.push(value);
    
        // Escreve no ficheiro
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));   
    } 

    // Redirecioa a pagina para o home
    res.redirect('/');
}

function editTask(req, res) {
    const { taskContent, taskDate } = req.body;
    const filePath = path.join(__dirname, 'www', 'data.json');

    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(fileContent);
    }

    const taskIndex = data.findIndex(task => task.id === parseInt(req.params.id));

    if (taskIndex !== -1) {
        data[taskIndex].content = taskContent;
        data[taskIndex].date = taskDate;

        fs.writeFileSync(filePath, JSON.stringify(data));

        res.redirect('/');
    } else {
        // If the task is not found, send an error response
        res.status(404).send('Task not found.');
    }
}


function removeTask(req, res) {
    const taskId = parseInt(req.body.removeTaskId);
    const filePath = path.join(__dirname, 'www', 'data.json');

    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(fileContent);

        const taskIndex = data.findIndex(task => task.id === parseInt(req.params.id));

        if (taskIndex !== -1) {
            data[taskIndex].valid = false;

            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            res.redirect('/');
        } else {
            res.status(404).send('Task not found.');
        }
    } else {
        res.status(500).send('Data file not found.');
    }
}

module.exports = {
    addTask,
    editTask,
    removeTask
};