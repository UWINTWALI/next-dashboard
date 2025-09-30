'use client';

import { useTransition } from 'react';

interface LoadingButtonProps {
  label?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean; // Optional override
}

export function LoadingButton({
  label,
  onClick,
  icon,
  className = '',
  loading: externalLoading,
}: LoadingButtonProps) {
  const [isPending, startTransition] = useTransition();
  const isLoading = externalLoading ?? isPending;

  const handleClick = () => {
    startTransition(() => {
      onClick();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-600 transition-colors disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          {label && <span className="ml-2 hidden md:block">...</span>}
        </>
      ) : (
        <>
          {label && <span>{label}</span>}
          {icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
}
