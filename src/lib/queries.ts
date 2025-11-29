import { QuizRequest, QuizResponses } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function createSearchParams<
  T extends Record<string, string | number | boolean | undefined>,
>(obj: T, mapper?: Partial<Record<keyof T, string>>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    const newKey = (mapper && mapper[key]) || key;
    if (value !== undefined) searchParams.append(newKey, value.toString());
  }

  return searchParams.toString();
}

export async function getQuizzes(request: QuizRequest) {
  const searchParams = createSearchParams(
    { ...request, encode: 'url3986' },
    { category_id: 'category' }
  );
  const response = await fetch(`${API_URL}?${searchParams}`);

  if (!response.ok) {
    console.error('Terjadi kegagalan saat ambil data');
  }

  const quizResponse = await response.json();
  return quizResponse as QuizResponses;
}
