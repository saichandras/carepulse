'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/api/user';  // Adjust this import path as necessary
import { UserTypes } from '@/types/enums';

interface SidebarToggleProps {
  menuItems: {
    name: string;
    icon: string;
    path: string;
  }[];
  userId: string;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ menuItems, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser(UserTypes.USER);
      window.location.href = '/signin'
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <aside
      className={`bg-dark-450 text-white h-screen flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className={`p-4 flex ${isOpen ? 'justify-end' : 'justify-center'}`}>
        <button
          onClick={toggleSidebar}
          className="focus:outline-none text-white"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? (
            <Image src="/assets/icons/close.svg" width={24} height={24} alt="Close Menu" />
          ) : (
            <Image src="/assets/icons/menu.svg" width={24} height={24} alt="Open Menu" />
          )}
        </button>
      </div>

      <div className="px-4 py-10 flex items-center justify-center">
        <Link href={`/patients/${userId}/dashboard`}>
          <Image
            src={isOpen ? '/assets/icons/logo-full.svg' : '/assets/icons/logo-icon.svg'}
            alt="CarePulse Logo"
            width={isOpen ? 155 : 40}
            height={32}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <nav className="flex flex-col space-y-4 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700"
          >
            <Image src={item.icon} alt={item.name} width={30} height={30} />
            <span
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100' : 'opacity-0 overflow-hidden'
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Log Out Button */}
      <div className="px-6 mt-10">
        {isOpen && (
          <button className="text-red-500" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
    </aside>
  );
};

export default SidebarToggle;
