import { useState } from 'react';
import Link from 'next/link';

import { FiSettings } from 'react-icons/fi';

import { AnimatePresence, motion } from 'framer-motion';

interface NavLink {
	label: string;
	href: string;
}

interface NavLinkProps {
	navLinks: NavLink[];
	iconVisible?: boolean;
}

const NavLinks = ({ navLinks, iconVisible }: NavLinkProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className="flex gap-10">
			{navLinks.map(({ label, href }, index) => (
				<Link
					key={label}
					href={href}
					className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-inherit transition-colors delay-200 hover:text-purple-500 hover:delay-[250ms]"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<AnimatePresence>
						{hoveredIndex === index && (
							<motion.span
								className="absolute inset-0 rounded-lg bg-[#4f4f51a4]"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.25, delay: 0.35 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<span className="relative z-10">{label}</span>
				</Link>
			))}
			{iconVisible && (
				<FiSettings className="cursor-pointer transition hover:scale-[1.1] hover:text-purple-500" />
			)}
		</div>
	);
};

export default NavLinks;
