import dynamic from "next/dynamic";
const Hero = dynamic(() => import("./components/Hero3d"), {
  ssr: false,
});

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
