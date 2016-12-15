import React from 'react';
import { mount } from 'enzyme';
import Connector from '../Connector';
import { getMockedProvider } from '../../../helepers/mockReduxEnv';

let wrapper;

beforeEach(() => {
  const MockedProvider = getMockedProvider();

  wrapper = mount(<MockedProvider><Connector /></MockedProvider>);
});

test('renders in DOM', () => {
  expect(wrapper).toHaveLength(1);
});

test('renders ScrollController', () => {
  expect(wrapper.find('ScrollController')).toHaveLength(1);
});

test('passes props to ScrollController', () => {
  const {
    scrollTarget,
    shouldScrollTop,
    shouldScrollBottom,
    setScrollTarget,
    startAutoScrollTop,
    startAutoScrollBottom,
    stopAutoScroll,
    scrollStateIdentifier,
  }= wrapper.find('ScrollController').props();

  expect(scrollTarget).toBeUndefined();
  expect(shouldScrollTop).toBe(false);
  expect(shouldScrollBottom).toBe(false);
  expect(scrollStateIdentifier).toBe(0);
  expect(typeof setScrollTarget).toBe('function');
  expect(typeof startAutoScrollTop).toBe('function');
  expect(typeof startAutoScrollBottom).toBe('function');
  expect(typeof stopAutoScroll).toBe('function');
});