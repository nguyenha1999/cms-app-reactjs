import React, { useState } from 'react'
import './App.scss'
import ReactDOM from 'react-dom';


import { Layout, Menu,Avatar, TreeSelect,  Dropdown,AutoComplete,Input }from 'antd' ;
import {
 
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined ,
  UserOutlined,
  FolderOutlined ,
  UploadOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



import Search from 'antd/lib/input/Search';
import logo from './img/Books-512.png';
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
      
      
          <Sider trigger={null} collapsible collapsed={collapsed}>
       
           <img className="logo" src={logo} width="100px" height="100px" />
        
         <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<FileOutlined />}>
          <Link to ="/document"> Document </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FolderOutlined />}>
        
        <Link to ="/procedure" >Procedure</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          
          <Link to ="/upload" >Upload </Link>
          
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background custom-head" style={ {padding: 0}}>



    

        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuUnfoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
        <AutoComplete className ="custom-tree-1"
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
      <Content
        className="site-layout-background"
        style={{
          
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Switch>
          
        <Route exact path="/document">
            <Document/>
            </Route>
            <Route path="/procedure">
            <Procedure />
            </Route>
            <Route  path="/upload">
            <Uploads/>
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
