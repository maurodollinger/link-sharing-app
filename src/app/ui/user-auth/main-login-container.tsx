import Image from 'next/image';

export default function MainLoginContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='main'>
      <Image
        src='/assets/images/logo-devlinks-large.svg'
        alt='Logo DevLinks'
        width={183}
        height={40}
      />
      {children}
    </main>
  );
}
