'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';
import { dummyQuizzes, quizCategories } from '@/lib/data';
import { Input } from './ui/input';
import { quizDifficulties, QuizRequest, quizTypes } from '@/types';
import { getQuizzes } from '@/lib/queries';
import { Button } from './ui/button';
import { useCallback, useState } from 'react';
import { shuffleArray, upperFirstChar } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const defaultValues: QuizRequest = {
  amount: 5,
  category: -1,
  type: 'any',
  difficulty: 'any',
};

export default function QuizForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<QuizRequest>({
    defaultValues,
  });

  const onSubmit = useCallback(async (data: QuizRequest) => {
    const newData = { ...data };

    if (isLoading) return;
    setIsLoading(true);

    for (const [key, value] of Object.entries(newData) as [
      keyof QuizRequest,
      string,
    ][]) {
      if (
        (key === 'category' && Number(value) === -1) ||
        ((key === 'difficulty' || key === 'type') && value === 'any')
      ) {
        newData[key] = undefined;
      }
    }

    const res = await getQuizzes(newData);
    const quizzes = res.results;

    for (const quiz of quizzes) {
      quiz.shuffled_answers = shuffleArray([
        quiz.correct_answer,
        ...quiz.incorrect_answers,
      ]);
    }
    dummyQuizzes.push(...quizzes);

    setIsLoading(false);
    router.push('/quiz/0');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            min={5}
            max={50}
            step={5}
            onChange={field.onChange}
            defaultValue={field.value}
            className="w-[180px]"
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {quizCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {quizDifficulties.map((dif) => (
                  <SelectItem key={dif} value={dif}>
                    {upperFirstChar(dif)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {quizTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {upperFirstChar(type)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}
