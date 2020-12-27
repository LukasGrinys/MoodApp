import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddNewLog from '../AddNewLog';
import LoadingNetItem from '../../Loading/loadingNetItem';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { returnTimeRemaining } from '../AddNewLog';
const mockStore = configureStore();

describe('AddNewLog button: Loading', () => {
    const initialState = {
        user: {},
        logs: {
            canLog : null
        }
    }

    const store = mockStore(initialState);

    const wrapper = mount(
        <Provider store={store}>
            <AddNewLog/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has LoadingNetItem widget while loading', () => {
        expect(wrapper.find(LoadingNetItem).length).toBe(1);
    });
});

describe('AddNewLog button: Data loaded', () => {
    test('Renders properly: user can log', () => {
        const mockedStore = mockStore({
            user: {},
            logs: {
                canLog : true
            }
        });

        const wrapper = mount(
            <Router>
                <Provider store={mockedStore}>
                    <AddNewLog />
                </Provider>
            </Router>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('Renders properly: user cant log', () => {
        const mockedStore = mockStore({
            user: {},
            logs: {
                canLog : false
            }
        });

        const wrapper = mount(
            <Provider store={mockedStore}>
                <AddNewLog/>
            </Provider>
        );

        const userCantLogText = `Next log will be available at: ${returnTimeRemaining()}`;
        expect(wrapper.find('.logbutton').text()).toBe(userCantLogText);
    });
})