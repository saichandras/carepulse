import { toast } from 'react-toastify';

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const handleError = (error: unknown) => {
  if (typeof window !== 'undefined') {
    // Client-side error handling
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as ErrorResponse;
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } else if (typeof error === 'string') {
      toast.error(error);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unexpected error occurred');
    }
  } else {
    // Server-side error handling
    console.error(error);
  }
};

export const handleSuccess = (message: string) => {
  if (typeof window !== 'undefined') {
    toast.success(message);
  }
};

export const handleWarning = (message: string) => {
  if (typeof window !== 'undefined') {
    toast.warn(message);
  }
};

export const handleInfo = (message: string) => {
  if (typeof window !== 'undefined') {
    toast.info(message);
  }
};
