import Head from 'next/head';
import ResultsHeader from '@components/ResultsHeader';
import GradientBackground from '@components/GradientBackground';

const Search = () => {
  return (
    <div className='relative h-full min-h-[100vh] w-full'>
        <Head>
            <title>Results</title>
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
        <GradientBackground className='SearchGradient-Top' />
        <GradientBackground className='SearchGradient-Bottom' />
        <ResultsHeader />
        {/* Search results */}
    </div>
  )
}

export default Search;
