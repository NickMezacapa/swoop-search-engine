import { useRouter } from 'next/router';
import Head from 'next/head';

import DefaultHome from '@components/DefaultPage/DefaultHome';
import ResultsHeader from '@components/Headers/ResultsHeader';
import SearchResults from '@components/ResultPages/Search/SearchResults';



import { fetchSearchResults } from '@utils/helpers/fetchSearchResults';
import mockedImages from '@constants/dummyData/CatsImages';
import mockedResults from '@constants/dummyData/Cats';

const Search = ({ searchResults, imageResults }: any) => {
  const router = useRouter();

  // ensure there is a search query, else display homepage with variant
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
        <SearchResults searchResults={searchResults} imageResults={imageResults} />
    </section>
  )
}

export default Search;

export const getServerSideProps = async (context: any) => {
  const useDummyData = true;
  const query = context.query.q;
  const startIndex = context.query.pageno ?? 1;
  const filterOption = context.query.safesearch ?? 0;
 
  let safeSearchValue = 0;
  switch (filterOption) {
    case 'Mid':
      safeSearchValue = 1;
      break;
    case 'Strict':
      safeSearchValue = 2;
      break;
    default:
      safeSearchValue = 0;
      break;
  }

  const searchData = useDummyData 
    ? mockedResults
    : await fetchSearchResults(query, safeSearchValue, startIndex);

    const imageData = useDummyData
      ? mockedImages
      : await fetchSearchResults(query, safeSearchValue, startIndex, true);

  return {
    props: {
      searchResults: searchData,
      imageResults: imageData,
    },
  }
};
