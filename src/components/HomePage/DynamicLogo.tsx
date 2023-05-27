import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useCheckMounted } from '@hooks/useCheckMounted';

const dynamicImageControl = (currentTheme: string) => {
    if (currentTheme === 'dark') {
      return (
        <Image src="/assets/mask-logo-light.png" alt="Incognito Logo" height={90} width={125} priority />
       /*  <Image src="/assets/incognito-light.png" alt="Incognito Logo" height={40} width={65} priority /> */
      );
    } else {
      return (
        <Image src="/assets/mask-logo.png" alt="Incognito Logo" height={90} width={125} priority />
        /* <Image src="/assets/incognito-icon.png" alt="Incognito Logo" height={40} width={65} priority /> */
      );
    }
  };
  
  const DynamicLogo = () => {
    const { systemTheme, theme } = useTheme();
    const isMounted = useCheckMounted();

    const currentTheme = theme === 'system' ? systemTheme! : theme!;
    const dynamicLogo = isMounted ? dynamicImageControl(currentTheme) : null;
  
    return dynamicLogo;
  };
  
  export default DynamicLogo;
