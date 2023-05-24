/* eslint-disable import/extensions */
import { type AppType } from 'next/app';
import { type AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import ThemeLayout from '@components/ThemeLayout/index.tsx';
import { SeoConfig } from '@root/next-seo.config.ts';
import { api } from '@utils/api';

import '@styles/globals.css';

const MyApp: AppType = ({
	Component,
	pageProps: { ...pageProps },
}: AppProps) => (
		<ThemeLayout>
			<DefaultSeo {...SeoConfig} />
			<Component {...pageProps} />
		</ThemeLayout>
);

export default api.withTRPC(MyApp);
