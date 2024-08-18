const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.origin;
  } else if (process.env.NEXT_PUBLIC_BASE_URL) {
    // Server-side with environment variable
    return process.env.NEXT_PUBLIC_BASE_URL;
  } else {
    // Default fallback for server-side
    return 'http://localhost:3000';
  }
};

export default getBaseUrl;
