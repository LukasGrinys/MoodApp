import React from 'react';
import LogView from '../LogView';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { testLog } from '../../../../__mocks__/logsMock';

const mockStore = configureStore();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => {
    const { Provider, useSelector } = jest.requireActual("react-redux");
  
    return {
        useDispatch: () => mockDispatch,
        useSelector,
        Provider
    };
});

describe('Initial LogView', () => {
    const store = mockStore({
        user: {},
        logs: {
            singleLog: {}
        }
    })
    
    const testId = 'testId';
    const initialProps = {
        match: {
            params: {
                id: testId
            }
        }
    }
    
    const wrapper = mount(
        <Provider store={store}>
            <LogView {...initialProps}/>
        </Provider>
    );
    
    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Shows loading widget', () => {
        expect(wrapper.find('Loading').length).toBe(1);
    });

    test('Dispatches getLog action', () => {
        setTimeout( () => {
            const getLog = jest.fn();

            expect(getLog).toHaveBeenCalledTimes(1);
            expect(getLog).toHaveBeenCalledWith(testId);

            done();
        }, 0);
    })
});

describe('LogView after log data was fetched', () => {
    const store = mockStore({
        user: {},
        logs: {
            singleLog: {
                logData: {
                    ...testLog,
                },
                isFetching: false,
                error: null
            }
        }
    })
    
    const wrapper = mount(
        <Provider store={store}>
            <LogView/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Renders LogItem with proper props', () => {
        expect(wrapper.find('LogItem').length).toBe(1);
        expect(wrapper.find('LogItem').props()).toEqual({
            rating: testLog.rating,
            timing: testLog.timing,
            date: testLog.date,
            text: testLog.text
        })
    })
});

test('Renders error if there was an error while fetching log', () => {
    const testError = 'Test error';

    const store = mockStore({
        user: {},
        logs: {
            singleLog: {
                logData: {},
                isFetching: false,
                error: testError
            }
        }
    })
    
    const wrapper = mount(
        <Provider store={store}>
            <LogView/>
        </Provider>
    );

    expect(wrapper.find('ErrorBox').length).toBe(1);
    expect(wrapper.find('ErrorBox').text()).toBe(testError);
})
