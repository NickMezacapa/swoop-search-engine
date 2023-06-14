/* eslint-disable @next/next/no-img-element */
import type { NewsResult } from '@utils/types';

interface FeaturedNewsResultsProps {
    recentNews: NewsResult[] | undefined;
}

const FeaturedResults = ({ recentNews }: FeaturedNewsResultsProps) => {
  return (
    <>
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
    </>
  )
}

export default FeaturedResults
