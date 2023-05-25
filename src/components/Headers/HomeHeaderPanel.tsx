import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FiSettings } from 'react-icons/fi';
import SettingsModal from '../Settings/SettingsModal';

const HomeHeaderPanel = () => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const router = useRouter();

    const openAboutPage = () => {
        router.push('/about');
    };

    const toggleSettingsModal = () => {
        setShowSettingsModal((prev) => !prev);
    };

  return (
    <section className='absolute top-4 right-4 space-x-4 items-center flex'>
        <button
            role='button'
            onClick={openAboutPage}
            aria-label='See how ViewPoint works'
            className='rounded-full hidden md:flex decoration-none cursor-pointer transition hover:scale-[1.02] hover:shadow-2xl text-sm focus:outline-none bg-[#121212] dark:bg-[#303032] leading-[1.42859] font-normal tracking-[-0.016em] px-4 py-2 items-center gap-x-2'>
            <span className='select-none'>
                <Image src='/assets/incognito-light.png' alt='Incognito Logo' height={10} width={15} />
            </span>
            <span className='text-[#EAE8ED] select-none'>How it works</span>
        </button>
        <FiSettings onClick={toggleSettingsModal} className='cursor-pointer transform hover:scale-[1.12] text-[#6e6e73] dark:text-[#EAE8ED]' />
        {showSettingsModal && <SettingsModal callBack={toggleSettingsModal} />}
    </section>
  )
}

export default HomeHeaderPanel
