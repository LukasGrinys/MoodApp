import React from 'react';
import LogItem from '../logItem';
import { shallow } from 'enzyme';
import { testLog } from '../../../../__mocks__/logsMock';

const wrapper = shallow(<LogItem {...testLog}/>)

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Has rating box with log rating in it', () => {
    const ratingBox = wrapper.find('.rating_box');
    expect(ratingBox.length).toBe(1);
    expect(ratingBox.text()).toBe(testLog.rating.toString());
});

test('Has text div with log message in it', () => {
    const text = wrapper.find('.text');
    expect(text.length).toBe(1);
    expect(text.text()).toBe(testLog.text);  
});