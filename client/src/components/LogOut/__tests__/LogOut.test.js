import React from 'react';
import { Provider } from 'react-redux';
import LogOut from '../LogOut';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
// import { logOut } from '../../../actions/user/asyncActions';

const mockStore = configureStore();
const store = mockStore({

});

jest.mock("react-redux", () => {  
    const { Provider } = jest.requireActual("react-redux");

    return {
        Provider,
        useDispatch: () => jest.fn(),
    };
});

const wrapper = mount(
    <Provider store={store}>
        <LogOut/>
    </Provider>
);

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Shows Loading widget', () => {
    expect(wrapper.find('Loading').length).toBe(1);
});

test('Dispatches logOut action', () => {
    const logOut = jest.fn();
    wrapper.update();

    setTimeout( () => {
        expect(logOut).toHaveBeenCalledTimes(1);
        done();
    }, 0);
})


