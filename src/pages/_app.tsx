import { type AppType } from 'next/app';
import { type AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import { DefaultSeo } from 'next-seo';

import { SearchFilterProvider } from '@contexts/SearchFilterProvider';
import ThemeLayout from '@components/ThemeLayout/index.tsx';
import { SeoConfig } from '@root/next-seo.config.ts';
import { api } from '@utils/api';

import '@styles/globals.css';

const spaceGt = Space_Grotesk({ subsets: ['latin'] })

const MyApp: AppType = ({
	Component,
	pageProps: { ...pageProps },
}: AppProps) => {

	return (
		<SearchFilterProvider>
			<ThemeLayout>
				<DefaultSeo {...SeoConfig} />
				<main className={spaceGt.className}>
					<Component {...pageProps} />
				</main>
			</ThemeLayout>
		</SearchFilterProvider>
	)
};

export default api.withTRPC(MyApp);
