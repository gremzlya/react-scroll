import * as actionCreators from '../../actionCreators/scroll';
import * as actions from '../scroll';

// TODO move to common *genericHelpers
const testGenericAction = (type, action, expectedPayload, ...actionArgs) => {
  const expected = { type, payload: expectedPayload };

  const actual = action(...actionArgs);

  expect(actual).toEqual(expected);
}

test('has setScrollTarget action', () => {
  expect(typeof actions.setScrollTarget).toBe('function');
});

test('has startAutoScrollTop action', () => {
  expect(typeof actions.startAutoScrollTop).toBe('function');
});

test('has startAutoScrollBottom action', () => {
  expect(typeof actions.startAutoScrollBottom).toBe('function');
});

test('has stopAutoScroll action', () => {
  expect(typeof actions.stopAutoScroll).toBe('function');
});

test('calling setScrollTarget returns correct object', () => {
  const target = 'test_target';

  testGenericAction(actionCreators.setScrollTarget().type, actions.setScrollTarget, target, target);
});

test('calling startAutoScrollTop returns correct object', () => {
  testGenericAction(actionCreators.startAutoScrollTop().type, actions.startAutoScrollTop)
});

test('calling startAutoScrollBottom returns correct object', () => {
  testGenericAction(actionCreators.startAutoScrollBottom().type, actions.startAutoScrollBottom)
});

test('calling stopAutoScroll returns correct object', () => {
  testGenericAction(actionCreators.stopAutoScroll().type, actions.stopAutoScroll)
});

test('calling stopAutoScroll returns correct object', () => {
  testGenericAction(actionCreators.stopAutoScroll().type, actions.stopAutoScroll)
});
