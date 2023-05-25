import Head from 'next/head';
import ResultsHeader from '@components/ResultsHeader';

// test trpc
import { api } from '@utils/api';
import ThemeButton from '@/components/ThemeLayout/ThemeButton';

const Search = () => {

  return (
    <section className='relative h-full min-h-[100vh] w-full overflow-x-hidden'>
        <Head>
            <title>Swoop Results</title>
            <meta
				name="description"
				content="Search results for given query."
			/>
			<link rel="icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#905bd5" />
			<meta name="msapplication-TileColor" content="#1d1d1f" />
			<meta name="theme-color" content="#000000" />
        </Head>
        <ResultsHeader />
        <div className='text-4xl text-[#eee]'>
          {/* add trpc code */}
          <ThemeButton className='absolute bottom-20 text-4xl cursor-pointer dark:text-[#eee] z-[9999999] border border-red-500 light:text-[#1d1d1f] left-0' />
        </div>
        {/* Search results */}
    </section>
  )
}

export default Search;
