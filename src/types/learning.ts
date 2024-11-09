export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface MindMapNode {
  id: string;
  name: string;
  val: number;
  color?: string;
}

export interface MindMapLink {
  source: string;
  target: string;
  value: number;
}

export type InputType = 'text' | 'video' | 'voice' | 'image';
export type OutputType = 'summary' | 'flashcards' | 'mindmap' | 'quiz';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}