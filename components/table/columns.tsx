'use client';

import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Patient } from '@/types/models';
import { Status } from '@/types/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import AppointmentModal from '../AppointmentModal';
import StatusBadge from '../StatusBadge';
import { AppointmentType, UserTypes } from '@/types/enums';

export type CompleteAppointmentData = {
  id: number;
  userId: number;
  patientId: number;
  primaryPhysician: string;
  schedule: Date;
  status: Status;
  reason: string | null;
  notes: string | null;
  cancellationReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
};

export const createColumns = (context: UserTypes): ColumnDef<CompleteAppointmentData>[] => [
  { header: 'ID', cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p> },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => <p className="text-14-medium">{row.original.patient.user.name}</p>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = Doctors.find((doctor) => doctor.name === appointment.primaryPhysician);

      return (
        <div className="flex items-center gap-3">
          <Image src={doctor?.image!} alt="doctor" width={100} height={100} className="size-8" />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={Number(appointment.patient.id)}
            userId={Number(appointment.userId)}
            appointment={appointment}
            type={
              context === UserTypes.ADMIN
                ? AppointmentType.SCHEDULE 
                : AppointmentType.RESCHEDULE 
            }
            title={
              context === UserTypes.ADMIN
                ? 'Schedule Appointment'
                : 'Reschedule Appointment'
            }
            description={
              context === UserTypes.ADMIN
                ? 'Please confirm the following details to Schedule.'
                : 'Please confirm the following details to Reschedule.'
            }
          />
          <AppointmentModal
            patientId={Number(appointment.patient.id)}
            userId={Number(appointment.userId)}
            appointment={appointment}
            type={AppointmentType.CANCEL}
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];
