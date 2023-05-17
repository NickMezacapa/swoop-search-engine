import Container from '@components/Container';

interface FooterContainerProps {
	children: React.ReactNode;
}

const FooterContainer = ({ children }: FooterContainerProps) => (
	<section
		id="footer"
		aria-label="Footer"
		className="FooterWrapper absolute bottom-0 left-0 right-0 h-auto w-full text-[#a1a1a6]">
		<Container className="FooterContainer relative flex h-full w-full max-w-[100vw] items-center justify-center pb-20">
			{children}
		</Container>
	</section>
);

export default FooterContainer;
