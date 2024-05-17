// app.js

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const requestHandlers = require("./request-handlers");

const app = express();

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'www' directory
app.use(express.static("www"));

// Route to handle adding tasks
app.post("/addTask", requestHandlers.addTask);

// Route to handle editing tasks
app.post("/editTask", requestHandlers.editTask);

// Route to handle removing tasks
app.post("/removeTask", requestHandlers.removeTask);

// Redirect root URL to index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "www", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});