'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable';
import ErrorComponent from '@/components/ErrorComponent';
import StatCard from '@/components/StatCard';
import { createColumns } from '@/components/table/columns';
import { getAppointments } from '@/lib/api/appointments';
import { AppointmentStatus, UserTypes } from '@/types/enums';
import { SearchParamProps } from '@/types/utils';
import { AppointmentData } from '@/types/models';
import Spinner from '@/components/Spinner';

const DashboardPage = ({ params: { userId } }: SearchParamProps) => {
  const [appointmentsData, setAppointmentsData] = useState<AppointmentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments({ userId: Number(userId) });
        setAppointmentsData(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchAppointments();
  }, [userId]);

  if (error) {
    return <ErrorComponent message={error} retryUrl={`/admin`} />;
  }

  if (!appointmentsData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" color="white" />
      </div>
    );
  }

  const columns = createColumns(UserTypes.USER);

  return (
    <div className="flex">
      <div className="mx-auto flex max-w-7xl flex-col space-y-14 flex-1 mt-20">
        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Start the day with managing new appointments</p>
          </section>

          <section className="admin-stat">
            <StatCard
              type={AppointmentStatus.APPOINTMENTS}
              count={appointmentsData.scheduledCount}
              label="Scheduled Appointments"
              icon="/assets/icons/appointments.svg"
            />
            <StatCard
              type={AppointmentStatus.PENDING}
              count={appointmentsData.pendingCount}
              label="Pending Appointments"
              icon="/assets/icons/pending.svg"
            />
            <StatCard
              type={AppointmentStatus.CANCELLED}
              count={appointmentsData.cancelledCount}
              label="Cancelled Appointments"
              icon="/assets/icons/cancelled.svg"
            />
          </section>
          <DataTable data={appointmentsData.appointments} columns={columns} />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
