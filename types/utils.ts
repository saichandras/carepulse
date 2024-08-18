// src/types/utils.ts

import { AppointmentStatus } from './enums';

export type Gender = 'Male' | 'Female' | 'Other';
export type Status =
  | AppointmentStatus.PENDING
  | AppointmentStatus.SCHEDULED
  | AppointmentStatus.CANCELLED;

export interface SearchParamProps {
  params: { [key: string]: string | number };
  searchParams: { [key: string]: string | number | string[] | undefined };
}
