/* eslint-disable @next/next/no-img-element */
import type { ImageResult } from '@utils/types';
import { api } from '@utils/api';

import SkeletonImgLoader from './SkeletonImgLoader';
import { filterOptionCell } from '@components/Settings/Widgets/SafeSearch';

import { useCellValue } from '@/stateManager';

interface ImageResultsProps {
    query: string;
}

const ImageResults = ({ query }: ImageResultsProps) => {
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
    category: "images"
  };

  const { data, isLoading, error } = api.swoop.imageSearch.useQuery(requestConfig);

  const openImageSource = (url: string) => {
    window.open(url, '_blank');
  };

  if (error) {
    return (
      <div className='text-[#1d1d1f] dark:text-[#eae8ed] font-semibold text-2xl'>There was an error retrieving the image results.</div>
    );
  }

  if (isLoading) {
    return <SkeletonImgLoader />;
  }

  return (
    <section className='mt-8 px-8 grid grid-cols-3 gap-4'>
      {
        data?.filter((result: ImageResult) => result.img_src).map((result: ImageResult) => {
          const parsedUrl = result.parsed_url;
          const source = parsedUrl && parsedUrl[1].replace('www.', '').replace('.com', '');
          if (!result || !result.img_src) return null;
          return (
            <div key={result.img_src} className='bg-gray-200 dark:bg-gray-800 h-64 rounded-md shadow-md flex flex-col text-[#1d1d1f] dark:text-[#eae8ed] border border-[hsla(0,0%,51%,0.15)]'>
              <img
                src={result.img_src}
                alt={result.title}
                loading='lazy'
                className='h-[82%] w-full object-cover rounded-md cursor-pointer'
                onClick={openImageSource.bind(null, result.img_src)}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  // Handle image loading error
                  e.preventDefault();
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite error loop
                  result.img_src = '/assets/globe.png';
                }}
              />
              <h1 className='text-xs leading-4 line-clamp-1 p-1 text-[#1d1d1fba] dark:text-[#eae8eda7]'>{source && source.charAt(0).toUpperCase() + source.slice(1)}</h1>
              <h1 className='text-sm leading-4 line-clamp-1 px-1'>{result.title && result.title.charAt(0).toUpperCase() + result.title.slice(1)}</h1>
            </div>
          );
      })
      }
    </section>
  )
}

export default ImageResults;
