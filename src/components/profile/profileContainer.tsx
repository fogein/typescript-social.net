import React, { useEffect } from 'react';
import { Profile } from './profile';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProfile, getStatus } from '../../redux/reducers/profileReducer';
import { AppStateType } from '../../redux/store';


type PropsType = {}
export const ProfilePage: React.FC<PropsType> = () => {

    const dispatch = useDispatch()
    const authId = useSelector((state: AppStateType) => state.auth.id)
    const history = useHistory()
    const { userId } = useParams() as any

    const refreshProfile = () => {
        let id = userId
        if (!id) {
            id = authId
            if (!id) {
                history.push("/login")
            }
        }
        dispatch(getProfile(id))
        dispatch(getStatus(id))
    }
    useEffect(() => {
        refreshProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])
    


    return (
        <Profile isOwner={!userId} />
    )
}