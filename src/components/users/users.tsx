import React from 'react';
import cls from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import { Link } from 'react-router-dom';
import { Pagination } from '../paginator/pagination';
import { UsersSearchForm } from './users-search-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalUsersCount, getUsers, getFollowingProgress } from './usersSelector';
import { FilterType, followingUser, getUsersThunkCreator, unfollowingUser } from './../../redux/reducers/usersReducer';


type UserType = {
  currentPage:number
  pageSize:number
  filter:FilterType
}

export const Users: React.FC<UserType> = ({currentPage,pageSize,filter}) => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const users = useSelector(getUsers)
  const followingProgress = useSelector(getFollowingProgress)
  const dispatch = useDispatch()



  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollowingUser(userId))
  }
  const follow = (userId: number) => {
    dispatch(followingUser(userId))
  }

  return (
    <>
      <UsersSearchForm
        pageSize={pageSize}
        totalUsersCount={totalUsersCount}
      />
      <Pagination
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
      />
      {
        users.map(({ id, photos, followed, name, status }) => {
          return <div key={id} className={cls.container}>

            <div className={cls.imageButton}>
              <Link to={`../profile/${id}`}>
                <img className={cls.avaImage} src={photos.small != null ? photos.small : userPhoto} alt="avatar" />
              </Link>

              {followed

                ?

                <button disabled={followingProgress.some(n => n === id)} onClick={() => unfollow(id)}>unfollow</button>

                :

                <button disabled={followingProgress.some(n => n === id)} onClick={() => follow(id)}>follow</button>}


            </div>

            <div className={cls.desriptionContainer}>
              <div className={cls.nameStatus}>
                <span>{name}</span>
                <span>{status}</span>
              </div>
              <div className={cls.location}>
                <span>{'location.country'}</span>,
                <span>{'location.city'}</span>
              </div>
            </div>
          </div>
        })
      }
    </>
  )
}
