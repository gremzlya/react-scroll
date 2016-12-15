jest.mock('react-scroll');

import * as adapter from '../scrollAdapter';
import * as reactScrollLib from 'react-scroll';

// reactScrollLib.scroller.scrollTo = jest.fn();

const containerId = 'test_container_id';
const elementId = 'test_element_id';

test('has scrollToBottom method', () => {
  expect(adapter.scrollToBottom).toBeDefined();
});

test('scrollToBottom calls animateScroll.scrollToBottom', () => {
  adapter.scrollToBottom(containerId);

  expect(reactScrollLib.animateScroll.scrollToBottom).toBeCalled();
  expect(reactScrollLib.animateScroll.scrollToBottom).toBeCalledWith({ containerId });
});

test('has scrollToTop method', () => {
  expect(adapter.scrollToTop).toBeDefined();
});

test('scrollToTop calls animateScroll.scrollToTop', () => {
  adapter.scrollToTop(containerId);

  expect(reactScrollLib.animateScroll.scrollToTop).toBeCalled();
  expect(reactScrollLib.animateScroll.scrollToTop).toBeCalledWith({ containerId });
});

test('has scrollToElement method', () => {
  expect(adapter.scrollToElement).toBeDefined();
});

test('scrollToTop calls animateScroll.scrollToTop', () => {
  adapter.scrollToElement(elementId, containerId);

  expect(reactScrollLib.scroller.scrollTo).toBeCalled();
  expect(reactScrollLib.scroller.scrollTo).toBeCalledWith(elementId, { smooth: true, containerId });
});

test('has scrollDownStep method', () => {
  expect(adapter.scrollDownStep).toBeDefined();
});

test('scrollDownStep return function that increases scrollTop by 2 points', () => {
  const node = {
    scrollTop: 0,
  };

  const result = adapter.scrollDownStep(node);

  result();

  expect(node.scrollTop).toBe(2);
});

test('has scrollUpStep method', () => {
  expect(adapter.scrollUpStep).toBeDefined();
});

test('scrollUpStep return function that decreases scrollTop by 2 points', () => {
  const node = {
    scrollTop: 2,
  };

  const result = adapter.scrollUpStep(node);

  result();

  expect(node.scrollTop).toBe(0);
});