import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import LastLogs from '../LastLogs';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import LoadingNetItem from '../../Loading/loadingNetItem';

const mockStore = configureStore();
const noLogsText = 'There are no logs at the moment Write Your first one, by pressing the green button at the top';
const testLog = {
    id: '001',
    rating: 10,
    date: "TEST-DATE",
    text: "Test text"
}

describe('Last logs item: loading', () => {
    const state = {
        user: {},
        logs: {
            lastLogs : {
                isFetching: true,
                logs: null
            }
        }
    }

    const store = mockStore(state);

    const wrapper = mount(
        <Provider store={store}>
            <LastLogs/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has LoadingNetItem widget', () => {
        expect(wrapper.find(LoadingNetItem).length).toBe(1);
    });
});

describe('Last logs item: has no logs', () => {
    const state = {
        user: {},
        logs: {
            lastLogs : {
                isFetching: false,
                logs: []
            }
        }
    }
    const store = mockStore(state);

    const wrapper = mount(
        <Provider store={store}>
            <LastLogs/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Shows text with "There are no logs"', () => {
        expect(wrapper.find('.greyText').text()).toBe(noLogsText);
    });
});


describe('Last logs item: has logs', () => {
    const state = {
        user: {},
        logs: {
            lastLogs : {
                isFetching: false,
                logs: [ testLog ]
            }
        }
    }
    const store = mockStore(state);

    const wrapper = mount(
        <Router>
            <Provider store={store}>
                <LastLogs/>
            </Provider>
        </Router>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Shows log rating box with correct rating', () => {
        expect(wrapper.find('.ratingBox').text()).toBe(testLog.rating.toString());
    });

    test('Shows log date', () => {
        expect(wrapper.find('.date').text()).toBe(testLog.date);
    });

    test('Shows log text', () => {
        expect(wrapper.find('.text').text()).toBe(testLog.text);
    });

    test('Has rendered a link for log reading', () => {
        expect(wrapper.find('.link').at(0).props()).toEqual({
            to: `/logs/${testLog.id}`,
            className: 'link',
            children: 'Read more'
        });
    });

    test('Has rendered as much items as there are', () => {
        expect(wrapper.find('.logItem').length).toBe(state.logs.lastLogs.logs.length);
    });

    test('Has a button for more logs', () => {
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find('button').text()).toBe('All Logs');
    });
});

const multipleTestLogs = [
    {
        id: '001',
        rating: 10,
        date: "TEST-DATE",
        text: "Test text"
    },
    {
        id: '002',
        rating: 9,
        date: "TEST-DATE",
        text: "Test text"
    },
    {
        id: '003',
        rating: 8,
        date: "TEST-DATE",
        text: "Test text"
    },
    {
        id: '004',
        rating: 7,
        date: "TEST-DATE",
        text: "Test text"
    }
]

test('If there is more than 3 logs, it shows only the last 3', () => {
    const state = {
        user: {},
        logs: {
            lastLogs : {
                isFetching: false,
                logs: multipleTestLogs
            }
        }
    }
    const store = mockStore(state);

    const wrapper = mount(
        <Router>
            <Provider store={store}>
                <LastLogs/>
            </Provider>
        </Router>
    );

    expect(wrapper.find('.logItem').length).toBe(3);
})