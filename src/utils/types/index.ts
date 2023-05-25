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

export type SearchSuggestion = {
    Icon: () => JSX.Element;
    title?: string;
    href?: string;
    alt: string;
    id: number;
}
