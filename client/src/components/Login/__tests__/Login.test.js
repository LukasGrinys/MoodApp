import React from 'react';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import Login from '../Login';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { loginUser } from '../../../actions/user/asyncActions';

const mockDispatch = jest.fn();
const mockStore = configureStore();

jest.mock("react-redux", () => {
    const { Provider, useSelector } = jest.requireActual("react-redux");
  
    return {
        useDispatch: () => mockDispatch,
        useSelector,
        Provider
    };
});

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn()
    }
});

const store = mockStore({
    user: {}
});

describe('Login form UI', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = mount(
            <Provider store={store}>
                <Login/>
            </Provider>
        );
    });

    afterEach( () => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('It should have an email field', () => {
        expect(wrapper.find('input[name="email"]').length).toEqual(1);
    });

    test('Email field should have proper props', () => {
        expect(wrapper.find('input[name="email"]').props()).toEqual({
            type: 'email',
            name: 'email',
            value: '',
            className: expect.any(String),
            onChange: expect.any(Function),
            onBlur: expect.any(Function)
        })
    });

    test('It should have a password field', () => {
        expect(wrapper.find('input[name="password"]').length).toEqual(1);
    });

    test('Password field should have proper props', () => {
        expect(wrapper.find('input[name="password"]').props()).toEqual({
            type: 'password',
            name: 'password',
            value: '',
            className: expect.any(String),
            onChange: expect.any(Function),
            onBlur: expect.any(Function)
        })
    });

    test('It should have a Login button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

    test('Submit button should have proper props', () => {
        expect(wrapper.find('button').props()).toEqual({
            className: expect.any(String),
            onClick: expect.any(Function),
            disabled: false,
            type: 'button',
            children: 'Log In'
        })
    });
});

describe('Login form logic', () => {
    let wrapper;
    
    beforeEach( () => {
        wrapper = mount(
            <Provider store={store}>
                <Login/>
            </Provider>
        );
    });

    afterEach( () => {
        wrapper.unmount();
    });
    
    test('Initial form values are empty', () => {
        expect(wrapper.find('input[name="email"]').props().value).toEqual('');
        expect(wrapper.find('input[name="password"]').props().value).toEqual('');
    });

    test('Email input value change when typed', () => {
        const testEmail = 'mail@mail.com';

        wrapper.find('input[name="email"]').simulate('change', {
            target : {
                name: 'email',
                value: testEmail
            }
        });
        wrapper.update();

        expect(wrapper.find('input[name="email"]').prop('value')).toEqual(testEmail);
    });

    test('Password input value change when typed', () => {
        const testPassword = 'thisisapassword';

        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: testPassword
            }
        });
        wrapper.update();
        
        expect(wrapper.find('input[name="password"]').prop('value')).toEqual(testPassword);
    });

    test('Button should be disabled when values are incorrect', () => {
        wrapper.find('input[name="email"]').simulate('change', {
            target : {
                name: 'email',
                value: ''
            }
        });
        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: ''
            }
        });

        setTimeout(() => {
            wrapper.update();
            const button = wrapper.find('button'); 
            expect(button.prop('disabled')).toBeTruthy();
            done();
          }, 0);
    });

    test('Button should be enabled when values are valid', () => {
        wrapper.find('input[name="email"]').simulate('change', {
            target : {
                name: 'email',
                value: 'mail@mail.com'
            }
        });
        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: 'password'
            }
        });

        setTimeout(() => {
            wrapper.update();
            const button = wrapper.find('button'); 
            expect(button.prop('disabled')).toBeFalsy();
            done();
          }, 0);
    });

    test('Error messages should be shown if input is invalid', () => {
        wrapper.find('input[name="email"]').simulate('blur');

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find(/errorMessage/i)).toHaveLengthOf(1);
            done();
          }, 0);
    });

    test('Login function is called when submitting a form with proper values', () => {
        wrapper.find('input[name="email"]').simulate('change', {
            target : {
                name: 'email',
                value: 'mail@mail.com'
            }
        });
        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: 'password'
            }
        });
        wrapper.find('button').simulate('click');

        setTimeout( () => {
            expect(loginUser).toHaveBeenCalledTimes(1);
            done();
        }, 0)
    });

    test('Pressing enter key invokes form submission', () => {
        const handleSubmit = jest.fn();

        wrapper.simulate('keypress', {key: 'Enter'});

        setTimeout( () => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
            done();
        }, 0)
    })
});