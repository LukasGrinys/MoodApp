import React from 'react';
import ChangePassword from '../ChangePassword';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { formErrorMessages } from '../../../constants/formErrorMessages';
import { changePassword } from '../../../actions/user/asyncActions';

const mockStore = configureStore();
const testUserId = 'testID';

const store = mockStore({
    user: {
        id : testUserId
    }
});

const wrapper = mount(
    <Provider store={store}>
        <ChangePassword userId={testUserId}/>
    </Provider>
);

describe('ChangePassword: initial UI', () => {
    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has input field for password', () => {
        expect(wrapper.find('input[name="password"]').length).toBe(1);
    });

    test('Password field has proper initial props', () => {
        expect(wrapper.find('input[name="password"]').props()).toEqual({
            className: "textInput",
            name: "password",
            onBlur: expect.any(Function),
            onChange: expect.any(Function),
            type: "password",
            value: ''
        });
    });

    test('Has input field for confirming password', () => {
        expect(wrapper.find('input[name="confirmPassword"]').length).toBe(1);
    });

    test('Password confirm field has proper initial props', () => {
        expect(wrapper.find('input[name="confirmPassword"]').props()).toEqual({
            className: "textInput",
            name: "confirmPassword",
            onBlur: expect.any(Function),
            onChange: expect.any(Function),
            type: "password",
            value: ''
        });
    });

    test('Has button for changing password', () => {
        expect(wrapper.find('button').length).toBe(1);
    });

    test('Button has proper props', () => {
        expect(wrapper.find('button').props()).toEqual({
            className: 'button btnPrimary',
            onClick: expect.any(Function),
            type: 'button',
            children: 'Change password',
            disabled: false
        });
    });
});

describe('ChangePassword form logic', () => {
    const currentPassword = 'password';
    const testPassword = 'newpassword';

    test('Changes input value when typed', () => {
        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: testPassword
            }
        });
        wrapper.update();

        expect(wrapper.find('input[name="password"]').prop('value')).toBe(testPassword);
    });

    test('Shows error message if input is invalid (passwords do not match)', () => {
        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: testPassword
            }
        });
        wrapper.find('input[name="confirmPassword"]').simulate('change', {
            target : {
                name: 'confirmPassword',
                value: 'notTheSamePassword'
            }
        });
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('ErrorMessage').length).toBe(1);
            expect(wrapper.find('ErrorMessage').text()).toBe(formErrorMessages.passwordMatch);
            done();
        }, 0);
    });

    test('Dispatches changePassword action when clicked on button', () => {
        wrapper.find('input[name="currentPassword"]').simulate('change', {
            target : {
                name: 'currentPassword',
                value: currentPassword
            }
        });
        wrapper.find('input[name="password"]').simulate('change', {
            target : {
                name: 'password',
                value: testPassword
            }
        });
        wrapper.find('input[name="confirmPassword"]').simulate('change', {
            target : {
                name: 'confirmPassword',
                value: testPassword
            }
        });

        wrapper.find('button').simulate('click');
        wrapper.update();

        setTimeout( () => {
            expect(changePassword).toHaveBeenCalledTimes(1);
            expect(changePassword).toHaveBeenCalledWith({
                userId : testUserId,
                currentPassword,
                newPassword: testPassword
            });
        }, 0);
    })
});

describe('Handling success and errors', () => {
    test('Shows success box if the request was successful', () => {
        const store = mockStore({
            user: {
                changePassword: {
                    success: true,
                    error: false
                }
            }
        });
        
        const successWrapper = mount(
            <Provider store={store}>
                <ChangePassword userId={testUserId}/>
            </Provider>
        );

        expect(successWrapper.find('SuccessBox').length).toBe(1);
    });

    test('Shows error box if the request was not successful', () => {
        const testError = 'Test error';

        const store = mockStore({
            user: {
                changePassword: {
                    success: false,
                    error: testError
                }
            }
        });
        
        const errorWrapper = mount(
            <Provider store={store}>
                <ChangePassword userId={testUserId}/>
            </Provider>
        );

        expect(errorWrapper.find('ErrorBox').length).toBe(1);
        expect(errorWrapper.find('ErrorBox').text()).toBe(testError);
    });
})