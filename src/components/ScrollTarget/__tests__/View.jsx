import React from 'react';
import { shallow } from 'enzyme';
import { ScrollTarget } from '../View'; 

let wrapper;

const props = {
  className: 'test',
};

beforeEach(() => {
  wrapper = shallow(<ScrollTarget {...props}><p/></ScrollTarget>);
});

test('renders in DOM', () => {
  expect(wrapper).toHaveLength(1);
});

test('renders child component', () => {
  expect(wrapper.find('p')).toHaveLength(1);
});

test('passes props to the main div element', () => {
  const divNode = wrapper.find('div');
  
  expect(divNode.props().className).toBe(props.className);
});
