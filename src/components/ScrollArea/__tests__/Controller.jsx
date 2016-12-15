import React from 'react';
import { shallow } from 'enzyme';
import { getScrollController } from '../Controller'; 

const defaultProps = {
  scrollTarget: undefined,
  shouldScrollBottom: false,
  shouldScrollTop: false,
};

const scrollAdapterMock = {
  scrollToBottom: jest.fn(),
  scrollToTop: jest.fn(),
  scrollToElement: jest.fn(),
  scrollDownStep: jest.fn(),
  scrollUpStep: jest.fn(),
}

let wrapper;

beforeEach(() => {
  jest.useFakeTimers();

  scrollAdapterMock.scrollToBottom.mockClear();
  scrollAdapterMock.scrollToTop.mockClear();
  scrollAdapterMock.scrollToElement.mockClear();
  scrollAdapterMock.scrollDownStep.mockClear();
  scrollAdapterMock.scrollUpStep.mockClear();

  const ScrollAreaController = getScrollController(scrollAdapterMock)
  wrapper = shallow(<ScrollAreaController {...defaultProps}/>);
});

test('renders in DOM', () => {
  expect(wrapper).toHaveLength(1);
});

test('set elementId on creating instance', () => {
  expect(wrapper.instance().state.elementId).toBeDefined();
});

test('scrollHandler should call scrollToElement if target was specified', () => {
  const target = 'test_target';

  wrapper.instance().scrollHandler(defaultProps, target);
  const id = wrapper.instance().state.elementId;

  expect(scrollAdapterMock.scrollToElement).toBeCalled();
  expect(scrollAdapterMock.scrollToElement).toBeCalledWith(target, id);
  expect(scrollAdapterMock.scrollToTop).not.toBeCalled()
  expect(scrollAdapterMock.scrollToBottom).not.toBeCalled()
});

test(
  'scrollHandler should call scrollToBottom' +
  'if target was not specified' +
  'and shouldScrollBottom is true in props', 
  () => {
    const modifiedProps = {
      ...defaultProps,
      shouldScrollBottom: true,
    };

    wrapper.instance().scrollHandler(modifiedProps);
    const id = wrapper.instance().state.elementId;

    expect(scrollAdapterMock.scrollToBottom).toBeCalled();
    expect(scrollAdapterMock.scrollToBottom).toBeCalledWith(id);
    expect(scrollAdapterMock.scrollToTop).not.toBeCalled()
    expect(scrollAdapterMock.scrollToElement).not.toBeCalled()
  }
);

test(
  'scrollHandler should call scrollToTop' +
  'if target was not specified' +
  'and shouldScrollBottom is false in props' +
  'and shouldScrollTop is true in props', 
  () => {
    const modifiedProps = {
      ...defaultProps,
      shouldScrollTop: true,
    };

    wrapper.instance().scrollHandler(modifiedProps);
    const id = wrapper.instance().state.elementId;

    expect(scrollAdapterMock.scrollToTop).toBeCalled();
    expect(scrollAdapterMock.scrollToTop).toBeCalledWith(id);
    expect(scrollAdapterMock.scrollToBottom).not.toBeCalled()
    expect(scrollAdapterMock.scrollToElement).not.toBeCalled()
  }
);

test('calls scrollHandler on recieving new props', () => {
  wrapper.instance().scrollHandler = jest.fn();

  wrapper.setProps({
    newProp: 'test_prop',
  });

  expect(wrapper.instance().scrollHandler).toBeCalled();
});

test(
  'calls scrollHandler on recieving new props ' +
  'with new props and with undefined as a second argument ' +
  'if scrollTarget is not specified in new props',
  () => {
    wrapper.instance().scrollHandler = jest.fn();

    wrapper.setProps({
      shouldScrollBottom: true,
    });

    const newProps = {
      ...defaultProps,
      shouldScrollBottom: true,
    };

    expect(wrapper.instance().scrollHandler).toBeCalled();
    expect(wrapper.instance().scrollHandler).toBeCalledWith(newProps, false);
  }
);

test(
  'calls scrollHandler on recieving new props ' +
  'with new props and with scrollTarget as a second argument ' +
  'if scrollTarget is specified in new props and it differes from existing one',
  () => {
    wrapper.instance().scrollHandler = jest.fn();

    wrapper.setProps({
      shouldScrollBottom: true,
      scrollTarget: 'test_scroll_target',
    });

    const newProps = {
      ...defaultProps,
      shouldScrollBottom: true,
      scrollTarget: 'test_scroll_target',
    };

    expect(wrapper.instance().scrollHandler).toBeCalled();
    expect(wrapper.instance().scrollHandler).toBeCalledWith(newProps, 'test_scroll_target');
  }
);

test(
  'calls scrollHandler on recieving new props ' +
  'with new props and with false as a second argument ' +
  'if scrollTarget doesn`t differes from what was in previouse props',
  () => {
    const updatedProps = {
      ...defaultProps,
      scrollTarget: 'test_scroll_target',
    }

    const ScrollAreaController = getScrollController(scrollAdapterMock)
    wrapper = shallow(<ScrollAreaController {...updatedProps}/>);

    wrapper.instance().scrollHandler = jest.fn();

    wrapper.setProps({
      shouldScrollBottom: true,
      scrollTarget: 'test_scroll_target',
    });

    const newProps = {
      ...defaultProps,
      shouldScrollBottom: true,
      scrollTarget: 'test_scroll_target',
    };

    expect(wrapper.instance().scrollHandler).toBeCalled();
    expect(wrapper.instance().scrollHandler).toBeCalledWith(newProps, false);
  }
);

test('set scrollEterator on onStartScrollToBottom', () => {
  const instance = wrapper.instance();

  instance.onStartScrollToBottom();

  expect(instance.scrollEterator).toBeDefined();
});

test('set scrollEterator on onStartScrollToTop', () => {
  const instance = wrapper.instance();

  instance.onStartScrollToTop();

  expect(instance.scrollEterator).toBeDefined();
});

test('reset scrollEterator on onCancelSroll', () => {

  const instance = wrapper.instance();
  instance.scrollEterator = setInterval(() => 'test');
  
  instance.onCancelScroll();

  expect(clearInterval.mock.calls.length).toBe(1);
  expect(clearInterval.mock.calls[0][0]).toBe(instance.scrollEterator);
});

