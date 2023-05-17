import FooterContainer from './FooterContainer';

const Footer = () => (
	<FooterContainer>
		<footer className="absolute bottom-0 left-0 right-0 z-[9999] mx-auto max-h-[4.5rem] w-full px-8 py-4 text-sm">
			<div className="flex h-full max-h-[4.5rem] w-full max-w-6xl items-center justify-end gap-x-10 text-right">
				<h3 className="ease cursor-pointer transition hover:text-purple-500">Privacy</h3>
				<h3 className="ease cursor-pointer transition hover:text-purple-500">Terms</h3>
			</div>
		</footer>
	</FooterContainer>
);

export default Footer;
