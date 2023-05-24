import { useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineSearch } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';

import { useSearchQueryValue } from '@hooks/useSearchQueryValue';
import { handleRouting } from '@/utils/helpers/handleRouting';


const SearchFormPrimary = () => {
	const [buttonSubmitType, setButtonSubmitType] = useState<string>('swoop-search');
	const { value: searchQuery, bind: bindSearchQuery, reset: resetSearchQuery } = useSearchQueryValue('');
	const router = useRouter();

	const handleSearchFormButtonClick = (e: React.PointerEvent<HTMLButtonElement>) => {
		const buttonText: string = e.currentTarget.innerText;
		if (buttonText === 'Quick Results') {
			setButtonSubmitType('quick-results');
		} else {
			setButtonSubmitType('swoop-search');
		}
	};

	const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (buttonSubmitType === 'swoop-search') {
			handleRouting(router, searchQuery);
		} else {
			handleRouting(router, searchQuery);
		}
	};

	return (
		<section className="mx-auto mb-[4rem] flex h-auto w-full" aria-label="Search form">
			<form onSubmit={handleSearchFormSubmit} className="flex flex-grow flex-col items-center">
				<div className="mt-5 flex w-full max-w-md items-center rounded-full border border-[#a1a1a6] px-5 py-3 focus-within:shadow-2xl hover:shadow-2xl sm:max-w-xl">
					<AiOutlineSearch className="mr-3 h-5 text-gray-500" />
					<input
						type="text"
						className="flex-grow bg-transparent text-[#eee] focus:outline-none"
						aria-label="Search form input field"
						{...bindSearchQuery}
					/>
					<BiMicrophone className="h-5 text-gray-500" />
				</div>
				<div className="mt-8 flex w-1/2 flex-col justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
					<button
						onClick={handleSearchFormButtonClick}
						className="rounded-lg bg-[#0b0410c2] p-3 text-sm text-[#a1a1a6] ring-gray-700 transition hover:shadow-2xl hover:ring-1 focus:outline-none active:ring-gray-800"
						type="submit">
						Swoop Search
					</button>
					<button
						onClick={handleSearchFormButtonClick}
						className="rounded-lg bg-[#0b0410c2] p-3 text-sm text-[#a1a1a6] ring-gray-700 transition hover:shadow-2xl hover:ring-1 focus:outline-none active:ring-gray-800"
						type="submit">
						Quick Results
					</button>
				</div>
			</form>
		</section>
	);
};

export default SearchFormPrimary;
