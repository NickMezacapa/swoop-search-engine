import { useRouter } from 'next/router';

import { AiOutlineSearch, AiOutlineLock, AiOutlineClose } from 'react-icons/ai';

import { useSearchQueryValue } from '@hooks/useSearchQueryValue';
import { handleRouting } from '@utils/helpers/handleRouting';


const SearchFormPrimary = () => {
	const { value: searchQuery, bind: bindSearchQuery, reset: resetSearchQuery } = useSearchQueryValue('');
	const router = useRouter();

	const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleRouting(router, searchQuery);
	};

	const changeActiveIcon = () => {
		if (searchQuery.length === 0) {
			return (
				<AiOutlineLock className="h-5 text-gray-500" />
			);
		} else {
			return (
				<AiOutlineClose 
            		onClick={resetSearchQuery}
            		className='h-7 text-gray-300 cursor-pointer transition duration-100 transform hover:scale-125 sm:mr-3'
        		/>
			);
		}
	};

	return (
		<section className="mx-auto mb-[2rem] flex h-auto w-full justify-start" aria-label="Search form">
			<form onSubmit={handleSearchFormSubmit} className="flex flex-grow mt-4 flex-col justify-start transition">
				<div className="mt-5 flex w-full max-w-md items-center rounded-full border border-[#a1a1a6] bg-[#E8E7E3] shadow-lg dark:bg-[#303032] px-5 py-3 focus-within:shadow-2xl hover:shadow-2xl sm:max-w-xl">
					<AiOutlineSearch className="mr-3 h-5 text-gray-500" />
					<input
						type="text"
						className="flex-grow bg-transparent text-[#1d1d1f] dark:text-[#EAE8ED] focus:outline-none"
						aria-label="Search form input field"
						placeholder="Type to start your ViewPoint"
						{...bindSearchQuery}
					/>
					{changeActiveIcon()}
				</div>
				<div className="mt-8 flex w-1/2 flex-col justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
					<button
						hidden
						className="rounded-lg bg-[#0b0410c2] p-3 text-sm text-[#a1a1a6] ring-gray-700 transition hover:shadow-2xl hover:ring-1 focus:outline-none active:ring-gray-800"
						type="submit">
						Search
					</button>
				</div>
			</form>
		</section>
	);
};

export default SearchFormPrimary;
