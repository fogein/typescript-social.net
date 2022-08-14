import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './header.module.css'
import { logout } from '../../redux/reducers/authReducer';
import { AppStateType } from '../../redux/store';
import { Button } from 'antd';

type PropsType = {

}

export const HeaderContent:React.FC<PropsType> = (props) => {
  const dispatch = useDispatch()
  const login = useSelector((state:AppStateType) => state.auth.login)
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

 
  const logoutBut = () => {
    dispatch(logout())
  } 

  return ( 
    <div className={cls.header}>
      
      {
        isAuth ? <span>{login}</span> : <Link to={'/login'}> Login </Link>
      }
      {
        isAuth ? <Button type='link' onClick={logoutBut}>logout</Button> : null
      }
      
    </div>
  );
}

