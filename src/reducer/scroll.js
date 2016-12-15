import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as actionCreators from '../actionCreators/scroll';
 
const defaultState = new Map({
  target: undefined,
  shouldScrollTop: false,
  shouldScrollBottom: false,
  stateIdentifier: 0,
});

const reducer = handleActions({
  [actionCreators.setScrollTarget]: (state, { payload }) => state
    .set('shouldScrollTop', false)
    .set('shouldScrollBottom', false)
    .set('target', payload),

  [actionCreators.startAutoScrollTop]: (state) => state
    .update('stateIdentifier', val => val + 1)
    .set('target', undefined)
    .set('shouldScrollTop', true)
    .set('shouldScrollBottom', false),

  [actionCreators.startAutoScrollBottom]: (state) => state
    .update('stateIdentifier', val => val - 1)
    .set('target', undefined)
    .set('shouldScrollBottom', true)
    .set('shouldScrollTop', false),

  [actionCreators.stopAutoScroll]: (state) => state
    .set('shouldScrollBottom', false)
    .set('shouldScrollTop', false),

}, defaultState);

export default reducer;

export const getScrollTarget = state => state.get('target');
export const getScrollTopStatus = state => state.get('shouldScrollTop');
export const getScrollBottomStatus = state => state.get('shouldScrollBottom');
export const getStateIdentifier = state => state.get('stateIdentifier');
