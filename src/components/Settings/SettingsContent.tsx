import Calendar from './Widgets/Calendar';
import SafeSearch from './Widgets/SafeSearch';
import ThemeSelector from './Widgets/ThemeSelector';

const SettingsContent = () => {
  return (
    <div className='mx-auto w-[80%] h-auto mt-4 flex flex-col'>
        <div className='w-full flex min-h-[80px] justify-between'>
            <div className='h-full max-h-[80px] w-[40%]'>
                <Calendar />
            </div>
            <div className='h-full max-h-[80px] w-[51%]'>
                <ThemeSelector />
            </div>
        </div>
        <div className='flex flex-col w-full h-auto mt-4'>
            <SafeSearch />
        </div>
    </div>
  );
}   

export default SettingsContent;
