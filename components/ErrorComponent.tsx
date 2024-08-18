// src/components/ErrorComponent.tsx
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface ErrorComponentProps {
  message: string;
  retryUrl: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, retryUrl }) => (
  <div className="flex h-screen items-center justify-center text-white">
    <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-md text-center">
      <h2 className="text-3xl font-bold mb-4 text-red-400">Oops! Something went wrong.</h2>
      <p className="text-gray-300 mb-6">{message}</p>
      <Button variant="outline" className="shad-primary-btn" asChild>
        <Link
          href={retryUrl}
          className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600"
        >
          Try Again
        </Link>
      </Button>
    </div>
  </div>
);

export default ErrorComponent;
