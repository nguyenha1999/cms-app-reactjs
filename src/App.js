/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './App.scss'
import './img/base.css'
import { Layout, Menu, Avatar, TreeSelect, Dropdown, AutoComplete, Input, Affix } from 'antd';
import {
  MenuUnfoldOutlined,
  FileOutlined,
  UserOutlined,
  FolderOutlined,
  HomeOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './img/Books-512.png';
import Home from './page/Home';
import Document from './page/Document';
import Login from './page/Login';
import Users from './page/User';
import Procedure from './page/Procedure';
import Profile from './page/Profile'
const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed)};
  const [value, setValue] = useState(undefined);
  const onChange = () => {
    setValue(value)};
  const [top] = useState(0);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Hồ Sơ</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <div className="App">
      <Router>
        <Layout>
          <Affix offsetTop={top}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="side-layout-children">
                <img className="logo" src={logo} width="100px" height="100px" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  {/* <Link to ="/login"/> */}
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/"> Trang Chủ </Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<FileOutlined />}>
                    <Link to="/document"> Tài Liệu </Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<FolderOutlined />}>
                    <Link to="/procedure" > Quy Trình </Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<UserOutlined />}>
                    <Link to="/user" > Người Dùng </Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<SettingOutlined />}>
                    <Link to="/profile" > Hồ Sơ </Link>
                  </Menu.Item>
                </Menu>
              </div>
            </Sider>
          </Affix>
          <Layout className="site-layout">
            <Affix offsetTop={top}>
              <Header className="site-layout-background custom-head" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuUnfoldOutlined, {
                  className: 'trigger',
                  onClick: toggle,
                })}
                <Dropdown overlay={menu} trigger={['click']}>
                  <Avatar className="custom-icon"
                    style={{
                      backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
              </Header>
            </Affix>
            <Content
              className="site-layout-background"
              style={{

                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}>
              <Switch>
                
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route  path="/document">
                  <Document />
                </Route>
                <Route path="/procedure">
                  <Procedure />
                </Route>
                <Route path="/user">
                  <Users/>
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>CMS App ©2021 Created by Lê Ngọc Hà</Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
