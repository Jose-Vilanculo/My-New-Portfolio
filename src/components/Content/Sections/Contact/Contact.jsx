import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import classes from './Contact.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SplitWords, useScrollReveal } from '@/animations/Scrollreveal';

const EMAILJS_SERVICE_ID = 'service_9iwqkso';
const EMAILJS_TEMPLATE_ID = 'template_nddd2qr';
const EMAILJS_PUBLIC_KEY = 'hR2WOZmEhaIinSISs';

const contactLinks = [
  { icon: Mail, label: 'jozivilanculo@gmail.com', href: 'mailto:jozivilanculo@gmail.com' },
  { icon: MapPin, label: 'Cape Town, South Africa', href: null },
  { icon: FaGithub, label: 'github.com/Jose-Vilanculo', href: 'https://github.com/Jose-Vilanculo' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jose-vilanculo-22aa2b337' }
];

export const ContactSection = () => {

  // Form Setup
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
        const timeNow = new Date().toLocaleString('en-ZA', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            time: timeNow,
            message: form.message
          },
          EMAILJS_PUBLIC_KEY
        );
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };


  // Animations
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className={classes.contactSection} id='contact'>
      <div className={classes.inner} data-sequence="0.1">
        <div className={classes.info}>
          <span className={classes.status} data-seq="0">
            <span className={classes.dot} />
            Available for freelance work
          </span>

          <SplitWords
            text="Let's build something"
            as="h1"
            className={classes.heading}
            data-seq="1"
          />
          <p className={classes.blurb} data-seq="3">
            Have a project in mind, an opportunity to discuss, or just want to say hi? My inbox is open.
          </p>

          <div className={classes.linkList}>
            {contactLinks.map(({ icon: Icon, label, href, i }) => {
              const Tag = href ? 'a' : 'div';
              return (
                <Tag
                  key={label}
                  {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
                  className={classes.linkRow}
                  data-seq={5 + i}
                  data-seq-y="-28"
                >
                  <span className={classes.linkIcon}>
                    <Icon size={18} />
                  </span>
                  {label}
                </Tag>
              );
            })}
          </div>
        </div>

        <form
          className={classes.form}
          onSubmit={handleSubmit}
          data-seq="6.5"
          data-seq-type="drop"
        >
          <div className={classes.field}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={classes.submitButton} disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <Loader2 size={16} className={classes.spin} /> Sending...
              </>
            ) : status === 'sent' ? (
              <>
                <CheckCircle2 size={16} /> Sent!
              </>
            ) : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>

          {status === 'error' && <p className={classes.errorText}>Something went wrong — please try again.</p>}
        </form>
      </div>
    </section>
  );
};