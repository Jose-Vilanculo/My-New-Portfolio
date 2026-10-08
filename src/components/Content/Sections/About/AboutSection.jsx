import { useRef } from 'react';
import classes from './AboutSection.module.css';
import MagicBento from './MagicBento';
import { useScrollReveal } from '@/animations/Scrollreveal';


export const AboutSection = () => {

    const ref = useRef(null);
    useScrollReveal(ref, { itemSelector: '.magic-bento-card' });

    return (
        <>
        <section ref={ref} className={classes.aboutSection} id='about'>

            <h1>About Me</h1>

            <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
            />

        </section>
        </>
    );
};