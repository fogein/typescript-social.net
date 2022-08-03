import React from 'react';
import cls from './profile.module.css';
import { ProfileInfo } from './profileInfo/profileInfo';
import { MyPostsContainer } from './myPosts/myPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    savePhoto:(file:any) => void
    updateStatus:(status:string) => void
    profile:ProfileType | null
    status:string
    isOwner:boolean
}

export const Profile:React.FC<PropsType> = (props) => {
    return (
        <main className={cls.main} >
            <ProfileInfo isOwner={props.isOwner} savePhoto={props.savePhoto} updateStatus={props.updateStatus} status={props.status} profile={props.profile}/>
            <MyPostsContainer/>
        </main>
    );
}