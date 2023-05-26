import { useRouter } from 'next/router';
import Head from 'next/head';

import DefaultHome from '@components/DefaultPage/DefaultHome';
import ResultsHeader from '@components/Headers/ResultsHeader';

const Videos = () => {
  const router = useRouter();

  let path: string = '';
  if (router.pathname !== '/search') {
    path = router.pathname.replace(/^./, "");
  };
  if (!router.query.q) return <DefaultHome variant={path} />;

  return (
    <section className='relative h-full min-h-[100vh] w-full overflow-x-hidden' aria-label='Swoop Videos'>
        <Head>
            <title>Swoop Videos</title>
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
    </section>
  )
}

export default Videos;
