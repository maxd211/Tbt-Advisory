import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'TBT Advisory | Global Strategy',
    description: 'Commercial advisory & execution.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <Script
                    id="Cookiebot"
                    src="https://consent.cookiebot.com/uc.js"
                    data-cbid="49067d3a-76f2-4edf-8fe9-dfacf982f191"
                    data-blockingmode="auto"
                    strategy="beforeInteractive"
                />
            </head>
            <body className={inter.variable}>
                {children}
            </body>
        </html>
    );
}
