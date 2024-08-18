import { CreateUserParams, User } from '@/types/models';
import { handleError, handleSuccess } from '../handleError';
import getBaseUrl from '../getBaseUrl';

export async function createUser(userData: CreateUserParams): Promise<User> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to register user');
    }

    return responseData.user;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function loginUser(userData: { email: string; password: string }): Promise<User> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to login user');
    }

    return responseData.user;
  } catch (error) {
    handleError(error);
    throw error;
  }
}


// Function to get a user by ID
export async function getUser(userId: number): Promise<User> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/users/${userId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch user');
    }

    const { user } = responseData;
    return user;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function logoutUser(role: 'user' | 'admin'): Promise<void> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Failed to log out');
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
}

