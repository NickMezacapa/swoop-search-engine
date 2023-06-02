import { useEffect, useState } from 'react';

import ImagesPreview from './ImagesPreview';
import InfoboxPreview from './InfoboxPreview';
import ResultLinks from './ResultLinks';

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
                <ResultLinks searchResults={searchResults} />
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
