import React, { lazy } from 'react';
import { BrowserRouter, Redirect, Route, } from 'react-router-dom';
import './App.css';
import { SideBar } from './components/sideBar/sideBar';
import { Login } from './components/login/login';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/header/header';
import { useEffect } from 'react';
import { initializeApp } from './redux/reducers/appReducer';
import { Preloader } from './components/preloader/preloader';
import { AppStateType } from './redux/store';


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
            <div className="appWraper" >
                <Header />
                <SideBar />
                <div className='appWraperContent' >
                    <React.Suspense fallback={<Preloader />}>
                        <Route path='/login' render={() => <Login
                        />} />
                        <Route path='/users' render={() => <UsersPage/>
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
                </div>
            </div>
        </BrowserRouter >
    );
}