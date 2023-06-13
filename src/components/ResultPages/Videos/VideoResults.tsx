/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { api } from '@utils/api';
import type { VideoResult } from '@utils/types';
import { filterOptionCell } from '@/components/Settings/Widgets/SafeSearch';
import { BsFillPlayFill } from 'react-icons/bs';

import { useCellValue } from '@/stateManager';

interface VideoResultsProps {
    query: string;
}

const SkeletonVideoLoader = () => {
    const skeletonArray = Array.from({ length: 15 }, (_, i) => i);
    return (
        <div className='w-full flex flex-col pl-6 sm:pl-12 pt-6 pr-3 max-w-4xl'>
            {skeletonArray.map((item) => (
                <div
                    key={item}
                    className='bg-[#EAE8ED] w-full h-[250px] max-h-[250px] relative overflow-hidden transition shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] border border-[hsla(0,0%,51%,0.2)] flex flex-col space-y-2 rounded-lg p-2'>
                    <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-2 bg-[#cecccf] dark:bg-[#444446b1] w-1/2' />
                    <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-4 bg-[#6f6f7157] dark:bg-[#585859b1] w-1/3' />
                    <div className='SkeletonShimmer bg-gradient-to-r from-transparent to-[#cecccfc3] dark:to-[#484849b1] via-transparent" rounded-lg py-5 bg-[#a2a1a341] dark:bg-[#444446b1] w-3/4' />
                </div>
            ))}
        </div>
    );
};

const VideoResults = ({ query }: VideoResultsProps) => {
    const router = useRouter();
    const safeSearchValue = useCellValue(filterOptionCell);
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
  
    const requestConfig = {
      query: query,
      safeSearchValue: switchValue,
      pageno: Number(router.query.pageno) ?? 1,
      category: "videos"
    };

    const { data, isLoading, error } = api.swoop.videoSearch.useQuery<VideoResult>(requestConfig);

    if (isLoading) return <SkeletonVideoLoader />;

  return (
    <section className='w-full flex flex-col pl-6 sm:pl-12 pt-6 pr-3 max-w-4xl space-y-10 pb-10'>
        {data?.map((source: VideoResult) => {
            const openVideoLink = () => {
                window.open(source.url, '_blank');
            };
            return (
                <div key={source.title} className='h-[250px] max-h-[250px] w-full rounded-lg shadow-md bg-[#EAE8ED] dark:bg-[#39393cb1] border border-[hsla(0,0%,51%,0.25)] text-[#1d1d1f] dark:text-[#eae8ed] p-2 cursor-pointer transition ease hover:scale-[0.99]'>
                    <div className='group'>
                        <div className='w-full h-full flex flex-col'>
                            <a href={source.url} className='text-xs line-clamp-1 text-blue-400'>{source.pretty_url}</a>
                            <a href={source.url}>
                                <h1 className='text-lg text-[#1d1d1f] dark:text-[#eae8ed] truncate group-hover:underline my-2'>
                                    <span>{source.title}</span>
                                    <span className='text-[#93939689]'> - {source.parsed_url[1].replace('www.', '').replace('.com', '')}</span>
                                </h1>
                            </a>
                            <div className='flex items-center justify-between w-full'>
                                <div className='w-1/2 h-[150px] flex items-center justify-center relative'>
                                    <img 
                                        src={source.thumbnail} 
                                        alt={source.title} 
                                        className='w-full h-full object-cover rounded-md'
                                        onClick={openVideoLink}
                                    />
                                    <div className='absolute h-[48px] w-[48px] rounded-full bg-[#eae8ed90] backdrop-blur-md flex items-center justify-center'>
                                        <BsFillPlayFill className='text-[#1d1d1f54] text-3xl pl-[2px]' />
                                    </div>
                                </div>
                                <div className='w-1/2 h-[150px] flex flex-col space-y-4 items-left justify-start p-4'>
                                    <p className='text-sm text-[#1d1d1fba] dark:text-gray-400 line-clamp-3'>
                                        {source!.title!.charAt(0).toUpperCase() + source!.title!.slice(1)}
                                    </p>
                                    <p className='text-sm text-[#1d1d1fba] dark:text-gray-400 line-clamp-3'>
                                        {source.parsed_url[1].replace('www.', '').replace('.com', '')}
                                        {source.publishedDate ? ` - ${source.publishedDate}` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </section>
  )
}

export default VideoResults;
