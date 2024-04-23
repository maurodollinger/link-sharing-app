'use client';

import Image from 'next/image';

import Button from '../ui/customButton';
import FloatLinks from './(components)/FloatLinks';
import FormCreator from './(components)/FormCreator';
import { useLinksContext } from './(context)/LinksContext';

const EmptyMessage = () => {
  return (
    <div className='mt-6 flex h-[469px] flex-col items-center justify-center bg-light-grey text-center'>
      <Image
        src='/assets/images/illustration-empty.svg'
        alt='there is no links'
        width={250}
        height={160}
      />
      <h1 className='heading-m mb-6 mt-10'>{`Let’s get you started`}</h1>
      <p className='max-w-[488px] pl-6 pr-6 text-grey'>{`Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!`}</p>
    </div>
  );
};

export default function Page() {

  const { userlinks, addUserLink } = useLinksContext();

  return (
    <section className='flex  max-h-max w-full gap-6 '>
      <aside className='lg:w-560px hidden w-full justify-center bg-white md:flex md:w-2/5'>
        <div className='sticky top-0 h-fit pt-24 pb-24'>
          <div className='relative'>
            <FloatLinks/>
          </div>
          <Image
            className='h-[90%]'
            src='/assets/images/illustration-phone-mockup.svg'
            alt='phone-mockup'
            width={307}
            height={631}
          />
        </div>
       
      </aside>
      <div className='lg:w-808px relative w-full bg-white pb-6 pl-10 pr-10 pt-10 md:w-3/5 min-h-full  h-max'>
        <h1 className='heading-m mb-2'>Customize your links</h1>
        <p className='body-m text-grey'>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button buttonType='secondary w-full mt-10' onClick={addUserLink}>+ Add new link</Button>

        {
          userlinks.length === 0 ? <EmptyMessage /> :
          <FormCreator userlinks={ userlinks} />
        }

        
      </div>
    </section>
  );
}
