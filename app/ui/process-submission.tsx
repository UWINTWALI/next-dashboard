'use client';

import { useFormStatus } from "react-dom";

interface SubmitProcessingButtonProps {
  label: string;
  icon?: React.ReactNode; 
  className?: string;
}

export function SubmitProcessingButton({
  label,
  icon,
  className = "",
}: SubmitProcessingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex h-10 items-center rounded-lg px-4 text-sm font-medium text-gray-600 transition-colors disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
    >
      {pending ? (
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="ml-2 hidden md:block">Processing...</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          {icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
}
