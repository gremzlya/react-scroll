import {
  scroller,
  animateScroll,
} from 'react-scroll';


export const scrollToBottom = containerId => animateScroll.scrollToBottom({ containerId });

export const scrollToTop = containerId => animateScroll.scrollToTop({ containerId });

export const scrollToElement = (elementId, containerId) => scroller.scrollTo(elementId, { smooth: true, containerId });
 
export const scrollDownStep = (node) => () => { node.scrollTop = node.scrollTop + 2 };

export const scrollUpStep = (node) => () => { node.scrollTop = node.scrollTop - 2 };
