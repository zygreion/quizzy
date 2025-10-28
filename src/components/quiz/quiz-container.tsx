'use client';

import { decodeStr, getTimer, setTimer } from '@/lib/utils';
import { Quiz } from '@/types';
import { Card, CardContent } from '../ui/card';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

interface QuizProps {
  quiz: Quiz;
  onSelect: (s: string) => void;
}

export default function QuizContainer({ quiz, onSelect }: QuizProps) {
  const { question, shuffled_answers } = quiz;

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
        {shuffled_answers?.map((answer, i) => {
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
