import { getPatient } from '@/lib/api/patients';
import SidebarToggle from './SidebarToggle';
import { SearchParamProps } from '@/types/utils';

interface SidebarProps {
  params: { userId: string };
}

const Sidebar = async ({ params: { userId } }: SidebarProps) => {
  const patient = await getPatient(Number(userId));

  if (!patient) {
    return null;
  }

  const menuItems = [
    {
      name: 'Dashboard',
      icon: '/assets/icons/dashboard.svg',
      path: `/patients/${userId}/dashboard`,
    },
    {
      name: 'Appointment',
      icon: '/assets/icons/new-appointment.svg',
      path: `/patients/${userId}/new-appointment/`,
    },
    {
      name: 'Patient Information',
      icon: '/assets/icons/patient-information.svg',
      path: `/patients/${userId}/register`,
    },
  ];

  return (
    <aside className="bg-dark-450 text-white h-screen flex flex-col">
      <SidebarToggle menuItems={menuItems} userId={userId} />
    </aside>
  );
};

export default Sidebar;
