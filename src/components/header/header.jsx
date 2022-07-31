import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './header.module.css'
import { logout } from './../../redux/reducers/authReducer';

export const Header = (props) => {
  const dispatch = useDispatch()
  const login = useSelector((state) => state.auth.login)
  const isAuth = useSelector((state) => state.auth.isAuth)

 
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

