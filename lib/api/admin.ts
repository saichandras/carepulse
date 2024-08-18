import getBaseUrl from '../getBaseUrl';
import { handleError } from '../handleError';

export async function validatePasskey(passkey: string): Promise<void> {
  try {
    const baseUrl = getBaseUrl(); // Get the base URL of the application
    const response = await fetch(`${baseUrl}/api/auth/validate-passkey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passkey }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Invalid passkey. Please try again.');
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
}
