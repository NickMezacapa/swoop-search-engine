import { AiOutlinePlayCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsImages, BsNewspaper } from 'react-icons/bs';
import { TbMapSearch } from 'react-icons/tb';

import { type NavLink, HeaderOptionLink } from '@utils/types';

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
