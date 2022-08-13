import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Users } from './users';
import { Preloader } from '../preloader/preloader';
import { getCurrentPage, getFilter, getIsFetching, getPageSize } from './usersSelector';
import { getUsersThunkCreator } from '../../redux/reducers/usersReducer';

type UsersPagePropsType = {

}
export const UsersPage: React.FC<UsersPagePropsType> = () => {

  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getFilter)
  const isFetching = useSelector(getIsFetching)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
  }, [currentPage, dispatch, filter, pageSize])
 
  return (
    <>
      {isFetching ? <Preloader /> :
        <Users currentPage={currentPage} pageSize={pageSize} filter={filter}/>
      }
    </>)
}
