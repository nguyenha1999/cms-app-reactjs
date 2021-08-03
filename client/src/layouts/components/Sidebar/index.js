import {
    Layout, Menu, Affix
} from 'antd';
import React, { useState } from 'react';
import {
    Link, useLocation
} from 'react-router-dom';
import menu from "./../../menu";

function Sidebar(props) {

    const { Sider } = Layout;
    const [top] = useState(0);
    let location = useLocation()

    return (
        <Affix offsetTop={top}>
            <Sider trigger={null} collapsible collapsed={props.toogleSidebar}>
                <div className="side-layout-children">
                    <div className="text-center">
                        <Link to="/">
                            <img className="logo"
                                src={"/Books-512.png"}
                                width="100px" height="100px" />
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline"
                        inlineCollapsed={props.toogleSidebar}
                        defaultSelectedKeys={['/']}
                        selectedKeys={[location.pathname]}>
                        {
                            menu.map((item, index) => (
                                <Menu.Item key={item.path}
                                    icon={item.icon}>
                                    <Link to={item.path}> {item.title}</Link>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                </div>

            </Sider>
        </Affix>
    )
}
export default Sidebar;
