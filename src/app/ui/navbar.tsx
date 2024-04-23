'use client';
import Button from './customButton';
import HeaderLogo from './headerLogo';
import IconLink from '../../../public/assets/images/icon-link-big.svg';
import IconProfile from '../../../public/assets/images/icon-profile-details-header.svg';
import IconPreview from '../../../public/assets/images/icon-preview-header.svg';

function UserNavigation() {
  return (
    <ul className='flex h-auto items-center gap-3'>
      <li className='nav-button flex items-center gap-1'>
        <IconLink />
        <span className='hidden sm:block'>Links</span>
      </li>
      <li className='nav-button flex items-center gap-1'>
        <IconProfile />
        <span className='hidden sm:block'>Profile details</span>
      </li>
    </ul>
  );
}

export default function Navbar() {
  return (
    <nav className='flex w-full justify-between rounded bg-white p-3.5'>
      <HeaderLogo />
      <UserNavigation />
      <Button buttonType='secondary'>
        <span className='sm:hidden'>
          <IconPreview />
        </span>
        <span className='hidden sm:block'>Preview</span>
      </Button>
    </nav>
  );
}
