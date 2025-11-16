import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FlashCard as FlashCardType } from '../types';
import { RotateCcw } from 'lucide-react';

interface FlashCardProps {
  card: FlashCardType;
  isRevealed: boolean;
  onReveal: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ card, isRevealed, onReveal }) => {
  return (
    <div className="relative w-full mx-auto">
      <div 
        className={`relative w-full h-96 cursor-pointer transition-transform duration-700`}
        onClick={onReveal}
      >
        <div className={`absolute w-full h-full transition-all duration-200 translate-y-[0px] ${ isRevealed ? 'opacity-0 translate-y-[40px]' : 'opacity-100'}`}>
          <div className="h-full bg-white rounded shadow-sm border border-gray-100 p-8 flex flex-col">
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
                  onReveal();
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
          </div>
        </div>

        {/* Back of card (Answer) */}
        <div className={`absolute w-full transition-all duration-200 translate-y-[-40px] ${ isRevealed ? 'opacity-100 translate-y-[0px]' : 'opacity-0 '}`}>
          <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg border border-blue-100 p-8 flex flex-col">
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
                  onReveal();
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Flip card back"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            <div className="items-center justify-center">
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