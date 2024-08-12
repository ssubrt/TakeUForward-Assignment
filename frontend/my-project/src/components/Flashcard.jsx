// File: frontend/src/components/Flashcard.js

import React, { useState } from 'react';
import './Flashcard.css'; // We'll add some custom styles for the flip effect

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative w-full h-48 bg-white border rounded-lg shadow-lg cursor-pointer transform transition-transform duration-500 ease-in-out ${flipped ? 'rotate-y-180' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {flipped ? <p className="text-lg">{answer}</p> : <p className="text-lg">{question}</p>}
      </div>
    </div>
  );
};

export default Flashcard;
