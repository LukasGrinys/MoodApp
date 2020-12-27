import React from 'react';
import Button from '../Button';
import { shallow } from 'enzyme';

const clickMock = jest.fn();

const testProps = {
    handleClick: clickMock,
    disabled: false,
    children: 'Test button'
};

const wrapper = shallow(<Button {...testProps}/>);

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Has button element', () => {
    expect(wrapper.find('button').length).toBe(1);
});

test('Button element has proper props', () => {
    expect(wrapper.find('button').props()).toEqual({
        className: 'button btnPrimary',
        onClick: testProps.handleClick,
        disabled: testProps.disabled,
        type: 'button',
        children: testProps.children
    });
});

test('Button on click calls passed function', () => {
    wrapper.find('button').simulate('click');
    expect(testProps.handleClick).toHaveBeenCalledTimes(1);
});

test('Button changes color if "color" prop is passed', () => {
    const element = shallow(<Button {...testProps} color={"white"}/>);
    expect(element.find('button').prop('className')).toBe('button btnWhite');
})

