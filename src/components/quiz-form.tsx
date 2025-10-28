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
import { Label } from './ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';

const defaultValues: QuizRequest = {
  amount: 5,
  category: -1,
  type: 'any',
  difficulty: 'any',
};

export default function QuizForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<QuizRequest>({
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={5}
                  max={50}
                  step={5}
                  {...field}
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
                required
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                required
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {quizDifficulties.map((dif) => (
                      <SelectItem key={dif} value={dif}>
                        {upperFirstChar(dif === 'any' ? 'Any Difficulty' : dif)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
