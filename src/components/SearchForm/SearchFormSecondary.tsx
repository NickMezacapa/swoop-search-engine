import { useRef } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import { handleRouting } from '@/utils/handleRouting';

const SearchFormSecondary = () => {
    const searchQueryRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const clearSearchForm = () => {
        if (searchQueryRef.current) {
            searchQueryRef.current.value = '';
        }
    };

    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchQuery = searchQueryRef.current?.value;
        if (!searchQuery) return;
        handleRouting(router, searchQuery);
    };
  return (
    <form onSubmit={handleSearchFormSubmit} className='flex flex-grow border border-gray-200 rounded-full shadow-2xl max-w-3xl items-center px-6 py-3 ml-10 mr-5 text-[#eee] bg-transparent'>
        <input ref={searchQueryRef} type='text' className='flex-grow w-full focus:outline-none bg-transparent text-[#eee]' />
        <AiOutlineClose 
            onClick={clearSearchForm}
            className='text-[#eee] h-7 cursor-pointer transition duration-100 transform hover:scale-125 sm:mr-3' 
        />
        <div className='text-[#eee] h-6 mr-3 hidden sm:inline-flex border-l-2 border-gray-300' />
        <AiOutlineSearch className='h-5 w-auto mr-3 hidden sm:inline-flex text-purple-500 relative cursor-pointer transition duration-100 transform hover:scale-125' />
        <button hidden type='submit' aria-hidden>Search</button>
    </form>
  )
}

export default SearchFormSecondary;
