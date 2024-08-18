import { AppointmentType } from '@/types/enums';
import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z.string(),
  email: z.string().email('Invalid Email Address.'),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  // .max(100, 'Password must be at most 100 characters.')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  // .regex(/[0-9]/, 'Password must contain at least one number.')
  // .regex(/[@$!%*?&]/, 'Password must contain at least one special character.'),
});

export const SignInFormValidation = z.object({
  email: z.string().email('Invalid Email Address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name must be at most 100 characters'),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      'Invalid phone number',
    ),
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  insuranceProvider: z
    .string()
    .min(2, 'Insurance name must be at least 2 characters')
    .max(100, 'Insurance name must be at most 100 characters'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Policy number must be at least 2 characters')
    .max(100, 'Policy number must be at most 100 characters'),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z
    .union([z.custom<File[]>(), z.instanceof(Uint8Array), z.instanceof(Buffer)])
    .optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
});

export const AppointmentInternalFieldsSchema = z.object({
  appointmentId: z.number().nonnegative(),
  userId: z.number().nonnegative(),
  type: z.string(),
  patientId: z.number().nonnegative(),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  status: z.string().optional(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  notes: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  status: z.string().optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  status: z.string().optional(),
  reason: z.string().optional(),
  notes: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case AppointmentType.CREATE:
      return CreateAppointmentSchema;
    case AppointmentType.CANCEL:
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
