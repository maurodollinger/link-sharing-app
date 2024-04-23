import MainLoginContainer from '@/app/ui/user-auth/main-login-container';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <MainLoginContainer>
      <SignIn />
    </MainLoginContainer>
  );
}
