// Link.react.test.js
import React from "react";
import Homepage from "../index";
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Home component", () => {

  it ("should render home component", () => {
    const component = shallow(<Homepage />);
    // console.log('shallow wrapper home \n\n', component);
    expect(component.getElements()).toMatchSnapshot();
  });
});
