import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ImagesPreview from './ImagesPreview';
import InfoboxPreview from './InfoboxPreview';
import ResultLinks from './ResultLinks';

import DynamicLogo from '@components/HomePage/DynamicLogo';
import PaginationButtons from '@components/Pagination/PaginationButtons';
import { filterOptionCell } from '@components/Settings/Widgets/SafeSearch';

import { useCellValue } from '@/stateManager';
import { api } from '@utils/api';
import { router } from '@trpc/server';


interface SearchResultsProps {
    query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
    const router = useRouter();
    const [numResults, setNumResults] = useState<string | null>(null);
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
        pageno: router.query.pageno 
            ? Number(router.query.pageno) >= 1 
            ? Number(router.query.pageno) + 1 
            : 1
            : 1,
    };

    const { data, isLoading, error } = api.swoop.search.useQuery(requestConfig);
    
    useEffect(() => {
        const rand = Math.floor(Math.random() * (3500000 - 2000000 + 1)) + 2000000;
        setNumResults((prev) => rand.toLocaleString());
    }, []);

    return (
        <div className='w-full flex flex-col mx-auto pl-6 sm:pl-12 pt-6 pr-3'>
            <p className='text-[#1d1d1f56] dark:text-gray-500 text-sm'>About {numResults} results</p>
            <div className='w-full mt-4 text-[#1d1d1f] dark:text-[#eae8ed] flex justify-between max-w-[1500px]'>
                <ResultLinks data={data} isLoading={isLoading} error={error} />
                <div className='w-[40%] max-h-[400px] hidden md:flex flex-col pr-4'>
                    <div className='max-w-[400px]'>
                        <h1 className='flex items-center border-b py-2'>
                            <DynamicLogo height={40} width={65} />
                            <span>images</span>
                        </h1>
                        <ImagesPreview query={query} />
                    </div>
                    <InfoboxPreview query={query} />
                </div>
            </div> 
            <PaginationButtons />
        </div>
    );
};

export default SearchResults;
