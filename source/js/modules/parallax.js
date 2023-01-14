import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/scroll-trigger';

gsap.registerPlugin(ScrollTrigger);
const parallaxBlock = document.querySelector('[data-parallax]');

function addParallax() {
  if (parallaxBlock) {
    const parallaxBackgroung = parallaxBlock.querySelector('img');
    const parallaxText = parallaxBlock.querySelector('[data-parallax-text]');
    const stylesParallaxText = window.getComputedStyle(parallaxText);
    let colorText = stylesParallaxText.color;


    gsap.to(parallaxText, {
      scrollTrigger: {
        scrub: 1,
      },
      scale: 0.8,
      top: '70%',
      color: (colorText === 'rgb(255, 255, 255)') ? 'rgb(177, 48, 7)' : 'rgb(255, 255, 255)',
    });

    gsap.to(parallaxBackgroung, {
      scrollTrigger: {
        scrub: 1,
      },
      scale: 2,
    });

    const imgTimeline = gsap.timeline({paused: true});
    imgTimeline.to(parallaxBackgroung, {scale: 2});

    ScrollTrigger.create({
      trigger: parallaxBlock,
      scroller: '[data-scroll-container]',
      animation: imgTimeline,
      start: 'top top',
      scrub: 1,
    });

    const textTimeline = gsap.timeline({paused: true});
    textTimeline.to(parallaxText, {scale: 0.8, top: '70%', color: 'rgb(177, 48, 7)'});

    ScrollTrigger.create({
      trigger: parallaxBlock,
      scroller: '[data-scroll-container]',
      animation: textTimeline,
      start: 'top top',
      scrub: 1,
    });
    return;
  } else {
    return;
  }
}

export {addParallax};
