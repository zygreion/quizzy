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
import { quizCategories } from '@/lib/data';
import { Input } from '../ui/input';
import { quizDifficulties, QuizRequest, ResponseCodeMessages } from '@/types';
import { getQuizzes } from '@/lib/queries';
import { Button } from '../ui/button';
import { upperFirstChar } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Spinner } from '../ui/spinner';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useQuizzesStore, useProgressStore, usePreferenceStore } from '@/providers/zustand-providers';

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
  const { amount, category, difficulty, type, setPreference } =
    usePreferenceStore((state) => state);
  const { setQuizzes } = useQuizzesStore((state) => state);
  const { clearAnswers, setEnded } = useProgressStore((state) => state);

  const router = useRouter();
  const form = useForm<QuizRequest>({
    defaultValues: { amount, category, difficulty, type },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = handleSubmit(async (data: QuizRequest) => {
    const clearedData = clearAnyValues(data);
    const { response_code, results: quizzes } = await getQuizzes(clearedData);

    if (response_code !== undefined && response_code !== 0) {
      const errorMessage = ResponseCodeMessages[response_code];

      setError('root', {
        message: `${errorMessage}: Please try another combination`,
      });
      return;
    }

    clearAnswers();
    setEnded(false);
    setQuizzes(quizzes);
    setPreference({
      ...data,
      amount: Number(data.amount),
      category: Number(data.category),
    });

    router.push('/quiz');
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  onValueChange={field.onChange}
                  value={field.value}
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
              {errors.root && (
                <p className="text-destructive text-sm">
                  {errors.root.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="not-disabled:hover:cursor-pointer"
        >
          {!isSubmitting ? 'Submit' : <Spinner />}
        </Button>
      </form>
    </Form>
  );
}
