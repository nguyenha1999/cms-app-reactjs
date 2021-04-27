import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeOutlined, BookOutlined  , FileDoneOutlined ,UploadOutlined ,UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



function AppLayout (){
  return (
    
  <Layout>
        <Sider width={200} className="site-layout-background">
           <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
        > 
             <SubMenu key="sub1" icon={<HomeOutlined /> } title="Home">
            <Menu.Item key="1">Sign in </Menu.Item>
            <Menu.Item key="2">Sign out</Menu.Item>
           
            </SubMenu>
            <SubMenu key="sub2" icon={<BookOutlined /> } title="Books">
            <Menu.Item key="5">All Book</Menu.Item>
            <Menu.Item key="6">Add Book</Menu.Item>
            <Menu.Item key="7">Serries</Menu.Item>
            <Menu.Item key="8">Author</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<FileDoneOutlined />} title="Issue Book">
            <Menu.Item key="9">Requester book</Menu.Item>
            
          </SubMenu>
          <SubMenu key="sub4" icon={<UserOutlined /> } title="User">
            <Menu.Item key="12">View Infor</Menu.Item>
            </SubMenu>
          
          
            <SubMenu key="sub5" icon={<UploadOutlined /> } title="Upload">
            <Menu.Item key="12">Upload Now</Menu.Item>
          
          </SubMenu>
        </Menu>
        </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>

      </Layout>
    </Layout>
  

    
  );


}
export default AppLayout ;