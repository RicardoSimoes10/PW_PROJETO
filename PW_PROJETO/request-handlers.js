// request-handlers.js

const fs = require('fs');
const path = require('path');

// Function to add a task
function addTask(req, res) {
    // Extract task content and date from the request body
    const { taskContent, taskDate } = req.body;

    // Create a new task object
    const newTask = {
        content: taskContent,
        date: taskDate
    };

    // Read existing data from the JSON file
    let data = [];
    const filePath = path.join(__dirname, 'data.json');
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }

    // Add the new task to the data array
    data.push(newTask);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Redirect back to the main page after adding the task
    res.redirect('/');

    // Alternatively, you can respond with a success message or the updated tasks array
    // res.status(200).json({ message: 'Task added successfully', tasks: data });
}

function editTask(req, res) {
    // Extract task ID and updated content and date from the request body
    const { taskId, taskContent, taskDate } = req.body;
    // Read existing data from the JSON file
    const filePath = path.join(__dirname, 'data.json');
    if (fs.existsSync(filePath)) {
        let data = JSON.parse(fs.readFileSync(filePath));

        // Find the task with the given ID and update its content and date
        const taskIndex = data.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            data[taskIndex].content = taskContent;
            data[taskIndex].date = taskDate;

            // Write the updated data back to the JSON file
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            // Redirect to index.html after updating the task
            res.redirect('/index.html');
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } else {
        res.status(404).json({ message: 'Tasks not found' });
    }
}

function loopJSON() {
    // Read the JSON file
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const { showTasksButton } = req.body;

        // Parse the JSON data into a JavaScript array of objects
        const jsonData = JSON.parse(data);

        // Loop through each object in the array
        jsonData.forEach((task, index) => {
            // Access the content and date properties of each object
            //console.log(`Task ${index + 1}: Content - ${task.content}, Date - ${task.date}`);
        });
    });
}


// Export the functions
module.exports = {
    addTask,
    editTask
};
