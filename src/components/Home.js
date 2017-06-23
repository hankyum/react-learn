import React from 'react';
import { dependencies, devDependencies } from "../../package.json";
import { Button, Row, Col } from "antd";

const listConfig = ({ title, comp }) => {
  return (<div>
      <Button>{title}</Button>
      <div>
        {Object.keys(comp).map((key) =>
          <div>{key}: <span className="version">{comp[key]}</span></div>
        )}
      </div>
    </div>
  );
};

export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>React Router App Demos With Server Side Rendering</h1>
        <ol>
          <li>Antd</li>
          <li>React15</li>
          <li>react-router v4</li>
          <li>Server side render</li>
        </ol>
        <Row>
          <Col span={6}>
            {listConfig({
              title: "Depedencies",
              comp: dependencies
            })}
          </Col>
          <Col span={6}>
            {listConfig({
              title: "Dev Dependencies",
              comp: devDependencies
            })}
          </Col>
        </Row>
      </div>
    );
  }
}