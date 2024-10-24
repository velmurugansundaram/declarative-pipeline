const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Addition endpoint
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    res.status(200).json({ result: sum });
});

// Subtraction endpoint
app.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    const difference = num1 - num2;
    res.status(200).json({ result: difference });
});

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = { app, server };  // Export the app and server
