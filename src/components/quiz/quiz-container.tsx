'use client';

import { decodeStr, shuffleQuizAnswers } from '@/lib/utils';
import { Quiz } from '@/types';
import { Card, CardContent } from '../ui/card';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useMemo } from 'react';

interface QuizContainerProps {
  quiz: Quiz;
  onSelect: (s: string) => void;
}

export default function QuizContainer({ quiz, onSelect }: QuizContainerProps) {
  const { type, question, correct_answer, incorrect_answers } = quiz;

  const shuffledAnswers = useMemo(
    () => shuffleQuizAnswers(type, [correct_answer, ...incorrect_answers]),
    [correct_answer, incorrect_answers, type]
  );

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex min-h-40 flex-col justify-center">
        <CardContent className="">
          <h2 className="text-center text-xl">{decodeStr(question)}</h2>
        </CardContent>
      </Card>

      <ToggleGroup
        type="single"
        onValueChange={onSelect}
        variant="outline"
        className="grid w-full grid-cols-2 gap-2"
        spacing={1}
        key={question}
      >
        {shuffledAnswers.map((answer, i) => {
          return (
            <ToggleGroupItem
              value={answer}
              key={i}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground hover:cursor-pointer"
            >
              <span className="truncate">{decodeStr(answer)}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
