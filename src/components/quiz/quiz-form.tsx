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
import { quizDifficulties, Preference, ResponseCodeMessages } from '@/types';
import { getQuizzes } from '@/lib/queries';
import { Button } from '../ui/button';
import { typedEntries, upperFirstChar } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Spinner } from '../ui/spinner';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useQuizzesStore } from '@/hooks/use-quizzes-store';
import { useProgressStore } from '@/hooks/use-progress-store';
import { useAccountStore } from '@/hooks/use-account-store';
import { updatePreference } from '@/actions/quiz';
import { useEffect } from 'react';

function clearAnyValues(data: Preference): Preference {
  const newData = { ...data };

  for (const [key, value] of typedEntries(data)) {
    if (
      (key === 'category_id' && value === 0) ||
      ((key === 'difficulty' || key === 'type') && value === 'any')
    ) {
      newData[key] = undefined;
    }
  }

  return newData;
}

export default function QuizForm() {
  const {
    preference: { amount, category_id, difficulty, type },
    setPreference,
  } = useAccountStore((state) => state);
  const { setQuizzes, clearQuizzes } = useQuizzesStore((state) => state);
  const { ended, clearAnswers, setEnded, resetTimer } = useProgressStore(
    (state) => state
  );

  const router = useRouter();
  const form = useForm<Preference>({
    defaultValues: { amount, category_id, difficulty, type },
  });

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  useEffect(() => {
    reset({ amount, category_id, difficulty, type });
  }, [amount, category_id, difficulty, type, reset]);

  const onSubmit = handleSubmit(async (rawData: Preference) => {
    const mappedData = {
      ...rawData,
      amount: Number(rawData.amount),
      category_id: Number(rawData.category_id),
    };

    const requestData = clearAnyValues(mappedData);
    const { response_code, results: quizzes } = await getQuizzes(requestData);

    if (response_code !== undefined && response_code !== 0) {
      const errorMessage = ResponseCodeMessages[response_code];

      setError('root', {
        message: `${errorMessage}: Please try another combination`,
      });

      return;
    }

    setQuizzes(quizzes);
    setPreference(mappedData);

    await updatePreference({
      type: mappedData.type,
      difficulty: mappedData.difficulty,
      amount: mappedData.amount,
      category_id: Number(mappedData.category_id),
    });

    router.push('/home/quiz');
  });

  // Clear previous quizz progress
  useEffect(() => {
    if (ended) {
      setEnded(false);
      clearQuizzes();
      clearAnswers();
      resetTimer();
    }
  }, [clearAnswers, clearQuizzes, ended, resetTimer, setEnded]);

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
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => value && field.onChange(value)}
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
