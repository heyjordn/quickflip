import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from "react-router";
import { DefaultLayout } from '../layouts/DefaultLayout';
import { useNavigate } from 'react-router';
import { parseGitHubUrl, findQuickFlipYamlFile } from '../utils/importYaml';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { FlashCard as FlashCardComponent } from '../components/FlashCard';
import { FlashCard } from '../types';

function Study(){
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const [cards, setCards] = useState<FlashCard[]>([{
    id: "1",
    question: "",
    category: "",
    answer: ""
  }])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [studyStarted, setStudyStarted] = useState(false);

  useEffect(() => {
      if (!searchParams.get("flashcards")) {
        navigator("/");
      }
      return () => {}
  }, [searchParams])

  const fetchYaml = useCallback(() => {
    let githubUrl = searchParams.get("flashcards") ?? "";
    console.log(searchParams.get("flashcards"))
    if (!githubUrl) {
      navigator("/");
      return () => {};
    }
    
    const {owner, repo} = parseGitHubUrl(githubUrl);

    findQuickFlipYamlFile(owner, repo)
      .then((cardsFromYaml: FlashCard[]) => setCards(cardsFromYaml))
      .catch(() => setCards([]));
    
      return () => {};
  }, []);

  useEffect(() => {
    fetchYaml()  
  }, [fetchYaml]);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsRevealed(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const resetSession = () => {
    setCards([]);
    setCurrentIndex(0);
    setIsRevealed(false);
    setStudyStarted(false);
  };

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {      
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
          handleReveal();
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
  }, [currentIndex, studyStarted, isRevealed]);

    if (cards.length < 0) {
      return (
        <DefaultLayout>
          <p>No Flash Cards found in this repository.</p>
        </DefaultLayout>
      )
    }
    return (
        <DefaultLayout>
          <div>
            <div className="max-w-4xl mx-auto">
              {/* Header */}        
                {/* <div className="flex gap-2">
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
                </div>*/}
              </div> 
              {/* Progress Bar */}
              <div className="mb-8">
                <ProgressBar current={currentIndex} total={cards.length} />
              </div>
              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-2 py-3 bg-white text-gray-700 font-medium rounded-sm  hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              {/* Flash Card */}
              <div className="relative flex-1 mb-8">
                <FlashCardComponent 
                  card={cards[currentIndex]}
                  isRevealed={isRevealed}
                  onReveal={handleReveal}
                />
              </div>
                <button
                  onClick={nextCard}
                  disabled={currentIndex === cards.length - 1}
                  className="flex items-center px-2 py-3 bg-white text-gray-700 font-medium rounded-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              {/* Completion Message */}
              {currentIndex === cards.length - 1 && isRevealed && (
                <div className="my-8 text-center">
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
          </div>
        </DefaultLayout>
    )
}

export default Study