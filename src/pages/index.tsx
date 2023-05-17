/* eslint-disable @next/next/no-img-element */
import { type NextPage } from 'next';

import Container from '@components/Container';
import GradientBackground from '@components/GradientBackground';
import Header from '@components/Header';
import SearchForm from '@components/SearchForm';

const Home: NextPage = () => (
	<section
		className="max-w-screen relative flex h-full min-h-[100vh] flex-col bg-[#000000]"
		aria-label="Homepage for Swoop Search">
		<GradientBackground />
		<Container className="relative z-30 w-full">
			<Header showNav />
			<div className="relative z-30 flex h-full min-h-[100vh] w-full flex-col items-center justify-center">
				<img
					src="/assets/swoop-text.png"
					alt="Swoop Search text logo"
					aria-label="Swoop Search text logo"
					className="z-30 w-[65%] max-w-[550px] object-contain md:w-[45%]"
				/>
				<p className="mt-[1rem] pb-[1rem] italic text-[#a1a1a6]">100% private search engine</p>
				<SearchForm />
			</div>
		</Container>
	</section>
);

export default Home;
