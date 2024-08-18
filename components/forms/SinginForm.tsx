'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { SignInFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/user';
import { FormFieldType } from '@/types/enums';
import { getPatient } from '@/lib/api/patients';

const SigninForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignInFormValidation>>({
    resolver: zodResolver(SignInFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(userData: z.infer<typeof SignInFormValidation>) {
    setIsLoading(true);

    try {
      const user = await loginUser(userData);
      const patient = await getPatient(user.id);

      if (patient) {
        // If the patient exists, navigate to the patient's dashboard page
        router.push(`/patients/${user.id}/dashboard`);
      } else {
        // If fetching the patient fails (patient does not exist), navigate to the registration page
        router.push(`/patients/${user.id}/register`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-10 space-y-4">
          <h1 className="header">Hi there! 👋</h1>
          <p>Schedule your first appointment.</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Password"
          placeholder="**********"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
        />
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default SigninForm;
