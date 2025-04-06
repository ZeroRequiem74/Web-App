const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to load the game
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Portfolio pages routes
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'education.html'));
});

app.get('/job-experience', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'job-experience.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
