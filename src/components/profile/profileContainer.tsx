import React from 'react';
import { Profile } from './profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile, getStatus, updateStatus, savePhoto } from '../../redux/reducers/profileReducer';
import { compose } from 'redux';
import { ProfileType, RouteComponentProps } from '../../types/types';
import { AppStateType } from '../../redux/store';

type MapStateToPropsType = {
    profile:ProfileType | null
    status:string
}
type MapDispatchToPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
}
type OwnPropsType = {
   
    savePhoto:(file:any) => void
    updateStatus:(status:string) => void
    authId:number

}
type MatchParams = {
    userId:number
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType & RouteComponentProps<MatchParams>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    };
    componentDidUpdate(prevProps:PropsType, prevState:AppStateType, snapshot:any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile isOwner={!this.props.match.params.userId} profile={this.props.profile} updateStatus={this.props.updateStatus} status={this.props.status} savePhoto={this.props.savePhoto} />
        );
    }
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}

export const ProfileContainerComponent =
    compose<React.Component>(
        connect
        (mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto }),
        withRouter,
    )(ProfileContainer) 
