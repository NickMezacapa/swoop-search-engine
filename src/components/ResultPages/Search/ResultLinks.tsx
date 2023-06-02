import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

interface SearchData {
    query: string;
    number_of_results: number;
    results: SearchResult[];
    suggestions: string[];
    [key: string]: any;
}
interface SearchResult {
    title: string;
    url: string;
    content: string;
    [key: string]: any;
}
interface ResultLinksProps {
    searchResults: SearchData;
}

const ResultLinks = ({ searchResults }: ResultLinksProps) => {
  return (
    <div className='w-full md:w-[50%] py-2 pr-2'>
    {
        searchResults.results.map((result: SearchResult, index: number) => {
            return (
                <motion.div 
                    key={`${uuidv4()}`}
                    initial={{
                        x: '-60%',
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'linear',
                        delay: index * 0.25
                    }}
                    className='bg-[#EAE8ED] cursor-pointer overflow-hidden transition hover:scale-[0.99] shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] flex flex-col space-y-2 rounded-lg p-2'>
                    <div className='group'>
                        <a href={result.url} className='text-xs text-blue-400 line-clamp-1'>{result.pretty_url}</a>
                        <a href={result.url}>
                            <h1 className='text-xl text-[#1d1d1f] dark:text-[#eae8ed] truncate group-hover:underline my-2'>{result.title}</h1>
                        </a>
                        <p className='text-sm cursor-pointer text-[#1d1d1fba] dark:text-gray-400 line-clamp-3'>{result.content}</p>
                    </div>
                </motion.div>
            );
        })
    }
    </div>
  )
}

export default ResultLinks;
