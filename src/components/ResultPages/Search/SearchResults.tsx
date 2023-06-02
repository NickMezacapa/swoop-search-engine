/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ImagesPreview from './ImagesPreview';
import InfoboxPreview from './InfoboxPreview';
import DynamicLogo from '@components/HomePage/DynamicLogo';

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
interface SearchResultsProps {
    searchResults: SearchData;
    imageResults: any;
}

const SearchResults = ({ searchResults, imageResults }: SearchResultsProps) => {
    const [numResults, setNumResults] = useState<string | null>(null);

    useEffect(() => {
        const rand = Math.floor(Math.random() * (3500000 - 2000000 + 1)) + 2000000;
        setNumResults((prev) => rand.toLocaleString());
    }, []);

    return (
        <div className='w-full flex flex-col mx-auto pl-6 sm:pl-12 pt-6 pr-3'>
            <p className='text-[#1d1d1f56] dark:text-gray-500 text-sm'>About {numResults} results</p>
            <div className='w-full mt-4 text-[#1d1d1f] dark:text-[#eae8ed] flex justify-between max-w-[1500px]'>
                <div className='w-full md:w-[50%] py-2 pr-2'>
                    {
                        searchResults.results.map((result: SearchResult) => {
                            return (
                                <div 
                                    key={`${uuidv4()}`}
                                    className='bg-[#EAE8ED] cursor-pointer overflow-hidden transition hover:scale-[0.99] shadow-md mb-8 text-[#1d1d1f] dark:bg-[#39393cb1] dark:text-[#eae8ed] flex flex-col space-y-2 rounded-lg p-2'>
                                    <div className='group'>
                                        <a href={result.url} className='text-xs text-blue-400 line-clamp-1'>{result.pretty_url}</a>
                                        <a href={result.url}>
                                            <h1 className='text-xl text-[#1d1d1f] dark:text-[#eae8ed] truncate group-hover:underline my-2'>{result.title}</h1>
                                        </a>
                                        <p className='text-sm cursor-pointer text-[#1d1d1fba] dark:text-gray-400 line-clamp-3'>{result.content}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className='w-[40%] max-h-[400px] hidden md:flex flex-col pr-4'>
                    <div className='max-w-[400px]'>
                        <h1 className='flex items-center border-b py-2'>
                            <DynamicLogo height={40} width={65} />
                            <span>images</span>
                        </h1>
                        <ImagesPreview imageResults={imageResults} />
                    </div>
                    <InfoboxPreview searchResults={searchResults} />
                </div>
            </div>  
        </div>

    );
};

export default SearchResults;
