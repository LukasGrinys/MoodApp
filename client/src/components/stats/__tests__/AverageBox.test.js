import React from 'react';
import AverageBox from '../AverageBox';
import { shallow } from 'enzyme';

const testAverage = 10;
const wrapper = shallow(<AverageBox>{testAverage}</AverageBox>)

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

/* Indication, that average mood rating 
should be calculated inside this component */
test('Renders the average passed as props', () => {
    expect(wrapper.text()).toBe(testAverage.toString());
});