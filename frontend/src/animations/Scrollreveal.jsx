import { Fragment, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';
const CLEAR = 'opacity,transform,filter';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*
  Several of your components have `transition: all` / `transition: transform` in
  their CSS. That would smear GSAP's per-frame updates, so we switch CSS
  transitions off while an element animates and hand them back afterwards.
*/
const lock = els => els.forEach(el => el && (el.style.transition = 'none'));
const unlock = els => els.forEach(el => el && (el.style.transition = ''));

/* ------------------------------------------------------------------ */
/*  <SplitWords>  — renders each word in its own span so GSAP can      */
/*  animate them. Done in React (not by mutating the DOM) so re-renders */
/*  and StrictMode stay safe.                                           */
/* ------------------------------------------------------------------ */
export const SplitWords = ({ text, as: Tag = 'h1', className, ...rest }) => (
  <Tag className={className} data-split="" aria-label={text} {...rest}>
    {text.split(' ').map((word, i, all) => (
      <Fragment key={i}>
        <span data-word="" aria-hidden="true" style={{ display: 'inline-block' }}>
          {word}
        </span>
        {i < all.length - 1 ? ' ' : ''}
      </Fragment>
    ))}
  </Tag>
);

/* ------------------------------------------------------------------ */
/*  Re-usable stagger for content that changes after mount             */
/*  (e.g. the Skills filter buttons).                                   */
/* ------------------------------------------------------------------ */
export const staggerIn = els => {
  const list = gsap.utils.toArray(els);
  if (!list.length || prefersReducedMotion()) return;

  lock(list);
  gsap.fromTo(
    list,
    { opacity: 0, y: 24, scale: 0.94, filter: 'blur(6px)' },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: EASE,
      stagger: 0.05,
      overwrite: true,
      onComplete: () => {
        unlock(list);
        gsap.set(list, { clearProps: CLEAR });
      }
    }
  );
};

/* Call after the page height changes (filtering, accordions, etc.) */
export const refreshScrollTriggers = () =>
  requestAnimationFrame(() => ScrollTrigger.refresh());

/* ------------------------------------------------------------------ */
/*  useScrollReveal(sectionRef, options)                                */
/*                                                                      */
/*  Mark things up with data attributes inside the section:             */
/*    <SplitWords text="..."/>      word-by-word heading                */
/*    data-reveal="up"              fade + rise + unblur (default)      */
/*    data-reveal="left" | "right"  slide in from a side                */
/*    data-reveal="pop"             scale-in (icons)                    */
/*    data-reveal="image"           clip-path wipe + settle zoom        */
/*    data-reveal="line"            scroll-scrubbed vertical line draw  */
/*    data-reveal="divider"         horizontal line draws in            */
/*    data-reveal-child             staggered inside a data-reveal el   */
/*    data-reveal-item              batched grid/row items (staggered)  */
/*                                                                      */
/*  options.itemSelector  override the selector used for batched items  */
/*  options.itemBlur      false for elements with their own CSS filter  */
/*  options.start         ScrollTrigger start (default 85% down screen) */
/* ------------------------------------------------------------------ */
export function useScrollReveal(
  scopeRef,
  { start = 'clamp(top 85%)', itemSelector = '[data-reveal-item]', itemBlur = true } = {}
) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReducedMotion()) return;

    const touched = new Set();
    const hold = els => {
      els.forEach(el => el && touched.add(el));
      lock(els);
    };
    const st = trigger => ({ trigger, start, once: true });
    const narrow = window.innerWidth < 760;

    const ctx = gsap.context(() => {
      /* 1 ── Headings: words sharpen in one after another ───────────── */
      gsap.utils.toArray('[data-split]', scope).forEach(heading => {
        if (heading.closest('[data-sequence]')) return;
        const words = heading.querySelectorAll('[data-word]');

        gsap.from(words, {
          opacity: 0.12,
          y: 16,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: EASE,
          stagger: 0.07,
          clearProps: CLEAR,
          scrollTrigger: st(heading)
        });

        // If the heading has an underline (About), let it fade in after the words.
        if (getComputedStyle(heading).borderBottomStyle !== 'none') {
          gsap.from(heading, {
            borderBottomColor: 'rgba(0,0,0,0)',
            duration: 0.9,
            delay: 0.35,
            ease: 'power2.out',
            scrollTrigger: st(heading)
          });
        }
      });

      /* 2 ── Individual elements ───────────────────────────────────── */
      const FROM = {
        up: { y: 36 },
        left: { x: -80 },
        right: { x: 80 },
        pop: { scale: 0.5, ease: 'back.out(1.8)' }
      };

      gsap.utils.toArray('[data-reveal]', scope).forEach(el => {
        let type = el.dataset.reveal || 'up';

        if (type === 'line') {
          // Drives a CSS variable so it works on a ::before pseudo-element.
          gsap.fromTo(
            el,
            { '--line': 0 },
            {
              '--line': 1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 }
            }
          );
          return;
        }

        if (type === 'divider') {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.2,
            ease: 'power3.inOut',
            clearProps: 'transform',
            scrollTrigger: st(el)
          });
          return;
        }

        if (type === 'image') {
          const img = el.querySelector('img');
          hold([img]);

          gsap.from(el, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.1,
            ease: 'power3.inOut',
            clearProps: 'clipPath',
            scrollTrigger: st(el)
          });

          if (img) {
            gsap.from(img, {
              scale: 1.3,
              duration: 1.5,
              ease: EASE,
              clearProps: 'transform',
              onComplete: () => unlock([img]),
              scrollTrigger: st(el)
            });
          }
          return;
        }

        // Sideways slides would cause horizontal overflow on phones.
        if (narrow && (type === 'left' || type === 'right')) type = 'up';

        const kids = el.querySelectorAll('[data-reveal-child]');
        hold([el]);

        const tl = gsap.timeline({
          scrollTrigger: st(el),
          onComplete: () => {
            unlock([el]);
            gsap.set(el, { clearProps: CLEAR });
          }
        });

        tl.from(el, {
          opacity: 0,
          filter: 'blur(10px)',
          duration: 1,
          ease: EASE,
          ...FROM[type]
        });

        if (kids.length) {
          tl.from(
            kids,
            { opacity: 0, y: 20, duration: 0.7, ease: EASE, stagger: 0.12, clearProps: 'opacity,transform' },
            '-=0.6'
          );
        }
      });

      /* 3 ── Grids / rows: batched so each row staggers together ───── */
      const items = gsap.utils.toArray(itemSelector, scope);
      if (items.length) {
        hold(items);

        const hidden = { opacity: 0, y: 50, scale: 0.97 };
        const shown = { opacity: 1, y: 0, scale: 1 };
        if (itemBlur) {
          hidden.filter = 'blur(10px)';
          shown.filter = 'blur(0px)';
        }

        gsap.set(items, hidden);

        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: batch =>
            gsap.to(batch, {
              ...shown,
              duration: 0.9,
              ease: EASE,
              stagger: 0.12,
              overwrite: true,
              onComplete: () => {
                unlock(batch);
                gsap.set(batch, { clearProps: CLEAR });
              }
            })
        });
      }

      /* 4 ── Sequences: one timeline, steps enter in data-seq order ───── */
      const stacked = window.matchMedia('(max-width: 1100px)').matches;

      const SEQ_FROM = {
        up: { y: 36, ease: EASE, blur: true },
        drop: { y: -80, scale: 0.94, ease: 'power4.out', blur: false }
      };

      gsap.utils.toArray('[data-sequence]', scope).forEach(group => {
        const gap = Number(group.dataset.sequence) || 0.18;
        const steps = gsap.utils.toArray('[data-seq]', group);
        const seqTrigger = el => ({ trigger: el, start: 'clamp(top 65%)', once: true });
        const slot = el => (Number(el.dataset.seq) || 0) * gap;
        hold(steps);

        const addStep = (tl, el, at) => {
          const type = el.dataset.seqType || 'up';
          const { blur, ...base } = SEQ_FROM[type] || SEQ_FROM.up;
          const y = el.dataset.seqY !== undefined ? Number(el.dataset.seqY) : base.y;

          if (el.hasAttribute('data-split')) {
            tl.from(
              el.querySelectorAll('[data-word]'),
              {
                opacity: 0.12,
                y: 16,
                filter: 'blur(8px)',
                duration: 0.8,
                ease: EASE,
                stagger: 0.07,
                clearProps: CLEAR,
                onComplete: () => unlock([el])
              },
              at
            );
            return;
          }

          tl.from(
            el,
            {
              opacity: 0,
              ...(blur && { filter: 'blur(10px)' }),
              ...base,
              y,
              // non-split steps
              duration: type === 'drop' ? 0.9 : 0.7,
              force3D: true,
              willChange: 'transform, opacity',
              onComplete: () => {
                unlock([el]);
                gsap.set(el, { clearProps: `${CLEAR},willChange` });
              }
            },
            at
          );
        };

        if (stacked) {
          steps.forEach(el => addStep(gsap.timeline({ scrollTrigger: seqTrigger(el) }), el, 0));
        } else {
          const tl = gsap.timeline({ scrollTrigger: seqTrigger(group) });
          steps.forEach(el => addStep(tl, el, slot(el)));
        }
      });
    }, scope);

      

    

    // Images/fonts loading can shift layout; re-measure once everything is in.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
      unlock([...touched]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}