import { useState } from 'react';
import { useRouter } from 'next/router';

import { FiSettings } from 'react-icons/fi';

import { useSearchFilterState } from '@contexts/SearchFilterProvider';

import SearchFormSecondary from '@components/SearchForm/Secondary';
import HeaderOptions from '@/components/Headers/HeaderOptions';
import SettingsModal from '@components/Settings/SettingsModal';
import DynamicLogo from '@components/HomePage/DynamicLogo';

import { handleRouting } from '@utils/helpers/handleRouting';

interface ResultsHeaderProps {
    pathname?: string;
}

const ResultsHeader = ({ pathname }: ResultsHeaderProps) => {
    const router = useRouter();
    const query = JSON.stringify(router.query.q).replace(/\"/g, "");

    const { filterOption } = useSearchFilterState();

    const pathTitle = pathname === 'search' 
        ? 'All' 
        : pathname!.charAt(0).toUpperCase() + pathname!.slice(1);
        
    const [activeHeaderOption, setActiveHeaderOption] = useState(pathTitle);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const handleHeaderOptionBtnClick = (title: string) => {
        const searchType = title === 'All'
        ? 'search'
        : title.charAt(0).toLowerCase() + title.slice(1);
        
        setActiveHeaderOption(title);
        handleRouting(router, query, searchType, 1, filterOption)
    };

    const toggleSettingsModal = () => {
        setShowSettingsModal((prev) => !prev);
    };
    
    const useNavigateToHomepage = () => {
        router.push('/');
    };

  return (
    <header className='w-full min-w-screen bg-[#eae8ed] text-[#1d1d1f] dark:text-[#eae8ed] dark:bg-[#1d1d1f] sticky border-b border-[#a1a1a68d] pb-2 z-[9999] backdrop-blur-md'>
        <div className='flex w-full py-6 px-0 sm:px-6 sm:py-5 items-center'>
            <div onClick={useNavigateToHomepage} className='flex items-center cursor-pointer space-x-[-1rem] pr-5'>
                <DynamicLogo height={40} width={100} />
                <span className='text-2xl font-semibold'>{pathname}</span>
            </div>
            <FiSettings onClick={toggleSettingsModal} className='ml-auto text-[#6e6e73] mr-2 dark:text-[#EAE8ED] h-8 cursor-pointer transition duration-100 transform hover:scale-110' />
            {showSettingsModal && <SettingsModal callBack={toggleSettingsModal} />}
        </div>
        <SearchFormSecondary />
        <HeaderOptions active={activeHeaderOption} callBack={handleHeaderOptionBtnClick} />
    </header>
  )
}

export default ResultsHeader;
