import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FiSettings } from 'react-icons/fi';

import SearchFormSecondary from '@components/SearchForm/Secondary';
import HeaderOptions from '@components/Header/HeaderOptions';

const ResultsHeader = () => {
    const [activeHeaderOption, setActiveHeaderOption] = useState('All');
    const router = useRouter();

    const handleHeaderOptionBtnClick = (title: string) => {
        setActiveHeaderOption(title);
    };

    const useNavigateToHomepage = () => {
        router.push('/');
    };

  return (
    <header className='w-full min-w-screen bg-[rgba(9,9,9,0.7)] sticky border-b border-gray-700 pb-2 z-[9999] backdrop-blur-md'>
        <div className='flex w-full p-6 items-center'>
            <Image
                alt='Swoop Search Logo'
                aria-label='Swoop Search Logo'
                src='/assets/swoop-text.png'
                height={40}
                width={120}
                className='cursor-pointer'
                onClick={useNavigateToHomepage}
            />
            <SearchFormSecondary />
            <FiSettings className='ml-auto text-[#eee] h-8 hidden sm:inline-flex cursor-pointer transition duration=100 transform hover:scale-110' />
        </div>
        <HeaderOptions active={activeHeaderOption} callBack={handleHeaderOptionBtnClick} />
    </header>
  )
}

export default ResultsHeader;

export const getServerSideProps = async () => {

};
