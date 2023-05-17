import { type DefaultSeoProps } from 'next-seo';

export const SeoConfig: DefaultSeoProps = {
    title: 'Swoop - Private Search Engine',
    description:
        'Swoop Search is a non-intrusive, secure, and completely private way to browse the web.',
    openGraph: {
        title: 'Swoop - Private Search Engine',
        type: 'website',
        locale: 'en_IE',
        url: '',
        siteName: 'Swoop Private Search Engine',
        profile: {
            firstName: 'Nick',
            lastName: 'Mezacapa',
        },
        description:
            'Swoop Search is a non-intrusive, secure, and completely private way to browse the web.',
    },
    twitter: {
        handle: '@nickmez_',
        site: '@nickmez_',
        cardType: 'summary_large_image',
    },
};
