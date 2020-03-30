import React from "react";
import { create } from "react-test-renderer";
import App from "./content";

test("App component", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
