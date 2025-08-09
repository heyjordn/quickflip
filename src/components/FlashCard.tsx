import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FlashCard as FlashCardType } from '../types';
import { RotateCcw } from 'lucide-react';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ card, isFlipped, onFlip }) => {
  return (
    <div className="relative w-full mx-auto">
      <div 
        className={`relative w-full h-96 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
      >
        {/* Front of card (Question) */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="h-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                {card.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {card.category}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFlip();
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Flip card"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="prose prose-lg max-w-none text-center">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {card.question}
                </ReactMarkdown>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Click to reveal answer</p>
            </div>
          </div>
        </div>

        {/* Back of card (Answer) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-100 p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Answer
                </span>
                {card.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {card.category}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFlip();
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Flip card back"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="prose prose-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {card.answer}
                </ReactMarkdown>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Click to see question again</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};