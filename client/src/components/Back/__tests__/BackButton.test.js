import React from 'react';
import BackButton from '../BackButton';
import { shallow } from 'enzyme';

const wrapper = shallow(<BackButton/>);

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Has Arrow icon', () => {
    expect(wrapper.find('FontAwesome').prop('name')).toBe('arrow-left');
});

test('Calls window.history.back when clicked', () => {
    window.history.back = jest.fn();
    const button = wrapper.find('.button');
    button.simulate('click');
    expect(window.history.back).toHaveBeenCalledTimes(1);
});