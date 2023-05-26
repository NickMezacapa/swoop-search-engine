import { AiOutlinePlayCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsImages, BsNewspaper, BsMap } from 'react-icons/bs';
import { TbMapSearch } from 'react-icons/tb';
import { FaImages } from 'react-icons/fa';
import { BiVideo } from 'react-icons/bi';

import { 
    TwitterIcon,
    RedditIcon,
    YoutubeIcon,
    GmailIcon
 } from '@components/Icons';

import { type NavLink, HeaderOptionLink, SearchSuggestion, SearchFilter } from '@utils/types';

export const PRIMARY_NAV_LINKS: NavLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Images', href: '/images' },
    { label: 'Videos', href: '/videos' },
];

export const SECONDARY_NAV_LINKS: NavLink[] = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
];

export const HEADER_OPTION_LINKS: HeaderOptionLink[] = [
    { Icon: AiOutlineSearch, title: 'All', selected: false, href: '' },
    { Icon: BsImages, title: 'Images', selected: false, href: '/images' },
    { Icon: AiOutlinePlayCircle, title: 'Videos', selected: false, href: '/videos' },
    { Icon: BsNewspaper, title: 'News', selected: false, href: '/news' },
    { Icon: TbMapSearch, title: 'Maps', selected: false, href: '/maps' },
];

export const SEARCH_SUGGESTIONS_HOME: SearchSuggestion[] = [
    { Icon: TwitterIcon, title: 'TwitterIcon', alt: 'Twitter Icon', href: 'https://twitter.com', id: 1 },
    { Icon: YoutubeIcon, title: 'YoutubeIcon', alt: 'Youtube Icon', href: 'https://youtube.com', id: 3 },
    { Icon: RedditIcon, title: 'RedditIcon', alt: 'Reddit Icon', href: 'https://reddit.com', id: 2 },
    { Icon: GmailIcon, title: 'TwitterIcon', alt: 'Twitter Icon', href: 'https://gmail.com', id: 4 },
];

export const SEARCH_FILTER_OPTIONS: SearchFilter[] = [
    { Icon: AiOutlineSearch, title: 'All', alt: 'All', path: '/', id: 5, className: 'allResults-bg-fade' },
    { Icon: FaImages, title: 'Images', alt: 'Images', path: '/images', id: 1, className: 'images-bg-fade' },
    { Icon: BiVideo, title: 'Videos', alt: 'Videos', path: '/videos', id: 2, className: 'videos-bg-fade' },
    { Icon: BsNewspaper, title: 'News', alt: 'News', path: '/news', id: 3, className: 'news-bg-fade' },
    { Icon: BsMap, title: 'Maps', alt: 'Maps', path: '/maps', id: 4, className: 'maps-bg-fade' },
];
