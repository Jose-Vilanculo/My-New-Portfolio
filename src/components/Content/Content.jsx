import classes from './Content.module.css'
import CursorGrid from './CursorGrid/CursorGrid'
import { AboutSection } from './Sections/About/AboutSection'
import { ExperienceSection } from './Sections/Experience/Experience'
import { ProjectsSection } from './Sections/Projects/Projects'
import { SkillsSection } from './Sections/Skills/SkillsSection'


export const Content = () => {
    return (
        <>
        <section className={classes.content}>

            <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 0 }}>
                <CursorGrid
                    cellSize={70}
                    color="#6d28d9"
                    radius={140}
                    falloff="smooth"
                    holdTime={400}
                    fadeDuration={800}
                    lineWidth={1.2}
                    maxOpacity={0.4}
                    fillOpacity={0}
                    gridOpacity={0}
                    cellRadius={0}
                    clickPulse
                    pulseSpeed={600}
                />

            </div>

            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <SkillsSection />
            
        </section>
        </>
    )
}