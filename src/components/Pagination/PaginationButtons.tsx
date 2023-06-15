import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import { filterOptionCell } from '@/components/Settings/Widgets/SafeSearch';
import { useCellValue } from '@/stateManager';

interface PaginationButtonsProps {
    searchType: string;
    className?: string;
}

const PaginationButtons = ({ searchType, className }: PaginationButtonsProps) => {
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

    const startIndex = Number(router.query.start) || 0;
    const pageno = startIndex >= 10 ? startIndex / 10 + 1 : 1;

    const renderPageNumbers = () => {
      const pageNumbers: number[] = [];
      const maxPages = Math.ceil(startIndex / 10) + 3;

      if (pageno === 1) {
        pageNumbers.push(1, 2, 3);
      } else {
        pageNumbers.push(pageno - 1, pageno, pageno + 1);
      }
    
      return pageNumbers.map((num) => {
        return (
          <Link
            key={num}
            href={`/${searchType}?q=${router.query.q}&pageno=${num}&safesearch=${switchValue}&start=${(num - 1) * 10}`}
          >
            <div
              className={`px-3 py-1 rounded-full border border-[hsla(0,0%,51%,0.2)] ${
                num === pageno ? 'bg-[#b4b4b4a9] text-[#1d1d1f]' : 'bg-[#eae8ed] text-[#1d1d1f]'
              }`}
            >
              {num}
            </div>
          </Link>
        );
      });
    };

  return (
    <div className={`max-w-lg w-[90%] text-blue-400 flex flex-col items-center justify-between pb-8 mt-6 ${className}`}>
      <div className='w-full flex items-center justify-center text-center font-semibold text-2xl text-[#c7c6c8] mx-auto my-2'>swoooooooooop</div>
        <div className={`flex items-center w-full mt-2 ${!(startIndex >= 10) ? 'justify-center' : 'justify-between'}`}>
          {startIndex >= 10 && (
              <Link href={`/${searchType}?q=${router.query.q}&pageno=${pageno - 1}&safesearch=${switchValue}&start=${startIndex - 10}`}>
                  <div className='flex flex-col items-center justify-center'>
                      <AiOutlineArrowLeft />
                      <p>Previous</p>
                  </div>
              </Link>
          )}
          <Link href={`/${searchType}?q=${router.query.q}&pageno=${pageno + 1}&safesearch=${switchValue}&start=${startIndex + 10}`}>
              <div className='flex flex-col items-center justify-center'>
                  <AiOutlineArrowRight />
                  <p>Next</p>
              </div>
          </Link>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-2">
            {renderPageNumbers()}
      </div>
    </div>
  )
}

export default PaginationButtons;
