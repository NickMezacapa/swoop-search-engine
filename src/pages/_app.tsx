import { type AppType } from 'next/app';
import { type AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { SearchFilterProvider } from '@contexts/SearchFilterProvider';
import ThemeLayout from '@components/ThemeLayout/index.tsx';
import { SeoConfig } from '@root/next-seo.config.ts';
import { api } from '@utils/api';

import '@styles/globals.css';

const MyApp: AppType = ({
	Component,
	pageProps: { ...pageProps },
}: AppProps) => (
	<SearchFilterProvider>
		<ThemeLayout>
			<DefaultSeo {...SeoConfig} />
			<Component {...pageProps} />
		</ThemeLayout>
	</SearchFilterProvider>
);

export default api.withTRPC(MyApp);
