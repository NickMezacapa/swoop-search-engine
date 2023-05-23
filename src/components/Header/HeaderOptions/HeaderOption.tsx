import { type IconType } from 'react-icons';

interface HeaderOptionProps {
    Icon: IconType;
    title: string;
    selected?: boolean;
    aria: string;
    alt: string;
}

const HeaderOption = ({ Icon, title, selected }: HeaderOptionProps) => {
  return (
    <div className={`flex items-center space-x-1 border-b-4 border-transparent delay-200 hover:delay-[250ms] hover:border-purple-500 pb-3 cursor-pointer ${selected && 'text-purple-500 border-purple-500' }`}>
        <Icon className='h-4' />
        <p className='hidden sm:inline-flex'>{title}</p>
    </div>
  )
}

export default HeaderOption;
