import classes from './Hero.module.css'
import TechText from './TechText';
import TextType from './TextType';
import { CodePortfolio } from './CodePortfolio';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { navigateTo } from '@/assets/navigate';


const socialLinks = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Jose-Vilanculo' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jose-vilanculo-22aa2b337' },
  { icon: Mail, label: 'Email', href: 'mailto:jozivilanculo@gmail.com' },
  {icon: FaWhatsapp, label: 'Whatsapp', href: 'https://wa.me/+27677712850'}
];


export const Hero = () => {
    
const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

    return (
        <>
            <section className={classes.heroSection} id='hero'>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>

                        <h1 className={classes.heading}>Hi, I am</h1>
                        
                        <TechText
                            text="José Vilanculo"
                            fontWeight={600}
                            fontSize="clamp(3.5rem, 5vw, 5rem)"
                            fontFamily={"'Clash Display', sans-serif"}
                            reveal="letter"
                            dashLength={4}
                            dashGap={2}
                            specks={15}
                            color="#ffffff"
                            accentColor="#ffffff"
                            letterSpacing={-0.05}
                            reach={200}
                            softness={0.7}
                            strokeWidth={1.5}
                            speed={1}
                            lineStyle="dashed"
                            selection
                            labels
                            draggable
                            sweep
                        />

                        <TextType 
                            text={["Full Stack Developer", "Web Developer"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor
                            cursorCharacter="_"
                            deletingSpeed={50}
                            variableSpeedEnabled={false}
                            variableSpeedMin={60}
                            variableSpeedMax={120}
                            cursorBlinkDuration={0.5}
                        />

                        <div className={classes.links}>
                            <button className={classes.myWork} onClick={() => navigateTo('projects')}>
                                View My Work
                            </button>
                            <button className={classes.resume} onClick={() => downloadFile('/JoseVilanculoCV2026.pdf', 'Jose-Vilanculo-CV.pdf')}>
                                Download CV
                            </button>
                        </div>

                        <div className={classes.socials}>
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className={classes.socialIcon}
                                >
                                <Icon size={20} strokeWidth={1.75} color={"rgba(255, 255, 255, 0.7)"}/>
                                </a>
                            ))}
                        </div>
                    </div>

                    <CodePortfolio />
                </div>

                
                
            </section>
        </>
    )
}

