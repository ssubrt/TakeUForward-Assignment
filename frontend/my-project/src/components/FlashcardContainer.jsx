// File: frontend/src/components/FlashcardContainer.js

import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

const FlashcardContainer = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (flashcards.length === 0) return <div>No flashcards available.</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className='font-bold '>
      Click The Card For Answer 
      </div>
      <Flashcard
        question={flashcards[currentIndex].question}
        answer={flashcards[currentIndex].answer}
      />
      <div className="flex justify-between mt-4 w-full">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardContainer;
