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

export interface BaseResult {
    title?: string;
    url?: string;
    content?: string;
    [key: string]: any;
}

export interface SearchResult extends BaseResult {
}

export interface SearchData<T extends BaseResult> {
    query?: string;
    number_of_results?: number;
    results: T[];
    suggestions?: string[];
    [key: string]: any;
}

export interface ImageResult extends BaseResult {
    template?: string;
    thumbnail_src?: string;
    img_src?: string;
    source?: string;
    img_format?: string;
    engine?: string;
    parsed_url?: string[];
    engines?: string[];
    positions?: number[];
    score?: number;
    category?: string;
    pretty_url?: string;
}

export interface ImageData extends SearchData<ImageResult> { }

export interface VideoResult extends BaseResult {
    thumbnail: string;
    author: string;
    length: string;
    iframe_src: string;
}

export interface VideoData extends SearchData<VideoResult> { }
