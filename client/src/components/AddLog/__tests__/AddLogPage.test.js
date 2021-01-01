import React from 'react';
import AddLogPage from '../AddLogPage';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Loading from '../../Loading/loading';
import { testUser } from '../../../../__mocks__/userMock';
import { postLog } from '../../../actions/logs/asyncActions';
import { getDate, getDaytime } from '../../../util/dateHelpers';

const mockStore = configureStore();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn()
    }
});

jest.mock("react-redux", () => {
    const { Provider, useSelector } = jest.requireActual("react-redux");
  
    return {
        useDispatch: () => mockDispatch,
        useSelector,
        Provider
    };
});


describe('AddLogPage: loading', () => {
    const store = mockStore({
        user: { userData: testUser },
        logs: { canLog: undefined }
    })
    const wrapper = mount(
        <Provider store={store}>
            <AddLogPage/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has loading widget', () => {
        expect(wrapper.find(Loading).length).toBe(1);
    });
});

const store = mockStore({
    user: { userData: testUser },
    logs: { canLog: true }
});

const wrapper = mount(
    <Provider store={store}>
        <AddLogPage/>
    </Provider>
);

describe('AddLogPage UI', () => {
    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has input of type "range" for mood rating', () => {
        expect(wrapper.find('input[type="range"]').length).toBe(1);
    });

    test('Input range element has proper initial props', () => {
        expect(wrapper.find('input[type="range"]').props()).toEqual({
            max: "10",
            min: "1",
            onChange: expect.any(Function),
            type: "range",
            value: 5
        })
    });

    test('Has a block for displaying mood text', () => {
        expect(wrapper.find('.topSection').children('span').length).toBe(1);
    })

    test('Has textarea for log message', () => {
        expect(wrapper.find('textarea').length).toBe(1);
    });

    test('Textarea has proper initial props', () => {
        expect(wrapper.find('textarea').props()).toEqual({
            className: 'textArea',
            name: 'message',
            onChange: expect.any(Function),
            placeholder: '',
            value: ''
        });
    });

    test('Has button for submitting log', () => {
        expect(wrapper.find('button').length).toBe(1);
    });

    test('Button has proper initial props', () => {
        expect(wrapper.find('button').props()).toEqual({
            className: "button btnPrimary",
            disabled: false,
            onClick: expect.any(Function),
            type: 'button',
            children: 'Submit'
        })
    });
});

describe('AddLogPage logic', () => {
    const testRating = 10;
    const testMessage = 'This is a test message';

    test('Mood rating changes when input range is changed', () => {
        wrapper.find('input[type="range"]').simulate('change', {
            target : {
                type: 'range',
                value: testRating
            }
        });

        expect(wrapper.find('.moodBox').text()).toBe(testRating.toString());
    });

    test('Mood text changes according to rating', () => {
        expect(wrapper.find('.topSection').children('span').text()).toBe('Awesome!');
    });

    test('Log message changes when typed to textarea', () => {
        wrapper.find('textarea').simulate('change', {
            target : {
                name: 'message',
                value: testMessage
            }
        });

        expect(wrapper.find('textarea').prop('value')).toBe(testMessage);
    });

    test('Button click dispatches postLog action', () => {
        const button = wrapper.find('button');
        button.simulate('click');

        setTimeout( () => {
            expect(postLog).toHaveBeenCalledTimes(1);

            expect(postLog).toHaveBeenCalledWidth({
                userId: testUser.userData.id,
                date : getDate(),
                timing : getDaytime(),
                rating : testRating,
                text : testMessage
            });

            done();
        }, 0);
    });

    test('Button should be disabled after submitting log', () => {
        expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    });

    test('Pressing enter key submits log', () => {
        wrapper.find('textarea').simulate('keypress', {key: 'Enter'});

        setTimeout( () => {
            expect(postLog).toHaveBeenCalledTimes(1);
            done();
        }, 0)
    })
});