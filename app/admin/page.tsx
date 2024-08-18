'use client';

import { DataTable } from '@/components/DataTable';
import ErrorComponent from '@/components/ErrorComponent';
import StatCard from '@/components/StatCard';
import { createColumns } from '@/components/table/columns';
import { getAppointments } from '@/lib/api/appointments';
import { AppointmentStatus, UserTypes } from '@/types/enums';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppointmentData } from '@/types/models';
import { logoutUser } from '@/lib/api/user';
import Spinner from '@/components/Spinner';

const AdminPage = () => {
  const [appointmentsData, setAppointmentsData] = useState<AppointmentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const columns = createColumns(UserTypes.ADMIN);

  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getAppointments();
      setAppointmentsData(data);
    } catch (error) {
      setError((error as Error).message);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleLogout = async () => {
    try {
      await logoutUser(UserTypes.ADMIN);
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={32}
            alt="Logo"
            className="h-8 w-fit"
          />
        </Link>
        <button className="text-16-semibold text-red-700" onClick={handleLogout}>
          Log Out
        </button>
      </header>
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
  );
};

export default AdminPage;
