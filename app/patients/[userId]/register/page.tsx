// app/patients/[userId]/register/page.tsx
import RegisterForm from '@/components/forms/RegisterForm';
import { getPatient } from '@/lib/api/patients';
import { getUser } from '@/lib/api/user';
import { SearchParamProps } from '@/types/utils';
import Image from 'next/image';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(Number(userId));
  const patient = await getPatient(Number(userId));

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} patient={patient} />
          <p className="justify-items-end text-dark-600 xl:text-left py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
