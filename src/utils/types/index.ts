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

export interface SearchResult {
    title: string;
    url: string;
    content: string;
    [key: string]: any;
}

export interface SearchData {
    query: string;
    number_of_results: number;
    results: SearchResult[];
    suggestions: string[];
    [key: string]: any;
}

export interface ImageResult {
    template?: string;
    url?: string;
    thumbnail_src?: string;
    img_src?: string;
    content?: string;
    title?: string;
    source?: string;
    img_format?: string;
    engine?: string;
    parsed_url?: string[],
    engines?: string[],
    positions?: number[],
    score?: number;
    category?: string;
    pretty_url?: string;
    [key: string]: any;
}

export interface ImageData {
    query?: string;
    number_of_results?: number;
    results?: ImageResult[];
    [key: string]: any;
}
