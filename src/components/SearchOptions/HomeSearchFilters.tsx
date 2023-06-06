import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { SEARCH_FILTER_OPTIONS } from '@utils/constants/index';
import { type SearchFilter } from '@utils/types';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import GradientTile from '@components/GradientTile';

const HomeSearchFilters = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleScrollLeft = () => {
    if (parentRef.current) {
      const newPosition = scrollPosition - parentRef.current.clientWidth;

      if (newPosition >= 0) {
        setScrollPosition(newPosition);
        parentRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      } else {
        setScrollPosition(0);
        parentRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  const handleScrollRight = () => {
    if (parentRef.current) {
      const scrollWidth = parentRef.current.scrollWidth;
      const containerWidth = parentRef.current.clientWidth;
      const newPosition = scrollPosition + containerWidth;

      if (newPosition < scrollWidth) {
        setScrollPosition(newPosition);
        parentRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      } else {
        setScrollPosition(scrollWidth);
        parentRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      const containerWidth = parentRef.current.clientWidth;
      const scrollWidth = parentRef.current.scrollWidth;
      const maxScroll = scrollWidth - containerWidth;
      const currentPosition = parentRef.current.scrollLeft;

      setShowLeftArrow(currentPosition > 0);
      setShowRightArrow(currentPosition < maxScroll);
    }
  }, [scrollPosition]);


  // only want to display search filters that do not match current URI
  // ex: if `/images`, then 'Images' result filter should not be displayed
  const dynamicSearchFilters = SEARCH_FILTER_OPTIONS.filter(
    (opts: SearchFilter) => opts.path !== router.pathname || opts.path !== router.asPath
  );

  // TAILWIND GRADIENT
  // [mask-image:linear-gradient(to_bottom,white_60%,transparent)]
  return (
    <div className='overflow-x-scroll relative' ref={parentRef}>
      <div className={`absolute h-full w-[65%] max-w-5xl mx-auto flex items-center justify-end`}>
        {showLeftArrow && (
                  <button onClick={handleScrollLeft} className='border focus:outline-none sticky border-[hsla(0,0%,51%,0.56)] z-[99999] text-4xl flex justify-center items-center bg-[#121212a9] rounded-full backdrop-blur-sm text-[#eae8ed] w-12 h-12'>
                  <AiOutlineArrowLeft />
                </button>
        )}
        {showRightArrow && (
                  <button onClick={handleScrollRight} className='border focus:outline-none relative border-[hsla(0,0%,51%,0.56)] z-[99999] text-4xl flex justify-center items-center bg-[#121212a9] rounded-full backdrop-blur-sm text-[#eae8ed] w-12 h-12'>
                  <AiOutlineArrowRight />
                </button>
        )}
      </div>
      <div className='hidden h-[200px] max-h-[200px] flex-grow mt-4 md:flex gap-x-6 text-[#eae8ed] leading-[1.08349] tracking-[-0.003em] text-3xl'>
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
