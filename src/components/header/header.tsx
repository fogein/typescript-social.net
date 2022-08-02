import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './header.module.css'
import { logout } from '../../redux/reducers/authReducer';
import { AppStateType } from '../../redux/store';

type PropsType = {

}

export const Header:React.FC<PropsType> = (props) => {
  const dispatch = useDispatch()
  const login = useSelector((state:AppStateType) => state.auth.login)
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

 
  const logoutBut = () => {
    dispatch(logout())
  } 

  return ( 
    <header className={cls.header}>
      <span>LOGO</span>
      <div>
      {
        isAuth ? login : <Link to={'/login'}> Login </Link>
      }
      {
        isAuth ? <button type='button' onClick={logoutBut}>logout</button> : null
      }
      </div>
    </header>
  );
}

