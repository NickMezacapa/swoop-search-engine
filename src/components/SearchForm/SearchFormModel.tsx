import { useRouter, NextRouter } from 'next/router';
import { useState } from 'react'

type SearchFormModelProps = {
    handleRouting: (searchQuery: string) => void;
  };
const SearchFormModel: React.FC<SearchFormModelProps> = ({ handleRouting }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleRouting(searchQuery);
    };
  
    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => handleSearchFormSubmit}>Search</button>
      </div>
    );
  };
