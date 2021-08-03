import React, { useState, Fragment, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom';
import {
    Layout
} from 'antd';
import Routers from './../routers';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/Sidebar";
import { useSelector } from 'react-redux';

const Layouts = () => {

    const history = useHistory();
    const login = useSelector(state => state.user.login);
    const path = window.location.pathname;
    useEffect(() => {
        if (!login && path != "/register") {
            history.push('/login')
        }
    }, []);

    const { Content } = Layout;
    const routes = Object.values(Routers);
    const [collapsed, setCollapsed] = useState(false);

    const setToogleSidebar = () => {
        setCollapsed(!collapsed);
    }

    const renderPage = ({ main, noLayout }, routeProps) => {
        main = React.createElement(main, { ...routeProps });
        if (noLayout) {
            return (
                <Fragment>
                    {main}
                </Fragment>
            )
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar
                    toogleSidebar={collapsed}
                />
                <Layout Layout className="site-layout" >
                    <Header
                        setToogleSidebar={setToogleSidebar}
                        collapsed={collapsed}
                    />
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "100vh",
                            background: "#ececec"
                        }}
                    >
                        {main}
                    </Content>
                    <Footer />
                </Layout >
            </Layout >
        )
    }
    return (
        <React.Fragment>
            <Switch>
                {
                    routes.map(({ path, exact, ...layoutProps }) => (
                        <Route key={path} path={path} exact={exact}
                            render={props => renderPage(layoutProps, props)} />
                    ))
                }
            </Switch>
        </React.Fragment>
    )
}
export default Layouts;