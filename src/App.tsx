import React, { lazy } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter, Link, Redirect, Route, } from 'react-router-dom';
import './App.css';
import { Login } from './components/login/login';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContent } from './components/header/header';
import { useEffect } from 'react';
import { initializeApp } from './redux/reducers/appReducer';
import { Preloader } from './components/preloader/preloader';
import { AppStateType } from './redux/store';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Content, Footer, Sider } = Layout;



const Dialogs = lazy(() => import('./components/dialogs/dialogs').then(module => ({ default: module.Dialogs }))
);
const ProfilePage = lazy(() => import('./components/profile/profileContainer').then(module => ({ default: module.ProfilePage }))
);
const UsersPage = lazy(() => import('./components/users/usersContainer').then(module => ({ default: module.UsersPage }))
);

type PropsType = {

}

export const App: React.FC<PropsType> = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    const auth = useSelector((state: AppStateType) => state.auth.isAuth)
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    if (!initialized) {
        return <Preloader />

    }

    return (
        <BrowserRouter>
            <Layout>
                <Header className="header">
                    <HeaderContent />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}>
                                <SubMenu key={'sub1'} icon={<UserOutlined />} title='MyProfile'>
                                    <Menu.Item key={'1'}><Link to='/profile'> Profile </Link></Menu.Item>
                                    <Menu.Item key={'2'}><Link to='/dialogs'> Dialogs </Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key={'sub2'} icon={<LaptopOutlined />} title='Developers'>
                                    <Menu.Item key={'3'}><Link to='/users'> Users </Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                          
                                <React.Suspense fallback={<Preloader />}>
                                    <Route path='/login' render={() => <Login
                                    />} />
                                    <Route path='/users' render={() => <UsersPage />
                                    } />
                                    <Route path='/profile/:userId?' render={() => <ProfilePage
                                    />
                                    } />
                                    {
                                        auth ?
                                            (
                                                <>

                                                    <Route path='/dialogs/' render={() => <Dialogs
                                                    />} />

                                                </>)
                                            :
                                            <Redirect to='/login' />

                                    }
                                </React.Suspense>
                         
                        </Content>
                    </Layout>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </BrowserRouter >
    );
}