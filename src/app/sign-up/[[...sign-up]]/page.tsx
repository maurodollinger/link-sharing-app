'use client';
import MainLoginContainer from '@/app/ui/user-auth/main-login-container';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <MainLoginContainer>
      <SignUp />
    </MainLoginContainer>
  );
}
