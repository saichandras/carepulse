'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  color?: 'green' | 'blue' | 'red' | 'light' | 'dark' | 'white';
  className?: string;
};

const sizeClasses = {
  small: 'w-4 h-4 border-2',
  medium: 'w-8 h-8 border-4',
  large: 'w-12 h-12 border-4',
};

const colorClasses = {
  green: 'border-green-500 border-t-transparent',
  blue: 'border-blue-500 border-t-transparent',
  red: 'border-red-500 border-t-transparent',
  light: 'border-light-200 border-t-transparent',
  dark: 'border-dark-500 border-t-transparent',
  white: 'border-white border-t-transparent', // Added white color
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'green', className }) => {
  return (
    <div
      className={cn('animate-spin rounded-full', sizeClasses[size], colorClasses[color], className)}
    />
  );
};

export default Spinner;
