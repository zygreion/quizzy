import { twMerge } from 'tailwind-merge';

interface IconProps {
  className?: string;
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg
      className={twMerge('h-6 w-6 text-gray-800 dark:text-white', className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
      />
    </svg>
  );
}
