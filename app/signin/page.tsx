// app/login/page.tsx
import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import SigninForm from '@/components/forms/SinginForm';

const LoginPage = () => {
  return (
    <AuthLayout sideImgSrc="/assets/images/onboarding-img.png">
      <SigninForm />
    </AuthLayout>
  );
};

export default LoginPage;
