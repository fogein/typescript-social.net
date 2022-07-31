import React from 'react'
import cls from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import { Link } from 'react-router-dom';
import { Pagination } from '../paginator/pagination';


export const Users = (props) => {



  return (
    <>
      <Pagination
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
        />
      {
        props.users.map(({ id, photos, followed, name, status }) => {
          return <div key={id} className={cls.container}>

            <div className={cls.imageButton}>
              <Link to={`../profile/${id}`}>
                <img className={cls.avaImage} src={photos.small != null ? photos.small : userPhoto} alt="avatar" />
              </Link>

              {followed

                ?

                <button disabled={props.followingProgress.some(n => n === id)} onClick={() => props.unfollowingUser(id)}>unfollow</button>

                :

                <button disabled={props.followingProgress.some(n => n === id)} onClick={() => props.followingUser(id)}>follow</button>}


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
