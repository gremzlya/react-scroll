import { connect } from 'react-redux';
import * as selectors from '../../reducer/scroll';
import * as actions from '../../actions/scroll';
import ScrollController from './Controller';

const mapStateToProps = state => {
  const scrollState = state.get('scroll');

  return {
    scrollTarget: selectors.getScrollTarget(scrollState),
    shouldScrollTop: selectors.getScrollTopStatus(scrollState),
    shouldScrollBottom: selectors.getScrollBottomStatus(scrollState),
    scrollStateIdentifier: selectors.getStateIdentifier(scrollState),
  };
};

const mapActionsToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapActionsToProps)(ScrollController);
