import React from 'react';

import Footer from '../Footer';
import ErrorMessage from '../ErrorMessage';
import Heading from '../Heading';
import Input from '../Input';
import Label from '../Label';

import { shallow } from 'enzyme';

describe('Input field', () => {
    const handleChangeMock = jest.fn();
    const handleBlurMock = jest.fn();

    const inputProps = {
        type: 'text',
        name: 'Test',
        value: '',
        controlEvents: {
            handleChange: handleChangeMock,
            handleBlur: handleBlurMock
        }, 
        placeholder: 'testPlaceholder'
    }
    const inputWrapper = shallow(<Input {...inputProps}/>);

    test('Renders propely', () => {
        expect(inputWrapper).toMatchSnapshot();
    });

    test('Input element has proper props', () => {
        expect(inputWrapper.find('input').props()).toEqual({
            className: "textInput",
            name: "Test",
            onBlur: handleBlurMock,
            onChange: handleChangeMock,
            type: "text",
            value: ""
        })
    });

    test('Calls handleChange when typed', () => {
        inputWrapper.find('input').simulate('change', {
            target: {
                name: inputProps.name,
                value: ''
            }
        });
        inputWrapper.update();

        expect(handleChangeMock).toHaveBeenCalledTimes(1);
    });

    test('Calls handleBlur when blurred', () => {
        inputWrapper.find('input').simulate('blur');
        inputWrapper.update();

        expect(handleBlurMock).toHaveBeenCalledTimes(1);
    });

    test('Renders textarea if "textarea" is passed as type prop', () => {
        const textareaProps = {
            type: 'textarea'
        }
        const textareaWrapper = shallow(<Input {...textareaProps}/>);

        expect(textareaWrapper.find('textarea').length).toBe(1);
    });
});

describe('Static elements renders properly', () => {
    const text = 'test';
    const footerWrapper = shallow(<Footer>{text}</Footer>)

    test('Footer renders properly', () => {
        expect(footerWrapper).toMatchSnapshot();
    });

    test('Footer renders text passed as children', () => {
        expect(footerWrapper.text()).toBe(text);
    });

    const labelWrapper = shallow(<Label>{text}</Label>)

    test('Label renders properly', () => {
        expect(labelWrapper).toMatchSnapshot();
    });

    test('Label renders text passed as children', () => {
        expect(labelWrapper.text()).toBe(text);
    });

    const headingWrapper = shallow(<Heading>{text}</Heading>)

    test('Heading renders properly', () => {
        expect(headingWrapper).toMatchSnapshot();
    });

    test('Heading renders text passed as children', () => {
        expect(headingWrapper.text()).toBe(text);
    });

    const errorWrapper = shallow(<ErrorMessage>{text}</ErrorMessage>)

    test('Error renders properly', () => {
        expect(errorWrapper).toMatchSnapshot();
    });

    test('Error renders text passed as children', () => {
        expect(errorWrapper.text()).toBe(text);
    });
})

