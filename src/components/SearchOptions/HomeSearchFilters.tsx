import { useRouter } from 'next/router';

import { SEARCH_FILTER_OPTIONS } from '@constants/index';
import { type SearchFilter } from '@utils/types';

import GradientTile from '@components/GradientTile';

const HomeSearchFilters = () => {
  const router = useRouter();

  // only want to display search filters that do not match current URI
  // ex: if `/images`, then 'Images' result filter should not be displayed
  const dynamicSearchFilters = SEARCH_FILTER_OPTIONS.filter(
    (opts: SearchFilter) => opts.path !== router.pathname || opts.path !== router.asPath
  );

  return (
    <div className='overflow-x-scroll'>
      <div className='hidden h-[200px] max-h-[200px] flex-grow mt-4 md:flex gap-x-6 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] text-[#eae8ed] leading-[1.08349] tracking-[-0.003em] text-3xl'>
        {dynamicSearchFilters.map((item: SearchFilter) => {
          const ItemIcon = item.Icon;
          return (
            <GradientTile 
              key={item.id}
              className={`${item.className} relative transition cursor-pointer hover:scale-[1.01] w-[250px] overflow-hidden border border-gray-400 shadow-2xl rounded-lg bg-[#1d1d1f7f] backdrop-blur-md dark:border-gray-600`}>
                <div 
                  onClick={() => router.replace(item.path)}
                  className='absolute top-0 left-0 right-0 w-full h-full bg-[#1d1d1f7f] rounded-lg backdrop-blur-sm'>
                  <p className='pl-6 pt-6 flex gap-x-2 items-center'>
                    <span>{<ItemIcon className='h-5' />}</span>
                    <span>{item.title}</span>
                  </p>
                </div>
            </GradientTile>
          );
        })}
        <div className='h-[200px] max-h-[200px] w-[500px] min-w-[500px]' />
      </div>
    </div>
  )
}

export default HomeSearchFilters;
