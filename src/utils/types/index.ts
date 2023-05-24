import { type IconType } from 'react-icons';

export type HeaderOptionLink = {
    Icon: IconType;
    title: string;
    selected?: boolean;
    href?: string;
}

export type NavLink = {
    label: string;
    href: string;
}
