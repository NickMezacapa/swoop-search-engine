import { 
    cellWithStorage,
    createJSONStorage,
    useCellValue,
    useSetCell,
} from '@/stateManager';

export const storage = createJSONStorage(() => sessionStorage);
export const filterOptionCell = cellWithStorage('safeSearchOption', 'Off', storage);

interface FilterOptionProps {
    content: string;
    value: any;
    lastItem?: boolean;
    callback: any;
}

const FilterOption = ({ content, value, lastItem, callback }: FilterOptionProps) => {
    const notLastItemClassNames = 'border-r border-[#989799]';
    const activeBgClass = 'bg-[#505054b1]';
    return (
        <div className={`h-full w-1/3 flex items-center justify-center ${!lastItem && notLastItemClassNames}`}>
            <li 
                className={`${value === content && activeBgClass} px-3 py-2 cursor-pointer rounded-lg`} 
                onClick={() => callback(content)}>
                {content}
            </li>
        </div>
    );
};

const FilterOptions = () => {
    const setFilterOption = useSetCell(filterOptionCell);
    const filterOptionValue = useCellValue(filterOptionCell);
    const filterChoices = ['Off', 'Mid', 'Strict'];
    return (
        <div className='w-full flex items-center justify-between'>
            {filterChoices.map((choice: string) => 
                <FilterOption key={choice} content={choice} value={filterOptionValue} callback={setFilterOption} />)}
        </div>
    );
};

const SafeSearch = () => {
  return (
    <div className='w-full h-full py-2 text-[#eae8ed] font-light flex flex-col'>
        <h3 className='select-none'>Safe Search</h3>
        <ul className='text-sm decoration-none flex justify-between mt-4'>
            <FilterOptions />
        </ul>
    </div>
  );
}

export default SafeSearch;
