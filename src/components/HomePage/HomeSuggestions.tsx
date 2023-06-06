import { SEARCH_SUGGESTIONS_HOME } from '@utils/constants/index';
import { type SearchSuggestion } from '@utils/types';

export const HomeSuggestions = () => {
    return (
        <div>
            <h3 className='text-[#6e6e73]'>Suggested Searches</h3>
            <div className='flex items-center space-x-6'>
                {SEARCH_SUGGESTIONS_HOME.map((item: SearchSuggestion) => {
                    const ItemIcon = item.Icon;
                    return (
                        <div
                            key={item.id}
                            onClick={() => { window.open(item.href, '_blank') }}
                            aria-label={item.alt}
                            className='h-14 w-14 mt-4 shadow-lg overflow-hidden bg-[#E8E7E3] border border-gray-300 rounded-full p-2 flex items-center justify-center cursor-pointer transition hover:scale-[0.96] hover:bg-[#deddda] dark:bg-[#39393cb1] dark:border-[hsla(0,0%,51%,0.16)]'>
                            <ItemIcon />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomeSuggestions;
