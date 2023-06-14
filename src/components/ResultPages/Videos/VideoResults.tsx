/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/bs';

import { api } from '@utils/api';
import type { VideoResult } from '@utils/types';

import SkeletonVideoLoader from './SkeletonVideoLoader';
import PaginationButtons from '@components/Pagination/PaginationButtons';
import { filterOptionCell } from '@components/Settings/Widgets/SafeSearch';

import { useCellValue } from '@/stateManager';

interface VideoResultsProps {
    query: string;
}

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
    <section className='w-full flex flex-col mx-auto pl-3 sm:pl-12 pt-6 pr-3 max-w-4xl space-y-10 pb-10'>
        {data?.map((source: VideoResult) => {
            const openVideoLink = () => {
                window.open(source.url, '_blank');
            };
            return (
                <div key={source.title} className='h-[250px] max-h-[250px] w-full rounded-lg shadow-lg bg-[#EAE8ED] dark:bg-[#39393cb1] border border-[hsla(0,0%,51%,0.25)] text-[#1d1d1f] dark:text-[#eae8ed] p-2 cursor-pointer transition ease hover:scale-[0.99]'>
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
                                <div className='w-1/2 h-[150px] flex items-center justify-center relative border border-[hsla(0,0%,51%,0.2)] rounded-md shadow-sm'>
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
                                <div className='w-1/2 h-[150px] flex flex-col space-y-2 items-left justify-start px-2'>
                                    <p className='text-sm text-[#1d1d1fba] dark:text-gray-400 line-clamp-3 p-1 w-auto rounded-lg bg-[#cdccce8f] dark:bg-[#414144b1] border border-[hsla(0,0%,51%,0.2)]'>
                                        {source!.title!.charAt(0).toUpperCase() + source!.title!.slice(1)}
                                    </p>
                                    <p className={`text-xs overflow-hidden whitespace-break-spaces text-[#1d1d1fba] w-[90%] line-clamp-4 ${!source.content && 'italic'} dark:text-gray-400`}>{source.content && source.content.length >= 1 ? source.content : 'This site did not provide a description.'}</p>
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
        <PaginationButtons searchType='videos' className='mx-auto' />
    </section>
  )
}

export default VideoResults;
