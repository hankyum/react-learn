import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

export default class extends Component {

  render() {
    return (
      <Header className="header">
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link exact to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/hello">Hello Demo</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/todo">Flux Demo</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/counter/0">Redux Counter Demo</Link></Menu.Item>
        </Menu>
      </Header>
    )
  }
}