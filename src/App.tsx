import React, { useState, useEffect } from 'react';
import { FlashCard } from './components/FlashCard';
import { ProgressBar } from './components/ProgressBar';
import QuickFlipLogo from './assets/images/logo.png';
import FlashCardImporter from './components/FlashCardImporter';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from 'lucide-react';

function App() {
  let initialCards : FlashCard = [{
    id: '',
    question: "",
    answer: "",
    category: ""
  }];

  let initialCurrentCard: FlashCard = {
    id: '',
    question: "",
    answer: "",
    category: ""
  };

  const [_, setCurrentCard] = useState(initialCurrentCard)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [studyStarted, setStudyStarted] = useState(false);


  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetSession = () => {
    setCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudyStarted(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!studyStarted) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevCard();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextCard();
          break;
        case ' ':
          event.preventDefault();
          handleFlip();
          break;
        case 'r':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            shuffleCards();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, studyStarted, isFlipped]);

  if (!studyStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center mx-auto mb-4">
            <img className="max-h-10" src={QuickFlipLogo} alt="Quick Flip Logo" />
            </div>
            <p className="text-gray-600">Ready to start your study session?</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="text-left space-y-2">
              <h3 className="font-semibold text-gray-800">Keyboard Shortcuts:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←→</kbd> Navigate cards</p>
                <p><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd> Flip card</p>
                <p><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+R</kbd> Shuffle</p>
              </div>
            </div>
          </div>
          <FlashCardImporter
            onImport={(flashCardSet) => {
              setStudyStarted(true);
              setCards(flashCardSet.cards);
              setCurrentCard(cards[currentIndex])
            }}
            onClose={() => {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <img className="max-h-10" src={QuickFlipLogo} alt="Quick Flip Logo" />
            </div>
          </div>          
          <div className="flex gap-2">
            <button
              onClick={shuffleCards}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Shuffle cards (Ctrl+R)"
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={resetSession}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Reset session"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar current={currentIndex} total={cards.length} />
        </div>
        
        {/* Completion Message */}
        {currentIndex === cards.length - 1 && isFlipped && (
          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎉 Study Session Complete!
              </h3>
              <p className="text-green-700 mb-4">
                You've reviewed all {cards.length} cards. Great job!
              </p>
              <button
                onClick={resetSession}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Start New Session
              </button>
            </div>
          </div>
        )}

        {/* Flash Card */}
        <div className="mb-8">
          <FlashCard 
            card={cards[currentIndex]}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleFlip}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              {isFlipped ? 'Show Question' : 'Show Answer'}
            </button>
          </div>

          <button
            onClick={nextCard}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;