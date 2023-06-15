import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { useRouter } from 'next/router';

import DefaultHome from '@components/DefaultPage/DefaultHome';
import ResultsHeader from '@components/Headers/ResultsHeader';
import DynamicLogo from '@/components/HomePage/DynamicLogo';
import { filterOptionCell } from '@components/Settings/Widgets/SafeSearch';

import { useCellValue } from '@/stateManager';

const Maps = () => {
  const router = useRouter();
  const safeSearchValue = useCellValue(filterOptionCell);
  let path: string = '';
  if (router.pathname !== '/search') {
    path = router.pathname.replace(/^./, "");
  };
  if (!router.query.q) return <DefaultHome variant={path} />;

  const query = JSON.stringify(router.query.q).replace(/\"/g, "");

  let switchValue: number = 0;

switch (safeSearchValue) {
    case 'Off':
      switchValue = 0;
      break;
    case 'Mid':
      switchValue = 1;
      break;
    case 'Strict':
      switchValue = 2;
      break;
    default:
      switchValue = 0;
      break;
  }

  return (
    <section className='relative h-full min-h-[100vh] w-full overflow-x-hidden' aria-label='Swoop Maps'>
        <Head>
            <title>Swoop Maps</title>
            <meta
              name={`Swoop Maps - ${query}`}
              content={`Swoop Maps results for: ${query}`}
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
        <ResultsHeader pathname={path} />
        <section className='w-full p-20 flex flex-col items-center justify-center text-3xl font-semibold'>
          <DynamicLogo height={80} width={80} />
          <h1 className='mt-4 text-[#1d1d1f9e] dark:text-[#eae8edb6]'>Oops! Maps feature is coming soon.</h1>
          <Link href={`/search?q=${query}&pageno=1&safesearch=${switchValue}`} className='text-blue-400 mt-10 cursor-pointer transition ease hover:underline hover:scale-[0.99]'>
            Return
          </Link>
        </section>
    </section>
  )
}

export default Maps;
