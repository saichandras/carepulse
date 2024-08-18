// src/types/models.ts
import { Gender, Status } from './utils';

// User
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export type CreateUserParams = Omit<User, 'id'>;

// Patient
export interface Patient {
  id: number;
  userId: number;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: Uint8Array;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}

export type RegisterPatientParams = Omit<Patient, 'id'>;

export type FullPatient = Merge<User, Patient>;

export interface PostPatientResponse {
  status: string; // Indicates the success or failure of the operation
  data: {
    patient: Patient; // The patient object returned from the API
  };
  message?: string; // Optional success or informational message
  error?: string; // Optional error message
  meta?: {
    [key: string]: any; // Optional metadata for additional info
  };
}

export interface GetPatientResponse {
  status: string; // Indicates the success or failure of the operation
  data: {
    patient: Patient | null; // The patient object returned from the API, null if not found
  };
  message?: string; // Optional success or informational message
  error?: string; // Optional error message
}

// Appointment
export interface Appointment {
  id: number;
  userId: number;
  patientId: number;
  primaryPhysician: string;
  schedule: Date;
  status: Status;
  reason: string | null;
  notes: string | null;
  cancellationReason: string | null;
}

export interface AppointmentData {
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  appointments: Appointment[];
}

export interface PostAppointmentParams extends Omit<Appointment, 'id'> {
  type: string;
}

export interface PostAppointmentResponse {
  status: string; // Indicates the success or failure of the operation
  data: {
    appointment: Appointment; // The appointment object returned from the API
  };
  message?: string; // Optional success or informational message
  error?: string; // Optional error message
  meta?: {
    [key: string]: any; // Optional metadata for additional info
  };
}

export interface UpdateAppointmentParams extends Omit<Appointment, 'id'> {
  appointmentId: number;
  type: string;
}

export interface GetAppointmentResponse {
  status: string; // Indicates the success or failure of the operation
  data: AppointmentData;
  message?: string; // Optional success or informational message
  error?: string; // Optional error message
}
