'use client';

import Image from 'next/image';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { SearchParamProps } from '@/types/utils';
import { getPatient } from '@/lib/api/patients';
import { AppointmentType } from '@/types/enums';
import ErrorComponent from '@/components/ErrorComponent';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Patient } from '@/types/models';
import Spinner from '@/components/Spinner';

const NewAppointment = ({ params: { userId } }: SearchParamProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await getPatient(userId);
        if (!patientData) {
          throw new Error('Something went wrong, Please try again!');
        }
        setPatient(patientData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatient();
  }, []);

  if (error) {
    return <ErrorComponent message={error} retryUrl={`/patients/${userId}/new-appointment`} />;
  }

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" color="white" />
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type={AppointmentType.CREATE}
            userId={Number(userId)}
            patientId={Number(patient.id)}
          />
          <p className="justify-items-end text-dark-600 xl:text-left py-12">© 2024 CarePluse</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
