const express = require('express');
const path = require('path');
const fs = require('fs');
const opt = {
    'default': { 'folder': 'www', 'document': 'index.html', 'port': 8081, 'favicon': ''},
    'extensions': {
        'htm': 'text/html; charset=utf-8',
        'html': 'text/html; charset=utf-8',
        'js': 'application/javascript; charset=utf-8',
        'json': 'application/json; charset=utf-8',
        'css': 'text/css; charset=utf-8',
        'gif': 'image/gif',
        'jpg': 'image/jpg',
        'png': 'image/png',
        'ico': 'image/x-icon'
    }
};

const app = express();

app.use(express.static(path.join(__dirname, opt.default.folder)));

app.use((req, res, next) => {
    const filename = path.join(__dirname, opt.default.folder, req.path);
    fs.readFile(filename, (err, data) => {
        if (err) {
            console.error(err);
            res.status(404).send('HTTP Status: 404 : NOT FOUND');
            return;
        }
        res.set('Content-Type', mimeType(filename));
        res.send(data);
    });
});

app.listen(opt.default.port, () => {
    console.log(`Running at http://localhost:${opt.default.port}`)
});