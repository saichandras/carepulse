import {
  GetPatientResponse,
  Patient,
  PostPatientResponse,
  RegisterPatientParams,
} from '@/types/models';
import { handleError } from '../handleError';
import getBaseUrl from '../getBaseUrl';

// Function to register a patient
export async function registerPatient(patientData: RegisterPatientParams): Promise<Patient> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    const responseData: PostPatientResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to create patient');
    }

    return responseData.data.patient;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// Function to get a patient by user ID
export async function getPatient(userId: string | number): Promise<Patient | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/patients', baseUrl);
    url.searchParams.append('userId', userId.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData: GetPatientResponse = await response.json();

    if (response.status !== 200) {
      throw new Error(responseData.message || 'Failed to fetch patient');
    }

    return responseData.data.patient;
  } catch (error) {
    throw error;
  }
}
