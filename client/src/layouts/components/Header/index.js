import {
    Layout, Menu, Avatar,
    Dropdown, Affix
} from 'antd';
import React, { useState } from 'react';
import {
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userLogout } from '../../../store/actions/User';
import { useSelector } from 'react-redux';

export default function Header(props) {

    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(state => state.user.user);
    const { Header } = Layout;
    const [top] = useState(0);

    const toogleSidebar = () => {
        if (props.setToogleSidebar) {
            props.setToogleSidebar();
        }
    }

    const handleLogout = () => {
        dispatch(userLogout())
        history.push('/login');
    }

    const menu = (
        <Menu style={{ width: 220 }} >
            <Menu.Item key="0" >
                <Link to="/profile">Hồ sơ</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={handleLogout}>Đăng xuất</Menu.Item>
        </Menu>
    );
    return (
        <Affix offsetTop={top}>
            <Header className="site-layout-background custom-head"
                style={{ padding: 0 }}>
                {
                    React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuUnfoldOutlined, {
                        className: 'trigger',
                        onClick: toogleSidebar,
                    })
                }
                <Dropdown overlay={menu}
                    trigger={['click']}>
                    <Avatar className="custom-icon"
                        style={{
                            backgroundColor: '#00a2ae',
                        }}
                    >
                        {user?.lastName && user.lastName[0]?.toUpperCase()}
                    </Avatar>
                </Dropdown>

            </Header>
        </Affix>
    )
}
