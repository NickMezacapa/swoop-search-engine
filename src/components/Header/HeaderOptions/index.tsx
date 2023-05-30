import { useState } from 'react';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';

import { HEADER_OPTION_LINKS } from '@constants/index';
import { type HeaderOptionLink } from '@utils/types';

import HeaderOption from './HeaderOption';

interface HeaderOptionsProps {
    active: string;
    callBack: (option: string) => void;
}

const HeaderOptions = ({ active, callBack }: HeaderOptionsProps) => {
    const [hoveredOptionIndex, setHoveredOptionIndex] = useState<number | null>(null);

  return (
    <section className='flex w-full text-gray-400 justify-start mb-2 pl-12 mt-4 text-sm lg:space-x-36'>
        <div className='flex space-x-6'>
            {HEADER_OPTION_LINKS.map((link: HeaderOptionLink, index: number) => {
                return (
                    <button
                        key={index}
                        className='relative px-3 py-2 rounded-lg text-inherit transition-colors delay-200 hover:text-blue-400 hover:delay-[250ms] outline:focus-none'
                        onMouseEnter={() => setHoveredOptionIndex(index)}
                        onMouseLeave={() => setHoveredOptionIndex(null)}
                        onClick={() => callBack(link.title)}>
                        <AnimatePresence>
                            {hoveredOptionIndex === index && (
                                <motion.span 
                                    className='absolute inset-0 rounded-lg bg-[#c8c7ca] dark:bg-[#39393cb1]'
                                    layoutId='hoverBackground'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.25, delay: 0.35 } }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <span className='relative z-10'>
                            <HeaderOption 
                                key={index} 
                                Icon={link.Icon} 
                                title={link.title} 
                                selected={active === link.title ? true : link.selected}
                                aria={`${link.title} results`} 
                                alt={`${link.title} results`} />
                        </span>
                    </button>
                );
            })}
        </div>
        <div className='lg:flex space-x-6 text-gray-400 hidden py-2 px-3'>
            <Link href='/privacy' className='transition ease duration-150 delay-75 hover:text-blue-400 cursor-pointer'>Privacy</Link>
            <Link href='/about' className='transition ease duration-150 delay-75 hover:text-blue-400 cursor-pointer'>About</Link>
        </div>
    </section>
  )
}

export default HeaderOptions;
