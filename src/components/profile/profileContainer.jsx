import React from 'react';
import { Profile } from './profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProfile, getStatus, updateStatus, savePhoto } from './../../redux/reducers/profileReducer';
import { compose } from 'redux';



class ProfileContainer extends React.Component {
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
    componentDidUpdate(prevProps, prevState, snapshot) {
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

const mapStateToProps = (state) => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}

export const ProfileContainerComponent =
    compose(
        connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto }),
        withRouter,
    )(ProfileContainer) 
