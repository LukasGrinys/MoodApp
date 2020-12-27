import React from 'react';
import DaytimeGraph from '../DaytimeGraph';
import { shallow } from 'enzyme';
import { testLogs } from '../../../../__mocks__/logsMock';

const wrapper = shallow(<DaytimeGraph logs={testLogs}/>);

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});