const Calendar = () => {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
    const date = currentDate.getDate();

  return (
    <div className='h-full w-full rounded-lg relative select-none flex flex-col overflow-hidden border border-[hsla(0,0%,51%,0.16)] transition-colors ease'>
        <div className='w-full h-[30%] bg-red-400 dark:bg-[#0c0c0db1] shadow-2xl flex items-center justify-center font-semibold text-[#eae8ed] dark:text-blue-500'>
            {monthName}
        </div>
        <div className='w-full pb-1 h-[70%] bg-[#EaE8ed] dark:bg-[#212123b1] flex justify-center items-center text-[#1d1d1f] dark:text-[#eae8ed] text-5xl'>
            {date}
        </div>
    </div>
  );
}

export default Calendar;
