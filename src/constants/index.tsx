interface NavLink {
    label: string;
    href: string;
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
