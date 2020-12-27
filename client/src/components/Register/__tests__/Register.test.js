import React from 'react';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import Register from '..';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { createUser, loginUser } from '../../../actions/user/asyncActions';
import ErrorBox from '../../ErrorBox';

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

describe('Register page UI', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = mount(
            <Provider store={store}>
                <Register/>
            </Provider>
        );
    });

    afterEach( () => {
        wrapper.unmount();
    });

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('It should have fields for first and last names', () => {
        expect(wrapper.find('input[name="firstName"]').length).toEqual(1);
        expect(wrapper.find('input[name="lastName"]').length).toEqual(1);
    });

    test('First and last name should have proper props', () => {
        expect(wrapper.find('input[name="firstName"]').props()).toEqual({
            type: 'text',
            name: 'firstName',
            value: '',
            className: expect.any(String),
            onChange: expect.any(Function),
            onBlur: expect.any(Function)
        });
        expect(wrapper.find('input[name="lastName"]').props()).toEqual({
            type: 'text',
            name: 'lastName',
            value: '',
            className: expect.any(String),
            onChange: expect.any(Function),
            onBlur: expect.any(Function)
        });
    });

    test('Form should have email and password fields', () => {
        expect(wrapper.find('input[name="email"]').length).toEqual(1);
        expect(wrapper.find('input[name="password"]').length).toEqual(1);
    });

    test('Email and password fields should have proper props', () => {
        expect(wrapper.find('input[name="email"]').props()).toEqual({
            type: 'email',
            name: 'email',
            value: '',
            className: expect.any(String),
            onChange: expect.any(Function),
            onBlur: expect.any(Function)
        })
        expect(wrapper.find('input[name="password"]').props()).toEqual({
            type: 'password',
            name: 'password',
            value: '',
            className: expect.any(String),
            onChange: expect.any(Function),
            onBlur: expect.any(Function)
        })
    });

    test('It should have a Sign Up button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

    test('Sign up button should have proper props', () => {
        expect(wrapper.find('button').props()).toEqual({
            className: expect.any(String),
            onClick: expect.any(Function),
            disabled: false,
            type: 'button',
            children: 'Sign up'
        })
    });
});

describe('Register form logic', () => {
    const firstName = 'Test';
    const lastName = 'Testington';
    const email = 'mail@mail.com';
    const password = 'password';

    let wrapper;
    beforeEach( () => {
        wrapper = mount(
            <Provider store={store}>
                <Register/>
            </Provider>
        );
    });

    afterEach( () => {
        wrapper.unmount();
    });

    test('Initial form values are empty', () => {
        expect(wrapper.find('input[name="firstName"]').props().value).toEqual('');
        expect(wrapper.find('input[name="lastName"]').props().value).toEqual('');
        expect(wrapper.find('input[name="email"]').props().value).toEqual('');
        expect(wrapper.find('input[name="password"]').props().value).toEqual('');
    });

    test('Input values change when typed', () => {
        wrapper.find('input[name="firstName"]').simulate('change', {
            target : {
                name: 'firstName',
                value: firstName
            }
        });
        wrapper.find('input[name="lastName"]').simulate('change', {
            target : {
                name: 'lastName',
                value: lastName
            }
        });

        wrapper.update();

        expect(wrapper.find('input[name="firstName"]').prop('value')).toEqual(firstName);
        expect(wrapper.find('input[name="lastName"]').prop('value')).toEqual(lastName);
    });

    test('Button should be disabled when values are incorrect', () => {
        wrapper.find('input[name="firstName"]').simulate('blur');

        setTimeout(() => {
            wrapper.update();
            const button = wrapper.find('button'); 
            expect(button.prop('disabled')).toBeTruthy();
            done();
        }, 0);
    });

    test('Error message should be shown if values are incorrect', () => {
        wrapper.find('input[name="firstName"]').simulate('blur');

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find(/errorMessage/i)).toHaveLengthOf(1);
            done();
        }, 0);
    });

    test('Button should be enabled when values are correct', () => {
        wrapper.find('input[name="firstName"]').simulate('change', {
            target : {
                name: 'firstName',
                value: firstName
            }
        });
        wrapper.find('input[name="lastName"]').simulate('change', {
            target : {
                name: 'lastName',
                value: lastName
            }
        });
        wrapper.find('input[name="email"]').simulate('change', {
            target : {
                name: 'email',
                value: email
            }
        });
        wrapper.find('input[name="lastName"]').simulate('change', {
            target : {
                name: 'password',
                value: password
            }
        });

        setTimeout(() => {
            wrapper.update();
            const button = wrapper.find('button'); 
            expect(button.prop('disabled')).toBeFalsy();
            done();
        }, 0);
    });

    test('Register action is called when submitting form with proper values', () => {
        wrapper.find('input[name="firstName"]').simulate('change', {
            target : {
                name: 'firstName',
                value: firstName
            }
        });
        wrapper.find('input[name="lastName"]').simulate('change', {
            target : {
                name: 'lastName',
                value: lastName
            }
        });
        wrapper.find('input[name="email"]').simulate('change', {
            target : {
                name: 'email',
                value: email
            }
        });
        wrapper.find('input[name="lastName"]').simulate('change', {
            target : {
                name: 'password',
                value: password
            }
        });
        wrapper.find('button').simulate('click'); 

        setTimeout( () => {
            wrapper.update();
            expect(createUser).toHaveBeenCalledTimes(1);
            done();
        }, 0)
    })
});

describe('Register form error/success handling', () => {
    let wrapper;

    test('Shows error message if registering was not successful', () => {
        const testError = 'Test error';

        const mockedStore = mockStore({
            user: {
                createUser: {
                    success : false,
                    error : testError
                }
            }
        })

        const wrapper = mount(
            <Provider store={mockedStore}>
                <Register/>
            </Provider>
        );

        expect(wrapper.find(ErrorBox).length).toBe(1);
        expect(wrapper.find(ErrorBox).text()).toEqual(`Error: ${testError}`);
    });

    test('User is logged in if registration was succesful', () => {
        const mockedStore = mockStore({
            user: {
                createUser: {
                    success : true,
                    error : false
                }
            }
        })

        mount(
            <Provider store={mockedStore}>
                <Register/>
            </Provider>
        );

        setTimeout( () => {
            expect(loginUser).toHaveBeenCalledTimes(1);
            done();
        }, 0)
    });

})
