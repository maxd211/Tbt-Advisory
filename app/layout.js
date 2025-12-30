import Script from 'next/script';
import './globals.css';

export const metadata = {
    title: 'TBT Consulting | Global Strategy',
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
            <body>
                <div className="bg-glow"></div>
                {children}
            </body>
        </html>
    );
}
