import { useLayoutEffect, useRef, useState } from 'react';
import {
    Network,
    BookOpen,
} from 'lucide-react';
import {
    Css,
    Javascript,
    _React,
    TailwindIcon,
    Python,
    DjangoIcon,
    NodejsIcon,
    Mysql,
    MariadbIcon,
    Postgresql,
    DockerIcon,
    GitIcon,
    PostmanIcon,
    Terminal

} from '@dev.icons/react'
import { FaHtml5 } from "react-icons/fa";
import classes from './SkillsSection.module.css';
import { refreshScrollTriggers, SplitWords, staggerIn, useScrollReveal } from '@/animations/Scrollreveal';

const skills = [
  { name: 'HTML', category: 'frontend', icon: FaHtml5, color: '#ed6820' },
  { name: 'CSS', category: 'frontend', icon: Css, color: '#62359d' },
  { name: 'Javascript', category: 'frontend', icon: Javascript, color: '#f1dd00' },
  { name: 'React.js', category: 'frontend', icon: _React, color: '#66daff' },
  { name: 'Tailwind CSS', category: 'frontend', icon: TailwindIcon, color: '#4d98c1' },

  { name: 'Python', category: 'backend', icon: Python, color: '#4f80bc' },
  { name: 'Django', category: 'backend', icon: DjangoIcon, color: '#155d38' },
  { name: 'Node.js', category: 'backend', icon: NodejsIcon, color: '#609737' },
  { name: 'MySQL', category: 'backend', icon: Mysql, color: '#b56f02' },
  { name: 'MariaDB', category: 'backend', icon: MariadbIcon, color: '#bc9a66' },
  {name: 'PostgreSQL', category: 'backend', icon: Postgresql, color: '#436795' },

  { name: 'Docker', category: 'tools', icon: DockerIcon, color: '#5198f3' },
  { name: 'Git/Github', category: 'tools', icon: GitIcon, color: '#cd482a' },
  { name: 'RESTful API', category: 'tools', icon: Network, color: '#62359d' },
  { name: 'Sphinx', category: 'tools', icon: BookOpen, color: '#436795' },
  { name: 'PostMan', category: 'tools', icon: PostmanIcon, color: '#ed6820' },
  { name: 'SHELL Scripting', category: 'tools', icon: Terminal, color: '#62359d' }
];

const filters = [
  { key: 'all', label: 'All Skills' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Tools' }
];

export const SkillsSection = () => {
  const [active, setActive] = useState('all');

  const visible = active === 'all' ? skills : skills.filter(skill => skill.category === active);

  const ref = useRef(null);
  const gridRef = useRef(null);
  const prevActive = useRef(active);
  useScrollReveal(ref);

  // re-stagger the cards whenever a filter button is clicked
  useLayoutEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    staggerIn(gridRef.current?.children);
    refreshScrollTriggers(); // page height changed, so the footer trigger needs re-measuring
  }, [active]);

  return (
    <section ref={ref} className={classes.skillsSection} id='skills'>
      <SplitWords text="My Tech Stack" className={classes.heading} />
      <p className={classes.subheading} data-reveal="up">Tools I use to turn a concept into a real world live link</p>

      <div className={classes.filters} data-reveal="up">
        {filters.map(filter => (
          <button
            key={filter.key}
            type="button"
            className={`${classes.filterButton} ${active === filter.key ? classes.filterActive : ''}`}
            onClick={() => setActive(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={classes.grid} ref={gridRef}>
        {visible.map(skill => {
          const Icon = skill.icon;
          return (
            <div key={skill.name} className={classes.card} data-reveal-item style={{background: `linear-gradient(180deg, ${skill.color}1A , rgba(10, 7, 16, 0.9))`}}>
              <div className={classes.iconWrap} style={{"background": skill.color + 26}}>
                <Icon size={26} strokeWidth={1.6} color={skill.color} />
              </div>
              <span className={classes.name}>{skill.name}</span>
              <span className={classes.category} style={{"color": skill.color}}>{skill.category}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};