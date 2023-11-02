import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import { useSearchFilterState } from '@contexts/SearchFilterProvider';
import useSearchQueryValue from '@hooks/useSearchQueryValue';
import { handleRouting } from '@utils/helpers/handleRouting';

const SearchFormSecondary = () => {
    const [showCloseIcon, setShowCloseIcon] = useState('inline-flex');
    const searchQueryRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    let path = router.pathname === '/' ? '/search' : router.pathname;
    const { value: searchQuery, bind: bindSearchQuery, reset: resetSearchQuery } = useSearchQueryValue(JSON.stringify(router.query.q).replace(/\"/g, ""));
    const { filterOption } = useSearchFilterState();

    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchQuery) return;
        handleRouting(router, searchQuery, path, 1, filterOption);
    };

    useEffect(() => {
        if (searchQuery.length === 0) {
            setShowCloseIcon('hidden');
        } else {
            setShowCloseIcon('inline-flex')
        }
    }, [searchQuery]);

  return (
    <form onSubmit={handleSearchFormSubmit} className='flex flex-grow border border-[#a1a1a6c3] rounded-full shadow-md max-w-3xl items-center px-0 sm:px-6 py-3 ml-6 sm:ml-10 mr-5 text-[#eee] bg-[#E8E7E3] dark:bg-[#303032]'>
        <input {...bindSearchQuery} ref={searchQueryRef} type='text' className='flex-grow w-full focus:outline-none bg-transparent text-[#1d1d1f] dark:text-[#EAE8ED] px-6 sm:px-0 z-50' />
        <AiOutlineClose 
            onClick={resetSearchQuery}
            className={`text-[#eee] ${showCloseIcon} h-7 cursor-pointer transition duration-100 transform hover:scale-125 sm:mr-3`} 
        />
        <div className='text-[#eee] h-6 mr-3 hidden sm:inline-flex border-l-2 border-gray-300' />
        <AiOutlineSearch className='h-5 w-auto mr-3 hidden sm:inline-flex text-blue-400 relative cursor-pointer transition duration-100 transform hover:scale-125' />
        <button hidden type='submit' aria-hidden>Search</button>
    </form>
  )
}

export default SearchFormSecondary;
