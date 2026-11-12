import { useRef } from 'react';
import classes from './Projects.module.css';
import { Code2 } from 'lucide-react';
import { SplitWords, useScrollReveal } from '@/animations/Scrollreveal';


export const ProjectsSection = () => {

    const ref = useRef(null);
    useScrollReveal(ref, { itemBlur: false });

    const projects = [

        {
            id: 1,
            title: 'Swift Basket',
            description: 'Re-engineered, Full-stack multi-vendor e-commerce website which allows buyers and vendors to trade.',
            image: '/projects/swift-basket-blue.png',
            tags: ['Python', 'Django', 'JavaScript', 'React', 'RESTful API'],
            demoUrl: 'https://swift-basket-blush.vercel.app/',
            githubUrl: 'https://github.com/Jose-Vilanculo/Swift_Basket'
        },
        {
            id: 2,
            title: 'React Beach House',
            description: 'A responsive React website for booking a beach house stay.',
            image: '/projects/beach-house.png',
            tags: ['Javascript', 'React', 'Radix-UI'],
            demoUrl: 'https://react-beach-house.vercel.app/',
            githubUrl: 'https://github.com/Jose-Vilanculo/React-Beach-House.git'
        },
        {
            id: 3,
            title: 'Django News Application',
            description: 'A Django-based news platform for independent journalism and curated publications.',
            image: '/projects/news_application.jpg',
            tags: ['Python', 'Django', 'Docker', 'Sphinx'],
            demoUrl: 'https://djangonewsapplication-production.up.railway.app/',
            githubUrl: 'https://github.com/Jose-Vilanculo/Django_News_Application'
        },
        {
            id: 4,
            title: 'React Portfolio',
            description: 'A React portfolio where I display myself as a developer and show off some of my projects',
            image: '/projects/portfolio-laptop-mockup-2.png',
            tags: ['Javascript', 'React', 'Tailwind'],
            demoUrl: 'https://my-new-portfolio-nu-khaki.vercel.app/',
            githubUrl: 'https://github.com/Jose-Vilanculo/My-New-Portfolio'
        },
        {
            id: 5,
            title: 'Django E-Commerce Application',
            description: 'A multi-vendor Django e-commerce website which allows buyers and vendors to trade.',
            image: '/projects/ecommerce_store.png',
            tags: ['Python', 'Django', 'RESTful API'],
            demoUrl: 'https://josevilanculo.pythonanywhere.com/',
            githubUrl: 'https://github.com/Jose-Vilanculo/Django-eCommerce-Application'
        }
    ];


    return (
        <section ref={ref} className={classes.projectSection} id='projects'>

            <SplitWords text='My Projects' />

             <div className={classes.grid}>
                {projects.map(project => (
                <div key={project.id} className={classes.cardWrapper} data-reveal-item>
                    <article className={classes.card}>
                        <span className={classes.corner} data-pos="tr" aria-hidden="true" />
                        <span className={classes.corner} data-pos="bl" aria-hidden="true" />
                        <span className={classes.corner} data-pos="br" aria-hidden="true" />

                        <h2 className={classes.title}>{project.title}</h2>
                        <p className={classes.description}>{project.description}</p>
                        <p className={classes.tags}>{project.tags.join(', ')}</p>

                        <div className={classes.imageWrap} data-reveal="image">
                        <img src={project.image} alt={project.title} loading="lazy" />
                        </div>

                        <div className={classes.footer}>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={classes.codeLink}>
                            Code <Code2 size={15} strokeWidth={2} />
                        </a>
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className={classes.demoButton}>
                            Demo
                        </a>
                        </div>
                    </article>
                </div>
                ))}
            </div>
            

        </section>
    )
}