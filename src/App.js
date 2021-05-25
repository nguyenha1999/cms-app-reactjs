/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './App.scss'
// import ReactDOM from 'react-dom';


import { Layout, Menu, Avatar, TreeSelect, Dropdown, AutoComplete, Input, Affix } from 'antd';
import {

  MenuUnfoldOutlined,
  // MenuFoldOutlined,
  FileOutlined,
  UserOutlined,
  FolderOutlined,
  UploadOutlined,
  HomeOutlined,
  // MenuOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



// import Search from 'antd/lib/input/Search';
import logo from './img/Books-512.png';
import Home from './component/Home/home';
import Document from './component/Document/document';
import Uploads from './component/Upload/upload';
import Procedure from './component/Procedure/procedure';

const { Header, Sider, Content } = Layout;


function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);

  };
  const { TreeNode } = TreeSelect;

  const [value, setValue] = useState(undefined);
  const onChange = () => {
    setValue(value);
  };
  const [top] = useState(0);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: 'right',
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >

      </a>
    </span>
  );

  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });

  const options = [
    {
      label: renderTitle('Libraries'),
      options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
      label: renderTitle('Solutions'),
      options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
      label: renderTitle('Articles'),
      options: [renderItem('AntDesign design language', 100000)],
    },
  ];


  return (
    <div className="App">
      <Router>

        <Layout>
          <Affix offsetTop={top}>

            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="side-layout-children">

                <img className="logo" src={logo} width="100px" height="100px" />

                {/* <a className="librari"  href = "#">Library</a> */}

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/home"> Home </Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<FileOutlined />}>
                    <Link to="/document"> Document </Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<FolderOutlined />}>

                    <Link to="/procedure" >Procedure</Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<UploadOutlined />}>

                    <Link to="/upload" >Upload </Link>

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
                <AutoComplete className="custom-tree-1"
                  dropdownClassName="certain-category-search-dropdown"
                  dropdownMatchSelectWidth={500}
                  style={{
                    width: 250,
                  }}
                  options={options}
                >
                  <Input.Search size="large" placeholder="Search" />
                </AutoComplete>

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
              }}
            >
              <Switch>


                <Route exact path="/home">
                  <Home />
                  </Route>
                  <Route exact path="/document">
                    <Document />
                  </Route>
                  <Route path="/procedure">
                    <Procedure />
                  </Route>
                  <Route path="/upload">
                    <Uploads />
                  </Route>




              </Switch>


            </Content>

          </Layout>
          </Layout>

      </Router>
    </div>
  );
}

export default App;
