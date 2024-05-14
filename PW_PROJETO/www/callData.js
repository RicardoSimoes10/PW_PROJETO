const fs = require('fs');

function saveTasksToFile(tasks, filePath) {
    fs.writeFile(filePath, JSON.stringify(tasks), (err) => {
        if (err) {
            console.error('Error saving tasks to file:', err);
        } else {
            console.log('Tasks saved to file successfully.');
        }
    });
}

const tasks = [
    { id: 1, taskContent: 'Task 1', taskDate: '2000-03-22' },
    { id: 2, taskContent: 'Task 2', taskDate: '2000-12-21' }
];

const filePath = 'tasks.json';
saveTasksToFile(tasks, filePath);