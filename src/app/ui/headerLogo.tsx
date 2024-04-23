import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function HeaderLogo() {
  return (
    <div className='flex gap-2'>
      {<SignOutButton />}
      <Image
        className='hidden sm:block'
        src='/assets/images/logo-devlinks-large.svg'
        alt='logo'
        width={146}
        height={32}
      />
      <Image
        className='sm:hidden'
        src='/assets/images/logo-devlinks-small.svg'
        alt='logo'
        width={32}
        height={32}
      />
    </div>
  );
}
