import React from 'react';
import cls from './profile.module.css';
import { ProfileInfo } from './profileInfo/profileInfo';
import { MyPostsContainer } from './myPosts/myPostsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { savePhoto, updateStatus } from '../../redux/reducers/profileReducer';

type PropsType = {
    isOwner: boolean
}

export const Profile: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const savePhotoC = (file: any) => {
        dispatch(savePhoto(file))
    }
    const updateStatusC = (status: string) => {
        dispatch(updateStatus(status))
    }

    return (
        <main className={cls.main} >
            <ProfileInfo isOwner={props.isOwner} savePhoto={savePhotoC} updateStatus={updateStatusC} status={status} profile={profile} />
            <MyPostsContainer />
        </main>
    );
}