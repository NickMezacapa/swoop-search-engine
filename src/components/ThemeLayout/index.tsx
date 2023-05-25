import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import clsx from 'clsx';

interface LayoutProps {
	children: React.ReactNode;
	classNames?: string;
}

const ThemeLayout = ({ children, classNames }: LayoutProps) => (
	<>
		<Head>
			<title>Swoop Search</title>
			<meta
				name="description"
				content="A non-intrusive, secure, and completely private way to browse the web."
			/>
			<link rel="icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#905bd5" />
			<meta name="msapplication-TileColor" content="#1d1d1f" />
			<meta name="theme-color" content="#000000" />
		</Head>
		<ThemeProvider enableSystem={true} attribute="class">
			<main
				className={clsx(
					`h-auto min-h-screen w-screen max-w-full bg-[#121212] text-[#eee] transition ease ${
						classNames || ''
					} MainApp`,
				)}>
				{children}
			</main>
		</ThemeProvider>
	</>
);

export default ThemeLayout;
