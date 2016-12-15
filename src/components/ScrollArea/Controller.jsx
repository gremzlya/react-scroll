import './scrollArea.css'
import React, { Component, PropTypes } from 'react';
import { v4 } from 'uuid';
import * as adapter from './scrollAdapter';

export const getScrollController = (scrollAdapter) => 
  class ScrollController extends Component {
    static propTypes = {
      scrollTarget: PropTypes.string,
      shouldScrollBottom: PropTypes.bool.isRequired,
      shouldScrollTop: PropTypes.bool.isRequired,
    }

    state = {
      elementId: v4(),
    }

    constructor() {
      super();

      this.scrollHandler = this.scrollHandler.bind(this);
      this.onStartScrollToBottom = this.onStartScrollToBottom.bind(this);
      this.onStartScrollToTop = this.onStartScrollToTop.bind(this);
      this.onCancelScroll = this.onCancelScroll.bind(this);
    }

    componentDidMount() {
      this.scrollHandler(this.props, this.props.scrollTarget);
    }

    componentWillReceiveProps(nextProps) {
      const targetExists = !!nextProps.scrollTarget;
      const targetHasChanged = this.props.scrollTarget !== nextProps.scrollTarget;
      const shouldScrollToTarget = targetExists && targetHasChanged;

      this.scrollHandler(nextProps, shouldScrollToTarget && nextProps.scrollTarget);
    }

    scrollHandler(props, target) {
      if (target) {
        return scrollAdapter.scrollToElement(target, this.state.elementId);
      }

      if (props.shouldScrollBottom) {
        return scrollAdapter.scrollToBottom(this.state.elementId);
      }

      if (props.shouldScrollTop) {
        return scrollAdapter.scrollToTop(this.state.elementId);
      }
    }

    onStartScrollToBottom() {
      this.scrollEterator = setInterval(scrollAdapter.scrollDownStep(this.node));
    }

    onStartScrollToTop() {
      this.scrollEterator = setInterval(scrollAdapter.scrollUpStep(this.node));
    }

    onCancelScroll() {
      clearInterval(this.scrollEterator);
    }

    render() {
      return (
        <div className="scroll-area-container">
          <div
            className="scroll-top-area"
            onMouseEnter={this.onStartScrollToTop}
            onMouseLeave={this.onCancelScroll}
          />
          <div
            className="scroll-content-area"
            id={this.state.elementId}
            ref={node => this.node = node}
          >
            { this.props.children }
          </div>
          <div
            className="scroll-bottom-area"
            onMouseEnter={this.onStartScrollToBottom}
            onMouseLeave={this.onCancelScroll}
          />
        </div>
      );
    }
  }
    
export default getScrollController(adapter);