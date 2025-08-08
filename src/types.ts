export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FlashCardSet {
  id: string;
  name: string;
  source: string;
  cards: FlashCard[];
  importedAt: Date;
}