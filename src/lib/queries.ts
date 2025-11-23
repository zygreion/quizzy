import { QuizRequest, QuizResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function createSearchParams(request: QuizRequest): string {
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
  const searchParams = createSearchParams(request);
  const response = await fetch(`${API_URL}?${searchParams}`);

  if (!response.ok) {
    console.error('Terjadi kegagalan saat ambil data');
  }

  const quizResponse = await response.json();
  return quizResponse;
}
