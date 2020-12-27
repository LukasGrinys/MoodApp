import React from 'react';
import ErrorBox from '../ErrorBox';
import { shallow } from 'enzyme';

const errorText = 'This is a test error'

const wrapper = shallow(
    <ErrorBox>
        {errorText}
    </ErrorBox>
);

test('Renders a text, given as children prop', () => {
    expect(wrapper.find('.container').text()).toBe(errorText);
})