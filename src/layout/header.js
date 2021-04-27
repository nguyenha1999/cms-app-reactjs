
import React from 'react';
import { Menu } from 'antd';

function AppHeader(){
  return (
    <div className="container-fluid">
      <div className="header">
      <div className ="logo" >
              <a href="http://google.com">Library</a>
          </div>
               <Menu  mode="horizontal" defaultSelectedKeys={['Home']}>
               
               <Menu.Item key="home">Home</Menu.Item>
               <Menu.Item key="libary">Library</Menu.Item>
               <Menu.Item key="author">Authors </Menu.Item>
               <Menu.Item key="contact"> Contact us</Menu.Item>
              
            </Menu>
            
      </div>
    </div>
  
   
      
    
  ); 


}


export default AppHeader;