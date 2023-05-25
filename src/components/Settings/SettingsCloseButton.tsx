import { AiOutlineClose } from 'react-icons/ai';

interface SettingsCloseButtonProps {
    controlClose: () => void;
}

const SettingsCloseButton = ({ controlClose }: SettingsCloseButtonProps) => {
  return (
    <div onClick={controlClose} className='absolute top-1 right-1 rounded-lg p-2 text-base bg-[#505054b1] text-gray-300 flex items-center justify-center cursor-pointer transition hover:scale-[1.08]'>
        <AiOutlineClose />
    </div>
  );
}

export default SettingsCloseButton;
