import { QuizRequest, QuizResponse } from '@/types';

function generateSearchParams(request: QuizRequest): string {
  let searchParams = '&encode=url3986';

  for (const [key, value] of Object.entries(request)) {
    if (value) {
      searchParams += `&${key}=${value}`;
    }
  }

  return searchParams;
}

export async function getQuizzes(request: QuizRequest): Promise<QuizResponse> {
  const searchParams = generateSearchParams(request);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}?${searchParams}`
  );

  if (!data.ok) {
    console.error('Terjadi kegagalan saat ambil data');
  }

  const quizResponse = data.json();

  return quizResponse;
}
