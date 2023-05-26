import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import { useCheckMounted } from '@hooks/useCheckMounted';

const ThemeSelector = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const [isChecked, setIsChecked] = useState(currentTheme === 'dark')
    const isMounted = useCheckMounted();

    const toggleTheme = () => {
        if (!isMounted) return null;
        const newTheme = currentTheme !== 'dark' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        setIsChecked(currentTheme === 'dark');
    }, [currentTheme]);

  return (
    <div className='w-full h-full relative flex flex-col overflow-hidden'>
        <div className='h-[30%] flex items-center justify-center text-[#eae8ed] font-light select-none'>
            Theme
        </div>
        <div className='w-full h-[70%] flex pt-2 justify-center text-center'>
            <label className='ThemeSlider-Label relative inline-block w-[75px] h-[10px]'>
                <input type='checkbox' id='toggleThemeSlider' onChange={toggleTheme} checked={isChecked} />
                <span className='ThemeSlider SliderRound relative flex items-center justify-between'>
                    <BsFillSunFill className='ml-3' />
                    <BsFillMoonFill className='mr-3 pl-1' />
                </span>
            </label>
        </div>
    </div>
  )
}

export default ThemeSelector;
