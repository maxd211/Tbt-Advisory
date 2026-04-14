import Header from '../components/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Edge from '../components/sections/Edge';
import Services from '../components/sections/Services';
import Imprint from '../components/sections/Imprint';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <Edge />
                <Services />
                <Imprint />
            </main>
        </>
    );
}
