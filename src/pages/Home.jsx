import { Hero } from "../components/Hero/Hero";
import { Navbar } from "../components/Navbar";
import { Content } from "../components/Content/Content.jsx";
import {VscHome, VscArchive, VscAccount, VscSettingsGear} from 'react-icons/vsc';
import Dock from "@/components/Hero/Dock";
import Scanner from "@/components/Hero/Scanner";
import { FooterSection } from "@/components/Footer/Footer";
import { ContactSection } from "@/components/Content/Sections/Contact/Contact";
import { navigateTo } from "@/assets/navigate";

export const Home = () => {

        const items = [
        { icon: <VscHome size={18} color='white' />, label: 'Home', onClick: () => navigateTo('hero') },
        { icon: <VscArchive size={18} color='white' />, label: 'Projects', onClick: () => navigateTo('projects') },
        { icon: <VscAccount size={18} color='white' />, label: 'Experience', onClick: () => navigateTo('experience') },
        { icon: <VscSettingsGear size={18} color='white' />, label: 'Tech Stack', onClick: () => navigateTo('skills') },
    ];

    return (
        <>
        < Navbar />
        
        <div>
            <Scanner
            color1="#5227FF"
            color2="#FF9FFC"
            color3="#FFFFFF"
            speed={0.5}
            sweepSpeed={0.25}
            sweepWidth={1.6}
            sweepFalloff={6}
            scale={1.5}
            frequency={2}
            ripple={0.22}
            bandDensity={11}
            lineSharpness={5.5}
            glow={0.22}
            scanDirection="vertical"
            colorSpread={0.7}
            brightness={1}
            contrast={1.15}
            softness={1.4}
            vignette={0.45}
            scanline
            grain
            grainIntensity={0.05}
            opacity={1}
            mouseInteraction
            mouseRadius={0.5}
            mouseStrength={0.5}
        />
            <Hero />
            <Content />
            <ContactSection />
            
        </div>
        
        <Dock
            items={items}
            panelHeight={65}
            baseItemSize={45}
            magnification={70}
        />

        <FooterSection />
        
        </>
        
    )
}