// File: frontend/src/App.js

import React, { useState, useEffect } from 'react';
import FlashcardContainer from './components/FlashcardContainer';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  const fetchFlashcards = async () => {
    const response = await axios.get('http://localhost:5000/api/flashcards');
    setFlashcards(response.data);
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen flex">
      <div className="w-1/2 h-full">
        <FlashcardContainer flashcards={flashcards} />
      </div>
      <div className="w-1/2 h-full">
        <Dashboard updateFlashcards={fetchFlashcards} />
      </div>
    </div>
  );
}

export default App;
