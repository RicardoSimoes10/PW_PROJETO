const fs = require('fs');
const path = require('path');

function addTask(req, res) {
    const { taskContent, taskDate } = req.body;

    const filePath = path.join(__dirname, 'www', 'data.json');

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

    const value = {
        id: nextId,
        content: taskContent,
        date: taskDate
    };

    data.push(value);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.redirect('/');
}

module.exports = {
    addTask,
    // editTask,
    // removeTask
};