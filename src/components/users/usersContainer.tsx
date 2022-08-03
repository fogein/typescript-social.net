import { connect } from 'react-redux'
import { getUsersThunkCreator, followingUser, unfollowingUser } from '../../redux/reducers/usersReducer';
import React from 'react'
import { Users } from './users';
import { Preloader } from '../preloader/preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from './usersSelector';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../redux/store';

type MapStateToPropsType = {
  isFetching: boolean
  currentPage: number
  pageSize: number
  users: Array<UsersType>
  totalUsersCount: number
  followingProgress: Array<number>
}
type MapDispatchToPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unfollowingUser: (userId: number) => void
  followingUser: (userId: number) => void
}
type OwnPropsType = {
  onPageChanged: (pageNumber: number) => void

}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {

    this.props.getUsers(this.props.currentPage, this.props.pageSize)

  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader /> :
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          onPageChanged={this.onPageChanged}
          followingProgress={this.props.followingProgress}
          followingUser={this.props.followingUser}
          unfollowingUser={this.props.unfollowingUser}
        />
      }
    </>
  }
}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state)
  }
}

export const UsersContainerComponent = compose(
  connect<MapStateToPropsType, MapDispatchToPropsType,OwnPropsType, AppStateType>(mapStateToProps,
    {  getUsers: getUsersThunkCreator, followingUser, unfollowingUser }))
  (UsersContainer)

