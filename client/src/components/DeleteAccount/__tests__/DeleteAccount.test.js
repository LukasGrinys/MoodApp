import React from 'react';
import { Provider } from 'react-redux';
import DeleteAccount from '../DeleteAccount';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { testUser } from '../../../../__mocks__/userMock';
import { formErrorMessages } from '../../../constants/formErrorMessages';

const mockStore = configureStore();

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn()
    }
});

const store = mockStore({
    user: {
        userData: testUser
    },
    logs: {}
});

const wrapper = mount(
    <Provider store={store}>
        <DeleteAccount/>
    </Provider>
);

describe('DeleteAccount page UI', () => {
    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has back button', () => {
        expect(wrapper.find('BackButton').length).toBe(1);
    });

    test('Has inputs for passwords', () => {
        expect(wrapper.find('input[name="password"]').length).toBe(1);
        expect(wrapper.find('input[name="confirmPassword"]').length).toBe(1);
    });

    test('Inputs have proper initial props', () => {
        expect(wrapper.find('input[name="password"]').props()).toEqual({
            className: 'textInput',
            name: 'password',
            onBlur: expect.any(Function),
            onChange: expect.any(Function),
            type: 'password',
            value: ''
        });

        expect(wrapper.find('input[name="confirmPassword"]').props()).toEqual({
            className: 'textInput',
            name: 'confirmPassword',
            onBlur: expect.any(Function),
            onChange: expect.any(Function),
            type: 'password',
            value: ''
        });
    });

    test('Has DeleteAccount button', () => {
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find('button').text()).toBe('Delete account');
    });

    test('DeleteAccount button has proper props', () => {
        expect(wrapper.find('button').props()).toEqual({
            className: 'button btnPrimary',
            disabled: false,
            onClick: expect.any(Function),
            type: 'button',
            children: 'Delete account'
        })
    });
});

describe('DeleteAccount page logic', () => {
    const testPassword = 'TestTest';
    const differentPassword = 'ThisIsDifferent'

    test('Input field value updates when typed in', () => {
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: testPassword
            }
        });
        expect(wrapper.find('input[name="password"]').prop('value')).toBe(testPassword);
    });

    test('Shows error message if passwords do not match', () => {
        wrapper.find('input[name="confirmPassword"]').simulate('change', {
            target: {
                name: 'confirmPassword',
                value: differentPassword
            }
        });

        wrapper.update();
        
        setTimeout( () => {
            expect(wrapper.find('ErrorBox').at(1).text()).toBe(formErrorMessages.passwordMatch);
            done();
        }, 0);
    });

    test('Button is disabled if values are invalid (passwords do not match)', () => {
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: testPassword
            }
        });
        wrapper.find('input[name="confirmPassword"]').simulate('change', {
            target: {
                name: 'confirmPassword',
                value: differentPassword
            }
        });
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('button').prop('disabled')).toBeTruthy();
            done();
        }, 0);
    });

    test('Button is enabled if values are valid', () => {
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: testPassword
            }
        });
        wrapper.find('input[name="confirmPassword"]').simulate('change', {
            target: {
                name: 'confirmPassword',
                value: testPassword
            }
        });
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('button').prop('disabled')).toBeFalsy();
            done();
        }, 0);
    });

    test('Button click calls handleDeleteAccount with the password', () => {
        const handleDeleteAccount = jest.fn();
        wrapper.find('button').simulate('click');

        setTimeout( () => {
            expect(handleDeleteAccount).toHaveBeenCalledTimes(1);
            expect(handleDeleteAccount).toHaveBeenCalledWith({
                password: testPassword
            });
            done();
        }, 0);
    });
})
