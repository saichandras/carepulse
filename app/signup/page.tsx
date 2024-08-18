// app/signup/page.tsx
import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import SignupForm from '@/components/forms/SignupForm';

const SignupPage = () => {
  return (
    <AuthLayout sideImgSrc="/assets/images/onboarding-img.png">
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
