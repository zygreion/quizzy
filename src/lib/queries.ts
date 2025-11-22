import { QuizRequest, QuizResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function generateSearchParams(request: QuizRequest): string {
  const searchParams = new URLSearchParams({
    encode: 'url3986',
  });

  for (const [key, value] of Object.entries(request)) {
    if (value) {
      searchParams.append(key, value);
    }
  }

  return searchParams.toString();
}

export async function getQuizzes(request: QuizRequest): Promise<QuizResponse> {
  const searchParams = generateSearchParams(request);
  const data = await fetch(`${API_URL}?${searchParams}`);

  if (!data.ok) {
    console.error('Terjadi kegagalan saat ambil data');
  }

  const quizResponse = await data.json();
  return quizResponse;
}
