
import { auth } from '@clerk/nextjs';
import { getData } from '../lib/api';
import Navbar from '../ui/navbar';
import { LinksProvider } from './(context)/LinksContext';



export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  const { userId } = auth();

  const data = await getData(userId || '');

  return (
    <LinksProvider data={data}>
    <main className='flex flex-col gap-6 h-full p-6 max-w-[1440px] mx-auto'>
      <Navbar />
      {children}
      </main>
      </LinksProvider>
  );
}
