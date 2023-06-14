/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { api } from '@utils/api';
import type { NewsResult } from '@utils/types';

interface NewsResultsProps {
    query: string;
}

const NewsSkeletonLoader = () => {
    const arr = Array(15).fill('')
    return (
        <div className='SkeletonLoaderEntrance flex flex-col mt-8 ml-6 w-full sm:w-1/2 opacity-0 h-full max-w-[800px] transition ease'>
            {arr.map((_, i) => {
                return (
                    <div 
                        key={i}
                        className='bg-[#EAE8ED] w-full relative overflow-hidden transition shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] border border-[hsla(0,0%,51%,0.2)] flex flex-col space-y-2 rounded-lg p-2'>
                        <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-2 bg-[#cecccf] dark:bg-[#444446b1] w-1/2' />
                        <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-4 bg-[#6f6f7157] dark:bg-[#585859b1] w-1/3' />
                        <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-5 bg-[#a2a1a341] dark:bg-[#444446b1] w-3/4' />
                    </div>
                );
            })}
        </div>
    );
};

const NewsResults = ({ query }: NewsResultsProps) => {
    const router = useRouter();
    const requestConfig = {
        query: query,
        safeSearchValue: 0,
        pageno: Number(router.query.pageno) ?? 1,
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
        <h1 className='text-[#1d1d1f] dark:text-[#eae8ed] font-semibold text-2xl mb-4 pl-1'>Featured</h1>
        <div className='flex w-full items-center justify-between'>
            {recentNews && recentNews.slice(0,3).map((item: NewsResult, index: number) => {
                if (item !== null)
                    return (
                        <div key={index}  className='w-1/3 sm:w-[30%] h-[450px] min-h-[450px] max-h-[500px] rounded-lg border border-[hsla(0,0%,51%,0.25)] dark:bg-[#39393cb1] bg-[#EAE8ED] p-4 flex items-center justify-between'>
                            <div className='w-full flex flex-col items-center justify-center overflow-hidden group'>
                                <img src={item!.img_src!} alt={item.title} className='object-cover w-full h-[30%] aspect-auto' loading='lazy' />
                                <h1 className='text-[#1d1d1f] dark:text-[#eae8ed] text-xl font-semibold line-clamp-4 text-center mt-3'>{item.title}</h1>
                                <p className='text-[#1d1d1f56] dark:text-gray-500 text-sm mt-4 flex flex-wrap mx-auto text-center line-clamp-4 whitespace-break-spaces'>{item?.content}</p>
                                <a href={item.url} className='mt-6 text-blue-400 text-xs line-clamp-1 truncate w-full transition ease cursor-pointer'>{item.pretty_url}</a>
                            </div>
                    </div>
                    );
                })
            }
        </div>
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
    </section>
  )
}

export default NewsResults;
