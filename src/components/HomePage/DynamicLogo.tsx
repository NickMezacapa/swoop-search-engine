import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useCheckMounted } from '@hooks/useCheckMounted';

interface DynamicLogoProps {
  height: number;
  width: number;
}

const dynamicImageControl = (currentTheme: string, width: number, height: number) => {
    if (currentTheme === 'dark') {
      return (
        <Image src="/assets/mask-logo-light.png" alt="Incognito Logo" height={height} width={width} loading='eager' priority />
      );
    } else {
      return (
        <Image src="/assets/mask-logo.png" alt="Incognito Logo" height={height} width={width} loading='eager' priority />
      );
    }
  };
  
  const DynamicLogo = ({height, width}: DynamicLogoProps) => {
    const { systemTheme, theme } = useTheme();
    const isMounted = useCheckMounted();

    const currentTheme = theme === 'system' ? systemTheme! : theme!;
    const dynamicLogo = isMounted ? dynamicImageControl(currentTheme, width, height) : null;
  
    return dynamicLogo;
  };
  
  export default DynamicLogo;
