import React from 'react';
import cls from './profile.module.css';
import { ProfileInfo } from './profileInfo/profileInfo';
import { MyPostsContainer } from './myPosts/myPostsContainer';



export const Profile = (props) => {
    return (
        <main className={cls.main} >
            <ProfileInfo isOwner={props.isOwner} savePhoto={props.savePhoto} updateStatus={props.updateStatus} status={props.status} profile={props.profile}/>
            <MyPostsContainer/>
        </main>
    );
}