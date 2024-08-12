// File: frontend/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = ({ updateFlashcards }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await axios.get('http://localhost:5000/api/flashcards');
    setFlashcards(response.data);
    updateFlashcards(response.data);
  };

  const handleAddFlashcard = async () => {
    await axios.post('http://localhost:5000/api/flashcards', { question, answer });
    setQuestion('');
    setAnswer('');
    fetchFlashcards();
    toast.success("Added")
  };

  const handleEditFlashcard = async (id) => {
    await axios.put(`http://localhost:5000/api/flashcards/${id}`, { question, answer });
    setEditingFlashcard(null);
    setQuestion('');
    setAnswer('');
    fetchFlashcards();
    toast.success("Edited")
   
  };

  const handleDeleteFlashcard = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
    fetchFlashcards();
    toast.error("Deleted")
  };

  const startEditing = (flashcard) => {
    setEditingFlashcard(flashcard.id);
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
  };

  const handleSubmit = () => {
    if (editingFlashcard) {
      handleEditFlashcard(editingFlashcard);
    } else {
      handleAddFlashcard();
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-8 bg-gray-100 rounded-lg shadow-lg overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded w-full"
        >
          {editingFlashcard ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
      </div>

      <ul className="overflow-y-auto">
        {flashcards.map((flashcard) => (
          <li key={flashcard.id} className="mb-2 flex justify-between items-center">
            <span className="mr-4">{flashcard.question}</span>
            <div>
              <button
                onClick={() => startEditing(flashcard)}
                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFlashcard(flashcard.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
