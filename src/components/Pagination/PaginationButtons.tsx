import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import { filterOptionCell } from '@/components/Settings/Widgets/SafeSearch';
import { useCellValue } from '@/stateManager';

const PaginationButtons = () => {
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
    const pageno = startIndex>= 10 ? startIndex / 10 + 1 : 1;

  return (
    <div className='max-w-lg text-blue-400 flex items-center justify-between pb-8'>
        {startIndex >= 10 && (
            <Link href={`/search?q=${router.query.q}&pageno=${pageno - 1}&safesearch=${switchValue}&start=${startIndex - 10}`}>
                <div>
                    <AiOutlineArrowLeft />
                    <p>Previous</p>
                </div>
            </Link>
        )}
        <Link href={`/search?q=${router.query.q}&pageno=${pageno + 1}&safesearch=${switchValue}&start=${startIndex + 10}`}>
            <div>
                <AiOutlineArrowRight />
                <p>Next</p>
            </div>
        </Link>
    </div>
  )
}

export default PaginationButtons
