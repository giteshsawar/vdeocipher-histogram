// Link.react.test.js
import React from "react";
import DataSet from "../index";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Dataset testing", () => {
  let component;
  beforeEach(() => {
    component = shallow(<DataSet />);
  });

  it("snapshot match", () => {
    expect(component).toMatchSnapshot();
  });

  it("find button to fetch data", () => {
    expect(component.find("#fetch_data"));
  });

  it("loading data on click", () => {
    window.alert = () => {};
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    component.find("#fetch_data").simulate("click");
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(component.find("#laoding_msg"));
  });
});
