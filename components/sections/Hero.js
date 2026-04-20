'use client';

import { SparklesCore } from '../ui/SparklesCore';

export default function Hero() {
    return (
        <section id="home" className="hero-section">
            {/* Full-field particle background */}
            <div className="hero-sparkles-bg">
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.2}
                    particleDensity={80}
                    particleColor="#ffffff"
                    speed={1.2}
                />
            </div>

            <div className="hero-inner">
                <p className="hero-eyebrow">TBT Advisory</p>
                <h1 className="hero-headline">
                    Commercial advisory<br />
                    <em>&amp; execution.</em>
                </h1>

                {/* Sparkle beam under the headline */}
                <div className="hero-sparkle-beam">
                    <div className="hero-beam-line hero-beam-line-1" />
                    <div className="hero-beam-line hero-beam-line-2" />
                    <div className="hero-beam-line hero-beam-line-3" />
                    <div className="hero-beam-line hero-beam-line-4" />
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        particleColor="#ffffff"
                        speed={2}
                        style={{ position: 'absolute', inset: 0 }}
                    />
                    <div className="hero-beam-mask" />
                </div>

                <p className="hero-sub">
                    Boutique advisory for high-growth companies and their investors,
                    from strategy to revenue at scale.
                </p>
            </div>
        </section>
    );
}
