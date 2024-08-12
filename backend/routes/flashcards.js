

const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Create Flashcard
router.post('/flashcards', (req, res) => {
    const { question, answer } = req.body;
    connection.query(
        'INSERT INTO Flashcard (question, answer) VALUES (?, ?)',
        [question, answer],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create flashcard' });
            }
            res.status(201).json({ id: results.insertId, question, answer });
        }
    );
});

// Get All Flashcards
router.get('/flashcards', (req, res) => {
    connection.query('SELECT * FROM Flashcard', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve flashcards' });
        }
        res.status(200).json(results);
    });
});

// Get Single Flashcard
router.get('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    connection.query(
        'SELECT * FROM Flashcard WHERE id = ?',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve flashcard' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Flashcard not found' });
            }
            res.status(200).json(results[0]);
        }
    );
});

// Update Flashcard
router.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    connection.query(
        'UPDATE Flashcard SET question = ?, answer = ? WHERE id = ?',
        [question, answer, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update flashcard' });
            }
            res.status(200).json({ id, question, answer });
        }
    );
});

// Delete Flashcard
router.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM Flashcard WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete flashcard' });
        }
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    });
});

module.exports = router;
