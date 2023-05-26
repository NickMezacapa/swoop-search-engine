import Container from '@components/Container';
import SearchFormPrimary from '@components/SearchForm/Primary';
import HomeHeader from '@components/Headers/HomeHeader';
import HomeSearchFilters from '@components/SearchOptions/HomeSearchFilters';

import HomeSuggestions from './HomeSuggestions';
import DynamicLogo from './DynamicLogo';
import HomeHeaderPanel from './HomeHeaderPanel';

interface HomePageProps {
    variant?: string;
}

const HomePage = ({ variant }: HomePageProps) => {
	return (
        <Container className="relative z-30 w-full py-20 max-w-7xl">
            <HomeHeaderPanel />
            <div className='w-full h-full px-10'>
                <HomeHeader />
                <div className='text-[#1d1d1f] mt-[6rem] dark:text-[#EAE8ED] font-semibold leading-[1.08349] tracking-[-0.003em] text-[2.8rem] sm:text-6xl flex gap-x-4 items-center select-none'>
                    <DynamicLogo />
                    <h1>Swoop Search</h1>
                </div>
                {variant && (
                    <div className='text-3xl text-blue-500 font-semibold leading-[1.08349] tracking-[-0.003em] mt-6 ml-1'>{variant}</div>
                )}
                <SearchFormPrimary />
                <HomeSuggestions />
                <div className='hidden md:block w-[160%]'>
                    <h1 className='font-semibold leading-[1.08349] tracking-[-0.003em] text-[#6e6e73] text-2xl mt-[3.75rem] mb-[1rem]'>Filter Results</h1>
                    <HomeSearchFilters />
                </div>
            </div>
        </Container>
	);
};

export default HomePage;
