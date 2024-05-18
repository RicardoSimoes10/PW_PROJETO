const express = require("express");
var bodyParser = require('body-parser')
const requestHandlers = require("./request-handlers");

const app = express();
app.use(express.static("www"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addTask", requestHandlers.addTask);

app.post("/editTask/:id", requestHandlers.editTask);

app.post("/removeTask/:id", requestHandlers.removeTask);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});
    