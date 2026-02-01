import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const SELECTORS = {
  PANEL: '[data-gsap-scroll="section"]',
  PANEL_CONTAINER: '[data-gsap-scroll="container"]',
  PANEL_ITEM: '.page_item',
  PADDING_GLOBAL: '.padding-global',
};

// 0.5 = 2x faster, 2 = 2x slower
const SCROLL_SPEED_MULTIPLIER = 0.5;

const panelsContainer = document.querySelector(SELECTORS.PANEL_CONTAINER) as HTMLElement;
const paddingGlobal = document.querySelector(SELECTORS.PADDING_GLOBAL) as HTMLElement;
const panels = gsap.utils.toArray(SELECTORS.PANEL_ITEM);

const tween: gsap.core.Tween = gsap.to(panelsContainer, {
  x: () =>
    -(
      panelsContainer.scrollWidth -
      document.documentElement.clientWidth +
      panelsContainer.getBoundingClientRect().left +
      (paddingGlobal ? parseFloat(getComputedStyle(paddingGlobal).paddingRight) : 0)
    ),
  ease: 'none',
  scrollTrigger: {
    trigger: SELECTORS.PANEL,
    pin: true,
    start: 'top top',
    scrub: 1,
    snap: {
      snapTo: 1 / (panels.length - 1),
      inertia: false,
      duration: { min: 0.1, max: 0.1 },
    },
    end: () => '+=' + (panels.length - 1) * window.innerHeight * SCROLL_SPEED_MULTIPLIER,
    invalidateOnRefresh: true,
  },
});

function sectionPagesGSAP() {
  tween.scrollTrigger?.refresh();
}

window.Webflow ||= [];
window.Webflow.push(() => {
  sectionPagesGSAP();
});
