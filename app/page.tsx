// app/page.tsx
import React from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function HomePage() {
  return (
    <AuthLayout centerLogo={true}>
      <div className="mt-5 flex items-center flex-col gap-y-8">
        <Link href="/signin">
          <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-96">
            Sign In
          </button>
        </Link>
        <Link href="/signup">
          <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96">
            Sign Up
          </button>
        </Link>
      </div>
    </AuthLayout>
  );
}
