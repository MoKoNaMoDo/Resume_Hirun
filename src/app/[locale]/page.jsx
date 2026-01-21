import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <About />
            <Portfolio />
            <Contact />
        </main>
    );
}
