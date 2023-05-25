import { type NextPage } from 'next';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Container from '@components/Container';
import SearchFormPrimary from '@components/SearchForm/Primary';
import HomeHeader from '@components/Headers/HomeHeader';
import HomeHeaderPanel from '@components/Headers/HomeHeaderPanel';

import { SEARCH_SUGGESTIONS_HOME } from '@constants/index';
import { type SearchSuggestion } from '@utils/types';

import clsx from 'clsx';

interface FrameProps {
	className: string;
	children: React.ReactNode;
}

export function Frame({
	className,
	children,
  }: FrameProps) {
	return (
	  <div className={clsx('relative', className)}>
		<div className="shadow-2xl" />
		<div className="grid h-full transform grid-cols-1 overflow-hidden">
		  	{children}
		</div>
	  </div>
	);
  };

  export const Filters = () => {
	return (
		<div className="-mx-4 hidden h-[200px] mt-4 lg:flex justify-between [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:-top-10 lg:-bottom-20 xl:-bottom-32 text-[#eae8ed] leading-[1.08349] tracking-[-0.003em] text-xl">
			<Frame className="images-bg-fade relative transition cursor-pointer hover:scale-[1.01] w-[250px] overflow-hidden border border-gray-400 shadow-2xl rounded-lg bg-[#1d1d1f7f] backdrop-blur-md dark:border-gray-600">
				<div className='absolute top-0 left-0 right-0 w-full h-full bg-[#1d1d1f7f] rounded-lg backdrop-blur-sm'>
					<p className='pl-6 pt-6'>Images</p>
				</div>
			</Frame>
			<Frame className="videos-bg-fade relative transition cursor-pointer hover:scale-[1.01] w-[250px] overflow-hidden border border-gray-400 shadow-2xl rounded-lg bg-[#1d1d1f7f] backdrop-blur-md dark:border-gray-600">
				<div className='absolute top-0 left-0 right-0 w-full h-full bg-[#1d1d1f7f] rounded-lg backdrop-blur-sm'>
					<p className='pl-6 pt-6'>Videos</p>
				</div>
			</Frame>
			<Frame className="news-bg-fade relative overflow-hidden transition cursor-pointer hover:scale-[1.01] w-[250px] border border-gray-400 shadow-2xl rounded-lg bg-[#1d1d1f7f] backdrop-blur-md dark:border-gray-600">
				<div className='absolute top-0 left-0 right-0 w-full h-full bg-[#1d1d1f7f] rounded-lg backdrop-blur-sm'>
					<p className='pl-6 pt-6'>News</p>
				</div>
			</Frame>
			<Frame className="maps-bg-fade relative overflow-hidden transition cursor-pointer hover:scale-[1.01] w-[250px] border border-gray-400 shadow-2xl rounded-lg bg-[#1d1d1f7f] backdrop-blur-md dark:border-gray-600">
				<div className='absolute top-0 left-0 right-0 w-full h-full bg-[#1d1d1f7f] rounded-lg backdrop-blur-sm'>
					<p className='pl-6 pt-6'>Maps</p>
				</div>
			</Frame>
		</div>
	);
  }

const Home: NextPage = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === 'system' ? systemTheme : theme;
	return (
		<section
			className="max-w-screen relative flex h-full min-h-[100vh] flex-col dark:bg-[#202125] bg-[#F6F5F8]"
			aria-label="Homepage for Swoop Search">
			<Container className="relative z-30 w-full py-20 max-w-7xl">
				<HomeHeaderPanel />
				<div className='w-full h-full px-10'>
					<HomeHeader />
					<div className='text-[#1d1d1f] mt-[6rem] dark:text-[#EAE8ED] font-semibold leading-[1.08349] tracking-[-0.003em] text-6xl flex gap-x-4 items-center select-none'>
						<Image src={currentTheme === 'dark' ? '/assets/incognito-light.png' : '/assets/incognito-icon.png'} alt='Incognito Logo' height={40} width={65} />
						<h1>ViewPoint</h1>
					</div>
					<SearchFormPrimary />
					<div>
						<h3 className='text-[#6e6e73]'>Suggested Searches</h3>
						<div className='flex items-center space-x-6'>
							{SEARCH_SUGGESTIONS_HOME.map((item: SearchSuggestion) => {
								const ItemIcon = item.Icon;
								return (
									<div
										key={item.id}
										onClick={() => { window.open(item.href, '_blank') }}
										aria-label={item.alt}
										className='h-14 w-14 mt-4 shadow-lg overflow-hidden bg-[#E8E7E3] border border-gray-300 rounded-full p-2 flex items-center justify-center cursor-pointer transition hover:scale-[0.96] hover:bg-[#deddda] dark:bg-[#39393cb1] dark:border-[hsla(0,0%,51%,0.16)]'>
										<ItemIcon />
									</div>
								);
							})}
						</div>
					</div>
					<div className='hidden lg:block'>
						<h1 className='font-semibold leading-[1.08349] tracking-[-0.003em] text-[#6e6e73] text-2xl mt-8'>Filter Results</h1>
						<Filters />
					</div>
				</div>
			</Container>
		</section>
	)
};

export default Home;
