'use client';

import { useForm } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';
import { dummyQuizzes, quizCategories } from '@/lib/data';
import { Input } from '../ui/input';
import { quizDifficulties, QuizRequest } from '@/types';
import { getQuizzes } from '@/lib/queries';
import { Button } from '../ui/button';
import { useCallback, useState } from 'react';
import { shuffleQuizAnswers, upperFirstChar } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Spinner } from '../ui/spinner';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const defaultValues: QuizRequest = {
  amount: 5,
  category: -1,
  type: 'any',
  difficulty: 'any',
};

function clearAnyValues(data: QuizRequest): QuizRequest {
  const newData = { ...data };

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

  return newData;
}

export default function QuizForm() {
  const router = useRouter();
  const form = useForm<QuizRequest>({
    defaultValues,
  });

  const onSubmit = useCallback(async (data: QuizRequest) => {
    const newData = clearAnyValues(data);
    const res = await getQuizzes(newData);
    const quizzes = res.results;

    for (const quiz of quizzes) {
      const { type, correct_answer, incorrect_answers } = quiz;

      quiz.shuffled_answers = shuffleQuizAnswers(type, [
        correct_answer,
        ...incorrect_answers,
      ]);
    }
    dummyQuizzes.push(...quizzes);
    router.push('/quiz');
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
              <FormControl>
                <ToggleGroup
                  type="single"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  variant="outline"
                  className="grid w-full grid-cols-4 gap-2"
                  spacing={1}
                >
                  {quizDifficulties.map((dif, i) => {
                    return (
                      <ToggleGroupItem value={dif} key={i}>
                        <span className="truncate">{upperFirstChar(dif)}</span>
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="not-disabled:hover:cursor-pointer"
        >
          {!form.formState.isSubmitting ? 'Submit' : <Spinner />}
        </Button>
      </form>
    </Form>
  );
}
