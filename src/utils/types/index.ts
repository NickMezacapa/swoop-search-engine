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

export type SearchFilter = {
    Icon: IconType;
    title: string;
    path: string;
    alt: string;
    id: number;
    className: string;
}

export interface DimensionObject {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
    right: number;
    bottom: number;
}

export type UseDimensionsHook = [
    (node: HTMLElement) => void,
    {} | DimensionObject,
    HTMLElement
];

export interface UseDimensionsArgs {
    liveMeasure?: boolean;
}
