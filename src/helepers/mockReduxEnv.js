import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  scroll: {
    target: undefined,
    isScrolling: false,
    shouldScrollTop: false,
    shouldScrollBottom: false,
    stateIdentifier: 0,
  },
});

export const getMockedStore = () => {
  const mockStore = configureStore();

  return mockStore(defaultState);
};

export const getMockedProvider = () => {
  const store = getMockedStore();

  const MockedProvider = (props) => (
    <Provider store={store}>
      {props.children}
    </Provider>
  );

  return MockedProvider;
};
