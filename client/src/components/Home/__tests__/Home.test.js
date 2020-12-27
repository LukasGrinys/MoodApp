import configureStore from 'redux-mock-store';
import React from 'react';
import "animate.css/animate.min.css";
import Home from '../Home';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
configure({ adapter: new Adapter() });
const mockStore = configureStore();

jest.mock('react-animate-on-scroll');

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useLayoutEffect: jest.requireActual('react').useEffect,
  }));

test('renders loading screen if there is no auth data', () => {
    const state = {
        user : {}
    };
    const store = mockStore(state);

    const wrapper = shallow(<Home store={store}/>);
    expect(wrapper).toMatchSnapshot();
});


test('renders page if there is user auth data', () => {
    const state = {
        user : {
            isAuth : false
        }
    };
    const store = mockStore(state);

    const wrapper = mount(<Home store={store}/>);
    expect(wrapper).toMatchSnapshot();
});