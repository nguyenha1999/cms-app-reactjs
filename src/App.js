import './App.css';
import  React from 'react';
import 'antd/dist/antd.css'

import AppHeader from './layout/header';
import AppLayout from './layout/layout';
import { Layout } from 'antd';
import AppFooter from './layout/footer';

const { Header,Content } = Layout;

function App() {
  return (
    
        <Layout className="mainLayout">
          < Header>
              <AppHeader/>
              <AppLayout/>
          </Header>
               <Content>        
                </Content>
                <AppFooter/>
           </Layout>
    
       
    );
  }


      
  
export default App;
