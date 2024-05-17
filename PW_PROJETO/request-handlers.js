// request-handlers.js

const fs = require('fs');
const path = require('path');

//ADD
function addTask(req, res) {
    // Extract task content and date from the request body
    const { taskContent, taskDate } = req.body;

    // Path to the data.js file inside the "www/scripts" directory
    const filePath = path.join(__dirname, 'www', 'scripts', 'data.js');

    // Read existing data from the JS file
    let data = [];
    let nextId = 1; // Initialize nextId to 1 for the first task
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const dataString = fileContent.match(/const dados\s*=\s*(\[.*\]);/s);
        if (dataString && dataString[1]) {
            data = JSON.parse(dataString[1]);
            // Find the highest id in the existing data
            if (data.length > 0) {
                const maxId = Math.max(...data.map(task => task.id));
                nextId = maxId + 1;
            }
        }
    }

    // Create a new task object with an incremented id
    const newTask = {
        id: nextId,
        content: taskContent,
        date: taskDate
    };

    // Add the new task to the data array
    data.push(newTask);

    // Write the updated data back to the JS file
    const updatedDataString = `const dados = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(filePath, updatedDataString);

    // Redirect back to the main page after adding the task
    res.redirect('/');
}


//EDIT
function editTask(req, res) {
    // Extract task id, content, and date from the request body
    const { editTaskId, taskContent, taskDate } = req.body;
    // Path to the data.js file inside the "www/scripts" directory
    const filePath = path.join(__dirname, 'www', 'scripts', 'data.js');

    // Read existing data from the JS file
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const dataString = fileContent.match(/const dados\s*=\s*(\[.*\]);/s);
        if (dataString && dataString[1]) {
            data = JSON.parse(dataString[1]);
        }
    }

    // Find the index of the task with the given taskId
    const taskIndex = data.findIndex(task => task.id === parseInt(editTaskId));

    // If the task is found, update its content and date
    if (taskIndex !== -1) {
        data[taskIndex].content = taskContent;
        data[taskIndex].date = taskDate;

        // Write the updated data back to the JS file
        const updatedDataString = `const dados = ${JSON.stringify(data, null, 2)};\n`;
        fs.writeFileSync(filePath, updatedDataString);

        // Redirect back to the main page after editing the task
        res.redirect('/');
    } else {
        // If the task is not found, send an error response
        res.status(404).send('Task not found.');
    }
}

//REMOVE
function removeTask(req, res) {
    // Extract task ID from the request body
    let taskId = parseInt(req.body.removeTaskId);

    // Path to the data.js file inside the "www/scripts" directory
    const filePath = path.join(__dirname, 'www', 'scripts', 'data.js');

    // Read existing data from the JS file
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const dataString = fileContent.match(/const dados\s*=\s*(\[.*\]);/s);
        if (dataString && dataString[1]) {
            data = JSON.parse(dataString[1]);
        }
    }
    
    // Find the index of the task with the provided ID
    const taskIndex = data.findIndex(task => task.id === taskId);
    // If the task exists, remove it from the data array
    if (taskIndex !== -1) {
        data.splice(taskIndex, 1);

        // Write the updated data back to the JS file
        const updatedDataString = `const dados = ${JSON.stringify(data, null, 2)};\n`;
        fs.writeFileSync(filePath, updatedDataString);

        // Redirect back to the main page after removing the task
        res.redirect('/');
    } else {
        // If the task with the provided ID doesn't exist, send an error response
        res.status(404).send('Task not found');
    }
}

// Export the functions
module.exports = {
    addTask,
    editTask,
    removeTask
};