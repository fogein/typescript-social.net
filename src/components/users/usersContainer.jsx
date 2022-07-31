import { connect } from 'react-redux'
import { setCurrentPage,toggleIsFollowing } from '../../redux/reducers/usersReducer';
import { getUsersThunkCreator ,followingUser,unfollowingUser} from './../../redux/reducers/usersReducer';
import React from 'react'
import { Users } from './users';
import { Preloader } from '../preloader/preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from './usersSelector';

class UsersContainer extends React.Component {

  componentDidMount() {

    this.props.getUsers(this.props.currentPage,this.props.pageSize)
   
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber,this.props.pageSize)
  }
  
  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : 
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
let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state)
  }
}
// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(follow(userId))
//     },
//     unfollow: (userId) => {
//       dispatch(unfolloc(userId))
//     },
//     setUsers: (users) => {
//       dispatch(setUsers(users))
//     },
//     setCurrentPage: (page) => {
//       dispatch(setCurrentPage(page))
//     },
//     setTotalUsersCount: (count) => {
//       dispatch(setTotalUsersCount(count))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetching(isFetching))
//     },
//   }
// }

export const UsersContainerComponent = compose(
  connect(mapStateToProps, 
  { setCurrentPage,toggleIsFollowing,getUsers: getUsersThunkCreator,followingUser,unfollowingUser}))
  (UsersContainer) 
 
