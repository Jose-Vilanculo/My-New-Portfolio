import { Code2, RefreshCw, LayoutTemplate, GraduationCap, Award, Database, FolderGit2 } from 'lucide-react';
import classes from './Experience.module.css';
import { useRef } from 'react';
import { SplitWords, useScrollReveal } from '@/animations/Scrollreveal';

const experience = [
  {
    id: 1,
    icon: Code2,
    title: 'Independent Software Development',
    company: 'Self-Directed',
    dateRange: '09/2025 - Present',
    link: { label: 'View some of my work', url: 'https://github.com/Jose-Vilanculo' },
    bullets: [
      {
        icon: RefreshCw,
        label: 'Self-Taught',
        text: 'Continued developing software independently after the bootcamp, self-teaching JavaScript, React, Vite, and modern frontend development through practical application.'
      },
      {
        icon: Database,
        label: 'Re-Architecture',
        text: 'Re-engineered a Django e-commerce application into a full-stack architecture using Django REST Framework, React, and Vite with REST APIs and a modern responsive frontend.'
      },
      {
        icon: LayoutTemplate,
        label: 'React Apps',
        text: 'Developed and deployed independent React applications using reusable components, React Router, UI libraries, responsive layouts, and interactive forms.'
      }
    ]
  },
  {
    id: 2,
    icon: GraduationCap,
    title: 'Software Engineering Bootcamp',
    company: 'HyperionDev',
    dateRange: '02/2025 - 08/2025',
    link: { label: 'View bootcamp portfolio', url: 'https://www.hyperiondev.com/portfolio/JV24120017406/' },
    bullets: [
      {
        icon: Award,
        label: 'Top Performer',
        text: 'Completed an intensive 6-month bootcamp focused on Python, Django, SQL, REST APIs, and software engineering principles — achieving a 98% overall average.'
      },
      {
        icon: Database,
        label: 'Tech Stack',
        text: 'Gained hands-on experience with Django, REST APIs, Docker, SQL/SQLite, MongoDB, Git, and modern software development workflows.'
      },
      {
        icon: FolderGit2,
        label: 'Projects',
        text: 'Completed five practical software development projects, including a Django e-commerce application and a Django news platform.'
      }
    ]
  }
];

export const ExperienceSection = () => {

  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} className={classes.experienceSection} id='experience'>
      <SplitWords text="Experience" />

      <div className={classes.timeline} data-reveal="line">
        {experience.map((item, index) => {
          const Icon = item.icon;
          const align = index % 2 === 0 ? 'left' : 'right';

          return (
            <div key={item.id} className={`${classes.item} ${classes[align]}`} data-reveal={align}>
              <div className={classes.iconCircle} data-reveal="pop">
                <Icon size={22} strokeWidth={1.75} />
              </div>

              <div className={classes.card}>
                <div className={classes.cardHeader}>
                  <h2 className={classes.title}>{item.title}</h2>
                  <span className={classes.date}>{item.dateRange}</span>
                </div>
                <p className={classes.company}>{item.company}</p>

                <ul className={classes.bulletList}>
                  {item.bullets.map((bullet, i) => {
                    const BulletIcon = bullet.icon;
                    return (
                      <li key={i} className={classes.bullet} data-reveal-child>
                        <span className={classes.bulletIcon}>
                          <BulletIcon size={16} strokeWidth={1.75} />
                        </span>
                        <span className={classes.bulletText}>
                          <strong>{bullet.label}:</strong> {bullet.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {item.link && (
                  <a href={item.link.url} target="_blank" rel="noreferrer" className={classes.link} data-reveal-child>
                    {item.link.label} →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};