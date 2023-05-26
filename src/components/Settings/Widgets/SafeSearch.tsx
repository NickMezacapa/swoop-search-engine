import { useContext } from 'react';
import { SearchFilterContext } from '@contexts/SearchFilterProvider';

const SafeSearch = () => {
    const { filterOption, setFilterOption } = useContext(SearchFilterContext);
    const activeBgClass = 'bg-[#505054b1]';

    const handleSearchOptionChange = (option: string) => {
        setFilterOption(option);
    };

  return (
    <div className='w-full h-full py-2 text-[#eae8ed] font-light flex flex-col'>
        <h3 className='select-none'>Safe Search</h3>
        <ul className='text-sm decoration-none flex justify-between mt-4'>
            <div className='w-full flex items-center justify-between'>
                <div className='h-full w-1/3 border-r border-[#989799] flex items-center justify-center'>
                    <li 
                        className={`${filterOption === 'Off' && activeBgClass} px-3 py-2 cursor-pointer rounded-lg`}
                        onClick={() => handleSearchOptionChange('Off')}>
                        Off
                    </li>
                </div>
                <div className='h-full w-1/3 border-r border-[#989799] flex items-center justify-center'>
                    <li 
                        className={`${filterOption === 'Mid' && activeBgClass} px-3 py-2 cursor-pointer rounded-lg`}
                        onClick={() => handleSearchOptionChange('Mid')}>
                        Mid
                    </li>
                </div>
                <div className='h-full w-1/3 flex items-center justify-center'>
                    <li     
                        className={`${filterOption === 'Strict' && activeBgClass} px-3 py-2 cursor-pointer rounded-lg`}
                        onClick={() => handleSearchOptionChange('Strict')}>
                        Strict
                    </li>
                </div>
            </div>
        </ul>
    </div>
  );
}

export default SafeSearch;
