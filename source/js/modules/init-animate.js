import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/scroll-trigger';

const initAnimate = () => {
  gsap.registerPlugin(ScrollTrigger);

  const vpTouch = window.matchMedia('(pointer: coarse)');

  ScrollTrigger.batch('[data-animate="fade"]', {
    onEnter: (batch) => window.gsap.to(batch, {
      autoAlpha: 1, duration: 0.45, stagger: 0.1,
    }),
    start: (self) => `${self.trigger.offsetHeight / 4} bottom`,
    scrub: vpTouch.matches ? 1 : true,
  });

  ScrollTrigger.batch('[data-animate="fade-menu"]', {
    scroller: '[data-scroll-container]',
    onEnter: (batch) => window.gsap.to(batch, {
      autoAlpha: 1, duration: 0.45, stagger: 0.1,
    }),
    start: (self) => `${self.trigger.offsetHeight / 4} bottom`,
    scrub: vpTouch.matches ? 1 : true,
  });
};

export {initAnimate};
