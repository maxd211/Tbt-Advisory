import './globals.css';

export const metadata = {
    title: 'TBT Consulting | Global Strategy',
    description: 'Commercial advisory & execution.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="bg-glow"></div>
                {children}
            </body>
        </html>
    );
}
