import { useEffect, useState } from 'react';

import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from '@constants/index';

import Container from '@components/Container';
import NavLinks from './NavLinks';

import useAxios from '@/hooks/useAxios';

interface HeaderProps {
	showNav?: boolean;
}

const BASE_URL = `https://api.swoopsearch.dev:8000/search?q=`;
const URL_OPTIONS = `&category_general=1&language=auto&time_range=&safesearch=0&theme=simple`;
const term = 'hello';
const REQ_URL = `${BASE_URL}${term}`;

const requestConfig = {
	url: `${REQ_URL}`,
	method: 'GET',
};


const Header = ({ showNav }: HeaderProps) => {
	const navInView = 'visible';
	const navHidden = 'hidden';
	const [showNavClassNames, setShowNavClassNames] = useState(navInView);
	const [response, controls] = useAxios<any, Error>(requestConfig, []);
console.log('header')
	useEffect(() => {
		if (response.type === 'success') {
			// Handle successful response
			console.log('Data:', response.data);
		  } else if (response.type === 'error') {
			// Handle error response
			console.log('error');
		  } else {
			console.log('lalala')
		  }
	  console.log('ue fired')
	}, [response]);

	useEffect(() => {
		if (!showNav) {
			setShowNavClassNames(navHidden);
		} else {
			setShowNavClassNames(navInView);
		}
	}, [showNav]);

	return (
		<header className="NavHeader fixed bottom-auto left-0 top-0 z-[400000000] w-full text-[#a1a1a6]">
			<nav
				className={`NavBar ${showNavClassNames} relative z-[400000000] m-auto h-[3rem] select-none px-2 text-[1.0625rem] md:h-[3.5rem]`}>
				<Container className="relative z-[400000000] flex h-full items-center justify-between">
					<div className="relative mr-2 flex md:gap-10">
						<NavLinks navLinks={PRIMARY_NAV_LINKS} />
					</div>
					<div className="mr-2 flex items-end">
						<NavLinks navLinks={SECONDARY_NAV_LINKS} iconVisible />
					</div>
				</Container>
			</nav>
		</header>
	);
};

export default Header;
