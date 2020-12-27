import React from 'react';
import AllLogs from '../AllLogs';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { testLogs } from '../../../../__mocks__/logsMock';
import { getLogs } from '../../../actions/logs/asyncActions';

const mockStore = configureStore();

describe('AllLogs page: loading state', () => {
    const store = mockStore({
        user: {},
        logs: {
            allLogs: {}
        }
    });
    
    const wrapper = mount(
        <Provider store={store}>
            <AllLogs/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has Loading widget', () => {
        expect(wrapper.find('Loading').length).toBe(1);
    });
});

describe('AllLogs page: no logs', () => {
    const store = mockStore({
        user: {},
        logs: {
            allLogs: {
                logs: [], 
                isFetchingAllLogs: false, 
                noLogsLeft: false
            }
        }
    });
    
    const wrapper = mount(
        <Provider store={store}>
            <AllLogs/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has a message "no logs found"', () => {
        expect(wrapper.find('div').at(0).text()).toBe('No logs found');
    })
});

describe('AllLogs page: logs found', () => {
    const store = mockStore({
        user: {},
        logs: {
            allLogs: {
                logs: testLogs, 
                isFetchingAllLogs: false, 
                noLogsLeft: false
            }
        }
    });
    
    const wrapper = mount(
        <Provider store={store}>
            <AllLogs/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('It renders LogItem component for each log', () => {
        expect(wrapper.find('LogItem').length).toBe(testLogs.length);
    });

    test('It has button for loading more components', () => {
        expect(wrapper.find('button').length).toBe(1);
    });

    test('It calls getLogs when rendered', () => {
        setTimeout( () => {
            expect(getLogs).toHaveBeenCalledTimes(1);
        }, 0)
    });

    test('It calls getLogs and shows loading widget when clicked on the LoadMore button', () => {
        wrapper.find('button').simulate('click');
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('LoadingNetItem').length).toBe(1);
            expect(getLogs).toHaveBeenCalledTimes(2);
        });
    })
});

test('It does not render LoadMore button if all logs have been fetched', () => {
    const store = mockStore({
        user: {},
        logs: {
            allLogs: {
                logs: testLogs, 
                isFetchingAllLogs: false, 
                noLogsLeft: true
            }
        }
    });
    
    const wrapper = mount(
        <Provider store={store}>
            <AllLogs/>
        </Provider>
    );

    expect(wrapper.find('button').length).toBe(0);
});

test('It renders Error Box if there was an error while fetching', () => {
    const testError = 'test error';

    const store = mockStore({
        user: {},
        logs: {
            allLogs: {
                logs: testLogs, 
                isFetchingAllLogs: false, 
                error: testError,
                noLogsLeft: false
            }
        }
    });
    
    const wrapper = mount(
        <Provider store={store}>
            <AllLogs/>
        </Provider>
    );

    expect(wrapper.find('ErrorBox').length).toBe(1);
    expect(wrapper.find('ErrorBox').text()).toBe(testError);
});
