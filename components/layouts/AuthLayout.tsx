// components/layouts/AuthLayout.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import PasskeyModel from '../PasskeyModal';

interface AuthLayoutProps {
  children: React.ReactNode;
  centerLogo?: boolean;
  sideImgSrc?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  centerLogo = false,
  sideImgSrc = '/assets/images/onboarding-img.png',
}) => {
  const [isAdminModalVisible, setAdminModalVisible] = useState(false);

  const openAdminModal = () => {
    setAdminModalVisible(true);
  };

  const closeAdminModal = () => {
    setAdminModalVisible(false);
  };

  return (
    <div className="flex h-screen max-h-screen">
      <PasskeyModel
        open={isAdminModalVisible}
        closeModal={closeAdminModal}
        openModal={openAdminModal}
      />
      <section className="remove-scrollbar container my-auto">
        <div
          className={`sub-container max-w-[496px] ${
            centerLogo ? 'flex flex-col items-center' : ''
          }`}
        >
          <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className={`mb-10 h-10 w-fit ${centerLogo ? 'self-center' : ''}`}
          />
          </Link>
          {children}
          <div className="text-14-regular mt-14 flex justify-between w-full">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
            <Button onClick={openAdminModal} className="text-green-500">
              Admin
            </Button>
          </div>
        </div>
      </section>
      <Image
        src={sideImgSrc}
        height={1000}
        width={1000}
        alt="on-boarding"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default AuthLayout;
