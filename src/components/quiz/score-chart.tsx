'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '../ui/button';
import Link from 'next/link';
import { quizCategories } from '@/lib/data';
import { upperFirstChar } from '@/lib/utils';
import { useQuizzesStore, useProgressStore, usePreferenceStore } from '@/providers/zustand-providers';
import { notFound } from 'next/navigation';

const chartConfig = {
  incorrect: {
    label: 'Incorrect',
    color: 'var(--chart-5)',
  },
  correct: {
    label: 'Correct',
    color: 'var(--chart-2)',
  },
  unanswered: {
    label: 'Unanswered',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

export function ScoreChart() {
  const { difficulty, category } = usePreferenceStore((state) => state);
  const { quizzes, clearQuizzes } = useQuizzesStore((state) => state);
  const { answers, setEnded, clearAnswers, resetTimer } = useProgressStore(
    (state) => state
  );

  const { totalCorrect, totalIncorrect, totalUnanswered } =
    React.useMemo(() => {
      const totalCorrect = answers.filter(
        (ans, i) => ans === quizzes[i].correct_answer
      ).length;
      const totalIncorrect = answers.length - totalCorrect;
      const totalUnanswered = quizzes.length - answers.length;

      return {
        totalCorrect,
        totalIncorrect,
        totalUnanswered,
      };
    }, [quizzes, answers]);

  React.useEffect(() => {
    if (quizzes.length < 1) return notFound();

    setEnded(true);
  }, [quizzes.length, setEnded]);

  const { chartData, categoryDisplay, difficultyDisplay } =
    React.useMemo(() => {
      const chartData = [
        { type: 'correct', count: totalCorrect, fill: 'var(--color-correct)' },
        {
          type: 'incorrect',
          count: totalIncorrect,
          fill: 'var(--color-incorrect)',
        },
        {
          type: 'unanswered',
          count: totalUnanswered,
          fill: 'var(--color-unanswered)',
        },
      ];

      const categoryDisplay = category
        ? quizCategories.find((cat) => cat.id === category)?.name
        : 'Unknown Category';

      const difficultyDisplay = difficulty
        ? difficulty !== 'any'
          ? upperFirstChar(difficulty)
          : 'Any Difficulty'
        : 'Unknown Difficulty';

      return {
        chartData,
        categoryDisplay,
        difficultyDisplay,
      };
    }, [category, difficulty, totalCorrect, totalIncorrect, totalUnanswered]);

  const clearData = React.useCallback(() => {
    setTimeout(() => {
      clearQuizzes();
      clearAnswers();
      resetTimer();
    }, 2000);
  }, [clearAnswers, clearQuizzes, resetTimer]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your Score</CardTitle>
        <CardDescription>
          {categoryDisplay} | {difficultyDisplay}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          +{totalCorrect.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Points
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <span>
            You&apos;ve answered {totalCorrect + totalIncorrect} out of{' '}
            {totalCorrect + totalIncorrect + totalUnanswered} questions
          </span>
        </div>
        <div className="text-muted-foreground leading-none">
          with {totalCorrect} correct and {totalIncorrect} incorrect answers.
        </div>

        <Button asChild className="mt-4" onClick={clearData}>
          <Link href="/">Generate More Quiz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
