import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FiSettings } from 'react-icons/fi';

import SearchFormSecondary from '@components/SearchForm/Secondary';
import HeaderOptions from '@components/Header/HeaderOptions';
import SettingsModal from '@components/Settings/SettingsModal';
import DynamicLogo from '@components/HomePage/DynamicLogo';

interface ResultsHeaderProps {
    pathname?: string;
}

const ResultsHeader = ({ pathname }: ResultsHeaderProps) => {
    const [activeHeaderOption, setActiveHeaderOption] = useState('All');
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const router = useRouter();

    const handleHeaderOptionBtnClick = (title: string) => {
        setActiveHeaderOption(title);
    };

    const toggleSettingsModal = () => {
        setShowSettingsModal((prev) => !prev);
    };
    
    const useNavigateToHomepage = () => {
        router.push('/');
    };

  return (
    <header className='w-full min-w-screen bg-[#eae8ed] text-[#1d1d1f] dark:text-[#eae8ed] dark:bg-[#121212] sticky border-b border-[#a1a1a68d] pb-2 z-[9999] backdrop-blur-md'>
        <div className='flex w-full px-6 py-5 items-center'>
            <div onClick={useNavigateToHomepage} className='flex items-center cursor-pointer space-x-[-1rem] pr-5'>
                <DynamicLogo height={40} width={100} />
                <span className='text-2xl font-semibold'>{pathname}</span>
            </div>
            <FiSettings onClick={toggleSettingsModal} className='ml-auto text-[#6e6e73] dark:text-[#EAE8ED] h-8 hidden sm:inline-flex cursor-pointer transition duration=100 transform hover:scale-110' />
            {showSettingsModal && <SettingsModal callBack={toggleSettingsModal} />}
        </div>
        <SearchFormSecondary />
        <HeaderOptions active={activeHeaderOption} callBack={handleHeaderOptionBtnClick} />
    </header>
  )
}

export default ResultsHeader;
