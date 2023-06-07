import { motion } from 'framer-motion';
import type { SearchResult } from '@/utils/types';

interface ResultLinksProps {
    data: SearchResult[] | undefined;
    isLoading: boolean;
    error: any;
}

const ResultLinks = ({ data, isLoading, error }: ResultLinksProps) => {
    if (isLoading) {
        const arr = Array(10).fill('')
        return (
            <div className='SkeletonLoaderEntrance flex flex-col w-full sm:w-1/2 opacity-0 h-full max-w-[800px] transition ease'>
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
    } 
    if (!data) {
        console.log('There seemed to be an error making the request...', error);
        return <p>No results found.</p>
    }
  return (
    <div className='w-full md:w-[50%] py-2 pr-2'>
    {
        data?.map((result: any, index: number) => {
            return (
                <motion.div 
                    key={result.url}
                    initial={{
                        y: '50%',
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.25,
                        ease: 'easeOut',
                        delay: index * 0.08
                    }}
                    className='bg-[#EAE8ED] cursor-pointer overflow-hidden transition hover:scale-[0.99] shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] flex flex-col space-y-2 rounded-lg p-2'>
                    <div className='group'>
                        <a href={result.url} className='text-xs text-blue-400 line-clamp-1'>{result.pretty_url}</a>
                        <a href={result.url}>
                            <h1 className='text-xl text-[#1d1d1f] dark:text-[#eae8ed] truncate group-hover:underline my-2'>{result.title}</h1>
                        </a>
                        <p className='text-sm cursor-pointer text-[#1d1d1fba] dark:text-gray-400 line-clamp-3'>
                            {result.content.charAt(0).toUpperCase() + result.content.slice(1)}
                        </p>
                    </div>
                </motion.div>
            );
        })
    }
    </div>
  )
}

export default ResultLinks;
