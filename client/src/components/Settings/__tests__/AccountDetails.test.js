import React from 'react';
import AccountDetails from '../AccountDetails';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { formErrorMessages } from '../../../constants/formErrorMessages';
import { editUserDetails, clearEditUser } from '../../../actions/user/asyncActions';

const mockStore = configureStore();
const testUserId = 'testID';
const accountDetailsProps = {
    email: 'test@mail.com',
    firstName: 'Test',
    lastName: 'Testington'
}

const store = mockStore({
    user: {
        id : testUserId
    }
});

const wrapper = mount(
    <Provider store={store}>
        <AccountDetails {...accountDetailsProps}/>
    </Provider>
);

describe('AccountDetails: initial UI', () => {
    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Shows users email', () => {
        const emailBlock = wrapper.find('.formWrapper').find('div').at(1);
        expect(emailBlock.text()).toBe(`User:  ${accountDetailsProps.email}`);
    });

    test('Has input field for editing firstName', () => {
        expect(wrapper.find('input[name="firstName"]').length).toBe(1);
    });

    test('firstName field has proper initial props', () => {
        expect(wrapper.find('input[name="firstName"]').props()).toEqual({
            className: "textInput",
            name: "firstName",
            onBlur: expect.any(Function),
            onChange: expect.any(Function),
            type: "text",
            value: accountDetailsProps.firstName
        });
    });

    test('Has input field for editing lastName', () => {
        expect(wrapper.find('input[name="lastName"]').length).toBe(1);
    });

    test('lastName field has proper initial props', () => {
        expect(wrapper.find('input[name="lastName"]').props()).toEqual({
            className: "textInput",
            name: "lastName",
            onBlur: expect.any(Function),
            onChange: expect.any(Function),
            type: "text",
            value: accountDetailsProps.lastName
        });
    });

    test('Has button for saving changes', () => {
        expect(wrapper.find('button').length).toBe(1);
    });

    test('Button has proper props', () => {
        expect(wrapper.find('button').props()).toEqual({
            className: 'button btnPrimary',
            onClick: expect.any(Function),
            type: 'button',
            children: 'Save changes'
        });
    });
});

describe('AccountDetails form logic', () => {
    test('Changes input value when typed', () => {
        const changedName = 'Teston';

        wrapper.find('input[name="firstName"]').simulate('change', {
            target : {
                name: 'firstName',
                value: changedName
            }
        });
        wrapper.update();

        expect(wrapper.find('input[name="firstName"]').prop('value')).toBe(changedName);
    });

    test('Shows error message if input is invalid', () => {
        wrapper.find('input[name="firstName"]').simulate('change', {
            target : {
                name: 'firstName',
                value: ''
            }
        });
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('ErrorMessage').length).toBe(1);
            expect(wrapper.find('ErrorMessage').text()).toBe(formErrorMessages.required);
            done();
        }, 0);
    });

    test('Dispatches editUser action when clicked on button', () => {
        const firstName = wrapper.find('input[name="firstName"]').prop('value');
        const lastName = wrapper.find('input[name="lastName"]').prop('value');

        wrapper.find('button').simulate('click');
        wrapper.update();

        setTimeout( () => {
            expect(editUserDetails).toHaveBeenCalledTimes(1);
            expect(editUserDetails).toHaveBeenCalledWith({
                userId : testUserId,
                details : {
                    firstName,
                    lastName
                }
            });
        }, 0);
    })
});

describe('Handling success and errors', () => {
    test('Shows success box if the request was successful', () => {
        const store = mockStore({
            user: {
                editUser: {
                    success: true,
                    error: false
                }
            }
        });
        
        const successWrapper = mount(
            <Provider store={store}>
                <AccountDetails {...accountDetailsProps}/>
            </Provider>
        );

        expect(successWrapper.find('SuccessBox').length).toBe(1);
    });

    test('Shows error box if the request was not successful', () => {
        const testError = 'Test error';

        const store = mockStore({
            user: {
                editUser: {
                    success: false,
                    error: testError
                }
            }
        });
        
        const errorWrapper = mount(
            <Provider store={store}>
                <AccountDetails {...accountDetailsProps}/>
            </Provider>
        );

        expect(errorWrapper.find('ErrorBox').length).toBe(1);
        expect(errorWrapper.find('ErrorBox').text()).toBe(testError);
    });
})