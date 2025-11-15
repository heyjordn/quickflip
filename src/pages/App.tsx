import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';
import FlashCardImporter from '../components/FlashCardImporter';
import { useNavigate } from 'react-router';


function App() {
  const navigator = useNavigate();

  const studyCardList= [
    {
      label: "CKAD",
      imageUrl: "https://training.linuxfoundation.org/wp-content/uploads/2020/08/CKAD_badge-300x300.png",
      repository: "https://github.com/heyjordn/quickflip-ckad"
    },
    {
      label: "CKS",
      imageUrl: "https://training.linuxfoundation.org/wp-content/uploads/2024/04/CKS-300x285.png",
      repository: "https://github.com/heyjordn/quickflip-ckad"
    },
    {
      label: "CKA",
      repository: "https://github.com/heyjordn/quickflip-ckad"
    },
    {
      label: "CKA",
      repository: "https://github.com/heyjordn/quickflip-ckad"
    },
    {
      label: "CKA",
      repository: "https://github.com/heyjordn/quickflip-ckad"
    },
  ]
  return (
    <DefaultLayout>
      <div className="min-h-screen">
        <FlashCardImporter/>
        <div className='grid grid-cols-4 gap-3 mt-10'>
          {studyCardList.map((card, index) => (
            <div onClick={() => navigator(`/study?flashcards=${card.repository}`)} className='h-[150px] w-[150px] md:h-[250px] md:w-[250px] cursor-pointer p-4 flex items-center flex-col bg-white outline-1 border shadow-sm rounded-sm hover:shadow-md transition-shadow' key={index}>
              <div>
                <img className='max-w-[120px] max-h-[120px] md:max-w-[180px] md:max-h-[180px]' src={card.imageUrl ?? "https://placehold.co/250x250"} alt="" />
              </div>
              <h3 className='text-xl font-bold text-gray-800'>{card.label}</h3>
              <a href={card.repository} target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            </div>
          ))}
        </div>

      </div>
    </DefaultLayout>
    
  );
}

export default App;