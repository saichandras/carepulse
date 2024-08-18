// src/types/enums.ts

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'password',
}

export enum AppointmentType {
  CREATE = 'create',
  CANCEL = 'cancel',
  SCHEDULE = 'schedule',
  RESCHEDULE = 'reschedule',
}

export enum AppointmentStatus {
  APPOINTMENTS = 'appointments',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  SCHEDULED = 'scheduled',
}

export enum UserTypes {
  USER = 'user',
  ADMIN = 'admin'
}