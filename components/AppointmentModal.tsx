'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import 'react-datepicker/dist/react-datepicker.css';
import AppointmentForm from './forms/AppointmentForm';
import { Appointment } from '@/types/models';
import { AppointmentType } from '@/types/enums';

type AppointmentModalProps = {
  patientId: number;
  userId: number;
  appointment?: Appointment;
  type: AppointmentType;
  title: string;
  description: string;
};

const AppointmentModal = ({ patientId, userId, appointment, type }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${
            (type === AppointmentType.SCHEDULE || type === AppointmentType.RESCHEDULE) &&
            'text-green-500'
          }`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-xl p-10">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize mb-2">{type} Appointment</DialogTitle>
          <DialogDescription className="text-dark-700 text-[15.2px]">
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={Number(userId)}
          patientId={Number(patientId)}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
