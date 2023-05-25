import SettingsCloseButton from './SettingsCloseButton';
import SettingsContent from './SettingsContent';

interface SettingsModalProps {
    callBack: () => void;
}

const SettingsModal = ({ callBack }: SettingsModalProps) => {
  return (
    <section className='absolute top-12 right-2 flex flex-col items-center min-w-[250px] min-h-[300px] h-[300px] transition ease duration-150'>
        <div className='w-full h-full bg-[#39393cb1] border border-[hsla(0,0%,51%,0.16)] backdrop-blur-lg flex flex-col items-center rounded-lg py-6 relative'>
            <SettingsCloseButton controlClose={callBack} />
            <h1 className='text-[#EAE8Ed] font-semibold select-none'>Settings</h1>
            <SettingsContent />
        </div>
    </section>
  )
}

export default SettingsModal;
