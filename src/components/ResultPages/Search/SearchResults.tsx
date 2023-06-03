import { useEffect, useState } from 'react';
import ImagesPreview from './ImagesPreview';
import InfoboxPreview from './InfoboxPreview';
import ResultLinks from './ResultLinks';

import DynamicLogo from '@components/HomePage/DynamicLogo';
import { useGetSearchResults } from '@hooks/useGetSearchResults';

interface SearchResultsProps {
    query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
    const [numResults, setNumResults] = useState<string | null>(null);
    const forImages = false;
    const { loading, error, data } = useGetSearchResults(query, forImages);

    useEffect(() => {
        const rand = Math.floor(Math.random() * (3500000 - 2000000 + 1)) + 2000000;
        setNumResults((prev) => rand.toLocaleString());
    }, []);

    return (
        <div className='w-full flex flex-col mx-auto pl-6 sm:pl-12 pt-6 pr-3'>
            <p className='text-[#1d1d1f56] dark:text-gray-500 text-sm'>About {numResults} results</p>
            <div className='w-full mt-4 text-[#1d1d1f] dark:text-[#eae8ed] flex justify-between max-w-[1500px]'>
                <ResultLinks query={query} />
                <div className='w-[40%] max-h-[400px] hidden md:flex flex-col pr-4'>
                    <div className='max-w-[400px]'>
                        <h1 className='flex items-center border-b py-2'>
                            <DynamicLogo height={40} width={65} />
                            <span>images</span>
                        </h1>
                        <ImagesPreview query={query} />
                    </div>
                    <InfoboxPreview searchResults={data} />
                </div>
            </div>  
        </div>
    );
};

export default SearchResults;
