import {
  Appointment,
  AppointmentData,
  GetAppointmentResponse,
  PostAppointmentParams,
  PostAppointmentResponse,
  UpdateAppointmentParams,
} from '@/types/models';
import getBaseUrl from '../getBaseUrl';
import { revalidatePath } from 'next/cache';

// Function to create an appointment for a patient
export async function createAppointment(
  appointmentData: PostAppointmentParams,
): Promise<Appointment> {
  // Function returns an Appointment object
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    // Parse the JSON response
    const responseData: PostAppointmentResponse = await response.json();

    // Check if the response was successful
    if (!response.ok || responseData.status !== 'success') {
      // Handle errors if the API responds with a failure status
      throw new Error(responseData.error || 'Failed to create appointment');
    }

    // Return the appointment object from the data
    return responseData.data.appointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error; // Re-throw the error for handling further up the call stack
  }
}

interface GetAppointmentsOptions {
  appointmentId?: number;
  userId?: number;
}

// Function to get an appointment by ID, user ID, or other parameters
export async function getAppointments(options?: GetAppointmentsOptions): Promise<AppointmentData> {
  try {
    const baseUrl = getBaseUrl();
    const url = new URL('/api/appointments', baseUrl);

    // Append appointmentId or userId as query parameters if provided
    if (options && options.appointmentId) {
      url.searchParams.append('appointmentId', options.appointmentId.toString());
    }
    if (options && options.userId) {
      url.searchParams.append('userId', options.userId.toString());
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData: GetAppointmentResponse = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to fetch appointments');
    }

    return responseData.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

// Function to update an appointment
export async function updateAppointment(
  appointmentData: UpdateAppointmentParams,
): Promise<Appointment> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/appointments`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update appointment');
    }

    const responseData: PostAppointmentResponse = await response.json();
    return responseData.data.appointment;
  } catch (error) {
    throw error;
  }
}
