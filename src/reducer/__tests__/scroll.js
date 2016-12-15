import { Map } from 'immutable';
import * as actionCreators from '../../actionCreators/scroll';
import reducer, * as selectors from '../scroll';

// TODO move to common *genericHelpers
const genericReducerBehaviourCheck = (actionType, expectedState, customInitialState) => {
  const action = {
    type: actionType,
  };

  const actualState = reducer(customInitialState, action);
  expect(actualState).toEqual(expectedState);
}

let defaultState;

beforeEach(() => {
  defaultState = new Map({
    target: undefined,
    shouldScrollTop: false,
    shouldScrollBottom: false,
    stateIdentifier: 0,
  });
})

test('returnes default state', () => {
  const actualState = reducer(undefined, { type: undefined });

  expect(actualState).toEqual(defaultState);
});

test('handles setScrollTarget action', () => {
  const target = 'test_target';
  const action = {
    type: actionCreators.setScrollTarget().type,
    payload: target,
  };
  const initialState = defaultState
    .set('target', '123')
    .set('shouldScrollTop', true)
    .set('shouldScrollBottom', true);

  const expectedState = defaultState
    .set('target', target);
  const actualState = reducer(initialState, action);

  expect(actualState).toEqual(expectedState);
});

test('handles startAutoScrollTop action', () => {
  const actionType = actionCreators.startAutoScrollTop().type;
  const initialState = defaultState
    .set('target', 1)
    .set('shouldScrollBottom', true);
  const expectedState = defaultState
    .update('stateIdentifier', val => val + 1)
    .set('shouldScrollTop', true)
    .set('shouldScrollBottom', false);

  genericReducerBehaviourCheck(actionType, expectedState, initialState);
});

test('handles startAutoScrollBottom action', () => {
  const actionType = actionCreators.startAutoScrollBottom().type;
  const initialState = defaultState
    .set('target', 1)
    .set('shouldScrollTop', true);
  const expectedState = defaultState
    .update('stateIdentifier', val => val - 1)
    .set('shouldScrollBottom', true)
    .set('shouldScrollTop', false);

  genericReducerBehaviourCheck(actionType, expectedState, initialState);
});

test('handles stopAutoScroll action', () => {
  const actionType = actionCreators.stopAutoScroll().type;
  const initialState = defaultState.set('shouldScrollTop', true);

  const expectedState = defaultState
    .set('shouldScrollBottom', false)
    .set('shouldScrollTop', false);

  genericReducerBehaviourCheck(actionType, expectedState, initialState);
});

test('has getScrollTarget selector', () => {
  expect(typeof selectors.getScrollTarget).toBe('function');
});

test('getScrollTarget selector returns part of state', () => {
  const target = 'test_target';
  const state = defaultState.set('target', target);
  const actualResult = selectors.getScrollTarget(state);

  expect(actualResult).toBe(target);
});

test('has getScrollTopStatus selector', () => {
  expect(typeof selectors.getScrollTopStatus).toBe('function');
});

test('getScrollTopStatus selector returns part of state', () => {
  const state = defaultState.set('shouldScrollTop', true);
  const actualResult = selectors.getScrollTopStatus(state);

  expect(actualResult).toBe(true);
});

test('has getScrollBottomStatus selector', () => {
  expect(typeof selectors.getScrollBottomStatus).toBe('function');
});

test('getScrollBottomStatus selector returns part of state', () => {
  const state = defaultState.set('shouldScrollBottom', true);
  const actualResult = selectors.getScrollBottomStatus(state);

  expect(actualResult).toBe(true);
});

test('getStateIdentifier selector returns part of state', () => {
  const state = defaultState.set('stateIdentifier', 1);
  const actualResult = selectors.getStateIdentifier(state);

  expect(actualResult).toBe(1);
});
