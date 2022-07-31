import React from 'react';
import { Link } from 'react-router-dom';
import cls from './sideBar.module.css';

export const SideBar = () => {
    return (
        <nav className={cls.nav} >
            <ul>
                <li>
                    <Link to='/profile' exact className={cls.item}> Profile </Link>
                </li>
                <li>
                    <Link to='/dialogs' className={cls.item} > Messages </Link>
                </li>
                <li> News </li>
                <li> Music </li>
                <li>
                    <Link to='/users' className={cls.item} > Users </Link>
                </li>
                <li> Settings </li>
            </ul>
        </nav>
    );
}