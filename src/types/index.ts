export interface Question {
  id: number;
  text: string;
  options?: string[];
  correctAnswer?: string;
  // Add any other properties that a Question might have
}

// You can add other types here as well
export interface Answer {
  questionId: number;
  selectedOption: string;
}

// Add any other types your application might need