import React from 'react';
import {
  Helpers
} from 'react-scroll';

export const ScrollTarget = (props) => (
  <div {...props}>
   { props.children }
  </div>
);

export default Helpers.Element(ScrollTarget);