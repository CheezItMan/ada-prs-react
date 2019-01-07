import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Login from './components/Login';
import Main from './components/Main';

describe('App', () => {
  let wrapper;

  describe('without a token param', () => {
    beforeEach(() => {
      wrapper = shallow(<App />);
    });
    it('renders a Login view', () => {
      expect(wrapper.find(Login)).toHaveLength(1);
    });

    it('does not render a Main component', () => {
      expect(wrapper.find(Main)).toHaveLength(0);
    });
  });

  describe('with a token param', () => {
    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.setState({token: 'foo'});
    });

    it('renders a Main component', () => {
      expect(wrapper.find(Main)).toHaveLength(1);
    });

    it('does not render a login component', () => {
      expect(wrapper.find(Login)).toHaveLength(0);
    });
  });
});