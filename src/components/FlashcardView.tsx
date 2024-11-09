import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Flashcard } from '../types/learning';

interface FlashcardViewProps {
  flashcards: Flashcard[];
}

export default function FlashcardView({ flashcards }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  if (!flashcards.length) {
    return (
      <div className="text-center text-gray-500">
        No flashcards available. Generate some first!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative w-full aspect-[3/2] cursor-pointer perspective-1000`}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-8 backface-hidden">
            <div className="flex items-center justify-center h-full text-xl">
              {flashcards[currentIndex].front}
            </div>
          </div>
          <div className="absolute w-full h-full bg-blue-50 rounded-xl shadow-lg p-8 rotate-y-180 backface-hidden">
            <div className="flex items-center justify-center h-full text-xl">
              {flashcards[currentIndex].back}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}