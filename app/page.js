import Hero from "./components/Hero3d";
import Work from "./components/Work";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/ContactSection";


export default function Home() {
    return (
        <main>
            <Hero/>
            <Work />
            <Services />
            <About />
            <Contact />
        </main>
    );
}
