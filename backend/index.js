// File: backend/index.js

const express = require('express');
const cors = require('cors');
const flashcardsRouter = require('./routes/flashcards');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', flashcardsRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
