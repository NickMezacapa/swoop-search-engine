import { useRouter } from 'next/router';
import Head from 'next/head';

import DefaultHome from '@components/DefaultPage/DefaultHome';
import ResultsHeader from '@components/Headers/ResultsHeader';
import ImageResults from '@components/ResultPages/Images/ImageResults';

const Images = () => {
  const router = useRouter();

  let path: string = '';
  if (router.pathname !== '/search') {
    path = router.pathname.replace(/^./, "");
  };
  if (!router.query.q) return <DefaultHome variant={path} />;

  const query = JSON.stringify(router.query.q).replace(/\"/g, "");

  return (
    <section className='relative h-full min-h-[100vh] w-full overflow-x-hidden' aria-label='Swoop Images'>
        <Head>
            <title>Swoop Images</title>
            <meta
              name={`Swoop Images - ${query}`}
              content={`Swoop Image results for: ${query}`}
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
        <ImageResults query={query} />
    </section>
  )
}

export default Images;
