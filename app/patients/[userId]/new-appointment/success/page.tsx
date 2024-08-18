import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointments } from '@/lib/api/appointments';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ErrorComponent from '@/components/ErrorComponent';

const AppointmentSuccessPage = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';

  try {
    // Fetch appointments, which returns an array
    const { appointments } = await getAppointments(appointmentId);

    // Access the first appointment from the array
    const appointment = appointments[0];

    // Check if the appointment exists
    if (!appointment) {
      throw new Error('Appointment not found.');
    }

    // Find the doctor associated with the appointment
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

    return (
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="h-10 w-fit"
            />
          </Link>

          <section className="flex flex-col items-center">
            <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
            <h2 className="header mb-6 max-w-[600px] text-center">
              Your <span className="text-green-500">appointment request</span> has been successfully
              submitted!
            </h2>
            <p>We will be in touch shortly to confirm.</p>
          </section>

          <section className="request-details">
            <p>Requested appointment details:</p>
            {doctor && (
              <div className="flex items-center gap-3">
                <Image
                  src={doctor.image}
                  width={100}
                  height={100}
                  alt="doctor"
                  className="size-6"
                />
                <p className="whitespace-nowrap">Dr. {doctor.name}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar" />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </section>
          <div className="flex gap-10">
            <Button variant="outline" className="shad-blue-btn" asChild>
              <Link href={`/patients/${userId}/dashboard`}>Dashboard</Link>
            </Button>
            <Button variant="outline" className="shad-primary-btn" asChild>
              <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
            </Button>
          </div>
          <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
        </div>
      </div>
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    return (
      <ErrorComponent message={errorMessage} retryUrl={`/patients/${userId}/new-appointment`} />
    );
  }
};

export default AppointmentSuccessPage;
