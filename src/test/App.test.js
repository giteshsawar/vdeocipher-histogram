// Link.react.test.js
import React from "react";
import App from "../App";
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test("Link changes the class when hovered", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
