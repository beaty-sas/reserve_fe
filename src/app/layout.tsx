'use client';

/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// ----------------------------------------------------------------------
import ThemeProvider from 'src/theme';
import {primaryFont} from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import {MotionLazy} from 'src/components/animate/motion-lazy';
import {SettingsProvider} from 'src/components/settings';
import {SnackbarProvider} from 'src/components/snackbar';
import {Container} from '@mui/material';
import {SharedStateProvider} from 'src/hooks/state';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const viewport = {
	themeColor: '#000000',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
};

const metadata = {
	title: 'Resever expert',
	description: 'Reserve expert is a platform for booking appointments with experts in various fields.',
	keywords: 'reser,резервація,забукати,салон,салон краси,нігті,майстер',
	manifest: '/manifest.json',
	icons: [
		{rel: 'icon', url: '/favicon/favicon.ico'},
		{rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png'},
		{rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png'},
		{rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png'},
	],
};

type Props = {
	children: React.ReactNode;
};

export default function RootLayout({children}: Props) {
	return (
		<html lang="en" className={primaryFont.className}>
		<body>
		<SettingsProvider
			defaultSettings={{
				themeMode: 'light', // 'light' | 'dark'
				themeDirection: 'ltr', //  'rtl' | 'ltr'
				themeContrast: 'default', // 'default' | 'bold'
				themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
				themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
				themeStretch: false,
			}}
		>
			<ThemeProvider>
				<SnackbarProvider>
					<MotionLazy>
						<SharedStateProvider>
							<ProgressBar/>
							<Container maxWidth={'xl'}>
								{children}
							</Container>
						</SharedStateProvider>
					</MotionLazy>
				</SnackbarProvider>
			</ThemeProvider>
		</SettingsProvider>
		<Script
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
          (function(c,l,a,r,i,t,y){
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "nmt7tazu4b");
          `
			}}
		/>
		<Script
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-8JJGDQVY60');
          `
			}}
		/>
		<Script
			strategy="afterInteractive"
			src={`https://www.googletagmanager.com/gtag/js?id=G-8JJGDQVY60`}
		/>
		</body>
		</html>
	);
}
