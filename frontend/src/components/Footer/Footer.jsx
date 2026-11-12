import { Mail } from 'lucide-react';
import classes from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { navigateTo } from '@/assets/navigate';
import { useRef } from 'react';
import { useScrollReveal } from '@/animations/Scrollreveal';

const socialLinks = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/Jose-Vilanculo' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jose-vilanculo-22aa2b337' },
  { icon: Mail, label: 'Email', href: 'mailto:jozivilanculo@gmail.com' }
];

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Tech Stack', href: '#skills' }
];

export const FooterSection = () => {
  const year = new Date().getFullYear();

  const ref = useRef(null);
  useScrollReveal(ref, { start: 'clamp(top 98%)' });

  return (
    <footer ref={ref} className={classes.footer}>
      <div className={classes.inner}>
        <div className={classes.topRow}>
          <div className={classes.brand} data-reveal-item>
            <span className={classes.brandName}>José Vilanculo</span>
            <p className={classes.brandTagline}>Full-Stack Developer, based in Cape Town.</p>
          </div>

          <nav className={classes.quickLinks} data-reveal-item aria-label="Quick links">
            {quickLinks.map(link => (
              <a key={link.label} href={link.href} className={classes.quickLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={classes.socials} data-reveal-item>
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                onClick={() => navigateTo(href)}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={classes.socialIcon}
              >
                <Icon size={18} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div className={classes.divider} data-reveal="divider" />

        <div className={classes.bottomRow} data-reveal="up">
          <p className={classes.copyright}>© {year} José Vilanculo. All rights reserved.</p>
          <p className={classes.builtWith}>Built with React &amp; a lot of coffee.</p>
        </div>
      </div>
    </footer>
  );
};