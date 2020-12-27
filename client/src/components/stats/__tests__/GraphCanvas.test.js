import React from 'react';
import GraphCanvas from '../GraphCanvas';
import { shallow } from 'enzyme';
import { testLogs } from '../../../../__mocks__/logsMock';

const wrapper = shallow(<GraphCanvas logs={testLogs}/>);

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});