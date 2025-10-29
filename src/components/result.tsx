'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
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

export const description = 'A donut chart with text';

const chartData = [
  { type: 'correct', count: 20, fill: 'var(--color-correct)' },
  { type: 'incorrect', count: 4, fill: 'var(--color-incorrect)' },
  { type: 'unanswered', count: 1, fill: 'var(--color-unanswered)' },
];

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

export function ChartPieDonutText() {
  const { totalCorrect, totalIncorrect, totalUnanswered } =
    React.useMemo(() => {
      return {
        totalCorrect:
          chartData.find((data) => data.type === 'correct')?.count ?? 0,
        totalIncorrect:
          chartData.find((data) => data.type === 'incorrect')?.count ?? 0,
        totalUnanswered:
          chartData.find((data) => data.type === 'unanswered')?.count ?? 0,
      };
    }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your Score</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
          <span> You've answered {totalCorrect} correct answers</span>
        </div>
        <div className="text-muted-foreground leading-none">
          out of {totalCorrect + totalIncorrect + totalUnanswered} questions
          with {totalIncorrect} incorrect answers.
        </div>
      </CardFooter>
    </Card>
  );
}
