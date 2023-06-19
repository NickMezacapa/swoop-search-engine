import { useRouter } from 'next/router';

import NewsSkeletonLoader from './NewsSkeletonLoader';
import FeaturedResults from './FeaturedResults';

import { api } from '@utils/api';
import type { NewsResult } from '@utils/types';
import PaginationButtons from '@components/Pagination/PaginationButtons';

interface NewsResultsProps {
    query: string;
}

const NewsResults = ({ query }: NewsResultsProps) => {
    const router = useRouter();
    const pagenum = Number(router.query.pageno) ?? 1;
    const requestConfig = {
        query: query,
        safeSearchValue: 0,
        pageno: pagenum,
        category: "news"
    };
    const { data, isLoading, error } = api.swoop.newsSearch.useQuery<NewsResult>(requestConfig);

    if (isLoading) return <NewsSkeletonLoader />;

    if (!data) {
        console.log('There seemed to be an error making the request...', error);
        return <p>No results found.</p>
    }

    // Sort data in descending order by published date
    const sortedData: NewsResult[] = [...data].sort((a, b) => {
        // Assuming the `publishedDate` is in ISO 8601 format
        const dateA = new Date(a.publishedDate ?? '');
        const dateB = new Date(b.publishedDate ?? '');
        return dateB.getTime() - dateA.getTime();
      });

      const recentNews = sortedData.map(item => {
        // Extract the relevant information
        return item;
      });

  return (

    <section className='w-full flex flex-col max-w-4xl mx-auto p-8'>
        {pagenum > 1 && <h1 className='font-semibold text-2xl text-[#8f8f9090] dark:text-[#eae8edb1] pl-1'>Page {pagenum}</h1>}
        { pagenum <= 1 && <FeaturedResults recentNews={recentNews} /> }
        <div className='w-full flex flex-col justify-evenly space-y-8 mt-8 max-w-4xl mx-auto'>
            {recentNews && recentNews.slice(3).map((item: NewsResult, index: number) => {
                    const parsedUrl = item.parsed_url;
                    const source = parsedUrl && parsedUrl[1].replace('www.', '').replace('.com', '');
                    if (item !== null)
                        return (
                            <div key={index}  className='rounded-lg border border-[hsla(0,0%,51%,0.25)] dark:bg-[#39393cb1] bg-[#EAE8ED] cursor-pointer overflow-hidden transition hover:scale-[0.99] shadow-md flex flex-col p-2'>
                                <div className='group h-full mb-2'>
                                    <h1 className='text-[#1d1d1f97] dark:text-[#eae8edbb] text-sm'>{source}</h1>
                                    <a href={item.url} className='text-xs text-blue-500 w-full line-clamp-1 transition cursor-pointer mb-2'>{item.pretty_url}</a>
                                    <a href={item.url} className='text-xl text-[#1d1d1f] dark:text-[#eae8ed] line-clamp-2 group-hover:underline mb-2 w-[80%]'>{item.title}</a>
                                    <p className='text-sm cursor-pointer text-[#1d1d1fba] dark:text-gray-400 line-clamp-3 mt-1 w-[80%]'>
                                        {item?.content?.charAt(0).toUpperCase() + item!.content!.slice(1)}
                                    </p>
                                </div>
                        </div>
                        );
                    })
                }
        </div>
        <PaginationButtons searchType='news' className='mx-auto' />
    </section>
  )
}

export default NewsResults;
