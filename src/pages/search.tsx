import { useRouter } from 'next/router';
import Head from 'next/head';

import DefaultHome from '@components/DefaultPage/DefaultHome';
import ResultsHeader from '@components/Headers/ResultsHeader';
import SearchResults from '@components/ResultPages/Search/SearchResults';

import { fetchSearchResults } from '@utils/helpers/fetchSearchResults';
import mockedResults from '@utils/dummyData/Cats';

const Search = ({ searchResults }: any) => {
  // console.log(searchResults)
  const router = useRouter();

  let path: string = '';
  if (router.pathname !== '/search') path = router.pathname;
  if (!router.query.q) return <DefaultHome variant={path} />;

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
        <ResultsHeader pathname={router.pathname.replace(/^./, "")} />
        <SearchResults searchResults={searchResults} />
    </section>
  )
}

export default Search;

export const getServerSideProps = async (context: any) => {
  const useDummyData = true;
  const query = context.query.q;
  const startIndex = context.query.pageno ?? 1;

  const searchData = useDummyData 
    ? mockedResults
    : await fetchSearchResults(query, startIndex);

  return {
    props: {
      searchResults: searchData
    },
  }
};
