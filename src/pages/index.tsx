import { type NextPage } from 'next';
import HomePage from '@components/HomePage';

const Home: NextPage = () => {
	return (
		<section
			className="max-w-screen relative flex h-full min-h-[100vh] flex-col dark:bg-[#202125] bg-[#F6F5F8]"
			aria-label="Homepage for Swoop Search">
			<HomePage />
		</section>
	)
};

export default Home;
