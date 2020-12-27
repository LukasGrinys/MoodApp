import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({
    user: {
        isAuth: false
    }
});

const wrapper = mount(
    <Router>
        <Provider store={store}>
            <Header/>
        </Provider>
    </Router>
)

describe('Initial header UI', () => {
    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('Has logo', () => {
        expect(wrapper.find('.logo').length).toBe(1);
    });
    
    test('Has toggle navigation button', () => {
        expect(wrapper.find('ToggleButton').length).toBe(1);
    });
    
    test('Has nighmode button', () => {
        expect(wrapper.find('NightmodeButton').length).toBe(1);
    })
});

describe('Opening and closing navigation', () => {
    test('Opens nav when clicked on Bar icon', () => {
        expect(wrapper.find('NavBar').length).toBe(0);

        wrapper.find('FontAwesome').at(0).simulate('click');
        wrapper.update();

        expect(wrapper.find('NavBar').length).toBe(1);
    });

    test('Navigation button icon changes to close', () => {
        expect(wrapper.find('FontAwesome').at(0).prop('name')).toBe('close');
    });

    test('Closes nav when clicked on Close icon', () => {
        expect(wrapper.find('NavBar').length).toBe(1);

        wrapper.find('FontAwesome').at(0).simulate('click');
        wrapper.update();

        expect(wrapper.find('NavBar').length).toBe(0);
    });

    test('Navigation button icon changes to bars', () => {
        expect(wrapper.find('FontAwesome').at(0).prop('name')).toBe('bars');
    });
});

describe('Toggling nightmode', () => {
    test('Toggles nightmode when clicked', () => {
        expect(wrapper.find('.top').prop('className')).toBe('top');

        wrapper.find('NightmodeButton').simulate('click');
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('.top').prop('className')).toBe('top nightMode');
            expect(wrapper.find('svg').prop('data-icon')).toBe('sun');
            done();
        })
    });

    test('Toggles nightmode off when clicked', () => {
        // Toggle it on first
        wrapper.find('NightmodeButton').simulate('click');
        wrapper.update();

        setTimeout( () => {
            expect(wrapper.find('.top').prop('className')).toBe('top nightMode');

            // Toggle it off then
            wrapper.find('NightmodeButton').simulate('click');
            wrapper.update();

            setTimeout( () => {
                expect(wrapper.find('.top').prop('className')).toBe('top');
                expect(wrapper.find('svg').prop('data-icon')).toBe('moon');
                done();
            })
        }, 0)
    });
})
