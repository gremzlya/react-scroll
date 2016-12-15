import { createAction, combineActions } from 'redux-actions';

export const setScrollTarget = createAction('SCROLL:SET_TARGET');
export const startAutoScrollTop = createAction('SCROLL:START_AUTO_TOP');
export const startAutoScrollBottom = createAction('SCROLL:START_AUTO_BOTTOM');
export const stopAutoScroll = createAction('SCROLL:STOP_AUTO_SCROLL');

export const scrollActions = combineActions(
  setScrollTarget,
  startAutoScrollTop,
  startAutoScrollBottom,
  stopAutoScroll
);
