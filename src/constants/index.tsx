import { useState } from 'react';
import { AiOutlinePlayCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsImages, BsNewspaper, BsThreeDotsVertical } from 'react-icons/bs';
import { TbMapSearch } from 'react-icons/tb';

import { type IconType } from 'react-icons';

interface NavLink {
    label: string;
    href: string;
}

export interface HeaderOptionLink {
    Icon: IconType;
    title: string;
    selected?: boolean;
    href?: string;
}

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
