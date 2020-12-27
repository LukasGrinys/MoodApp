import React from 'react';
import SuccessBox from '../SuccessBox';
import { shallow } from 'enzyme';

const message = 'This is a test success message'

const wrapper = shallow(
    <SuccessBox>
        {message}
    </SuccessBox>
);

test('Renders a text, given as children prop', () => {
    expect(wrapper.find('.container').text()).toBe(message);
})