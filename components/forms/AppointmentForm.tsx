'use client';

import { Form } from '@/components/ui/form';
import { Doctors } from '@/constants';
import { AppointmentStatus, AppointmentType, FormFieldType } from '@/types/enums';
import { getAppointmentSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { SelectItem } from '../ui/select';
import { Status } from '@/types/utils';
import { createAppointment, updateAppointment } from '@/lib/api/appointments';
import { Appointment } from '@/types/models';
import { handleError } from '@/lib/handleError';
import { revalidatePath } from 'next/cache';

type AppointmentFormProps = {
  userId: number;
  patientId: number;
  type: AppointmentType;
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const AppointmentForm = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || '',
      schedule: appointment?.schedule ? new Date(appointment.schedule) : new Date(),
      reason: appointment?.reason || '',
      notes: appointment?.notes || '',
      cancellationReason: appointment?.cancellationReason || '',
      status: '',
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case AppointmentType.SCHEDULE:
        status = AppointmentStatus.SCHEDULED;
        break;

      case AppointmentType.CANCEL:
        status = AppointmentStatus.CANCELLED;
        break;

      default:
        status = AppointmentStatus.PENDING;
        break;
    }

    try {
      if (type === AppointmentType.CREATE) {
        const appointmentData = {
          userId,
          type,
          patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason ?? null,
          notes: values.notes ?? null,
          cancellationReason: values.cancellationReason ?? null,
          status: status as Status,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.id}`,
          );
        }
      } else {
        const appointmentToUpdate = {
          appointmentId: appointment?.id!,
          userId,
          type,
          patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason ?? null,
          notes: values.notes ?? null,
          cancellationReason: values.cancellationReason ?? null,
          status: status as Status,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  let buttonLabel;

  switch (type) {
    case AppointmentType.CANCEL:
      buttonLabel = 'Cancel Appointment';
      break;

    case AppointmentType.CREATE:
      buttonLabel = 'Create Appointment';
      break;

    case AppointmentType.SCHEDULE:
      buttonLabel = 'Schedule Appointment';
      break;

    case AppointmentType.RESCHEDULE:
      buttonLabel = 'Reschedule Appointment';
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === AppointmentType.CREATE && (
          <section className="mb-10 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p>Request a new appointment in 10 seconds.</p>
          </section>
        )}

        {type !== AppointmentType.CANCEL && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}
        {type === AppointmentType.CANCEL && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === AppointmentType.CANCEL ? 'shad-danger-btn' : 'shad-primary-btn'
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
