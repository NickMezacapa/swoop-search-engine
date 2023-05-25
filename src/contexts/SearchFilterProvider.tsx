import { Dispatch, createContext, useContext, useState, SetStateAction } from 'react';

interface SearchFilterProviderProps {
    children: React.ReactNode;
}

interface SearchFilterContextProps {
    filterOption: string;
    setFilterOption: Dispatch<SetStateAction<string>>;
}

export const SearchFilterContext = createContext<SearchFilterContextProps>({
    filterOption: 'Off',
    setFilterOption: () => {},
});

export const useSearchFilterState = () => useContext(SearchFilterContext);

export const SearchFilterProvider = ({ children }: SearchFilterProviderProps) => {
    const [filterOption, setFilterOption] = useState('Off');

    return (
        <SearchFilterContext.Provider value={{ filterOption, setFilterOption }}>
            {children}
        </SearchFilterContext.Provider>
    );
};
