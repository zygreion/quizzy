import { Quiz } from '@/types';
import { createContext, useContext, useState } from 'react';

export const QuizContext = createContext<Quiz[]>([]);
export const useQuiz = () => useContext(QuizContext);

interface QuizProviderProps {
  children: React.ReactNode;
}

export default function QuizProvider({ children }: QuizProviderProps) {
  const [globalQuiz, setGlobalQuiz] = useState<Quiz[]>([]);

  // return <QuizContext.Provider value={{globalQuiz, setGlobalQuiz}}>{children}</QuizContext.Provider>;
}
