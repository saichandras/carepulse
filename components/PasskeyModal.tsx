'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { validatePasskey } from '@/lib/api/admin';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PassKeyModalProps {
  open: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const PasskeyModal = ({ open, closeModal }: PassKeyModalProps) => {
  const router = useRouter();
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const handleValidatePasskey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await validatePasskey(passkey);
      closeModal();
      window.location.href = '/admin'; 
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              width={20}
              height={20}
              alt="close"
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleValidatePasskey}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
