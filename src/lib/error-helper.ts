export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options?: {
    catchFn?: (error: unknown) => void;
    finallyFn?: () => void;
    fallback?: T;
  }
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (options?.catchFn) {
      options.catchFn(error);
    } else {
      console.error(error);
    }

    return options?.fallback as T;
  } finally {
    if (options?.finallyFn) {
      options.finallyFn();
    }
  }
}
