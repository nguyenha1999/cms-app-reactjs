import React from 'react';
import {Layout } from 'antd'
import './layout.css'

const { Footer } = Layout;
const FooterComponent = () => {
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </>
  )
}

export default React.memo(FooterComponent);