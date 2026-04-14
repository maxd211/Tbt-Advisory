'use client';

import { useState } from 'react';
import Header from '../components/Header';
import GetInTouchModal from '../components/GetInTouchModal';
import Hero from '../components/sections/Hero';
import TrackRecord from '../components/sections/TrackRecord';
import AboutFirm from '../components/sections/AboutFirm';
import Services from '../components/sections/Services';
import Footer from '../components/sections/Footer';

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Header onGetInTouch={() => setModalOpen(true)} />
            {modalOpen && <GetInTouchModal onClose={() => setModalOpen(false)} />}
            <main>
                <Hero />
                <TrackRecord />
                <AboutFirm />
                <Services />
            </main>
            <Footer />
        </>
    );
}
