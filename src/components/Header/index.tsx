import { useEffect, useState } from 'react';

import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from '@utils/constants/index';

import Container from '@components/Container';
import NavLinks from './NavLinks';

interface HeaderProps {
	showNav?: boolean;
}

const Header = ({ showNav }: HeaderProps) => {
	const navInView = 'visible';
	const navHidden = 'hidden';
	const [showNavClassNames, setShowNavClassNames] = useState(navInView);

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
