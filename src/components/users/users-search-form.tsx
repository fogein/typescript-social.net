import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, getUsersThunkCreator } from "../../redux/reducers/usersReducer";
import { AppStateType } from "../../redux/store";


type PropsType = {
  totalUsersCount: number
  pageSize: number

}

export const UsersSearchForm: React.FC<PropsType> = ({ pageSize }) => {
 
  const filterFriend = useSelector((state:AppStateType) => state.usersPage.filter.friend)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<FilterType>();
  const onSubmit = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter))
  }


  return <div >
    <form style={{display:'flex'}} onSubmit={handleSubmit(onSubmit)}>
      <input style={{marginRight:10}} placeholder="Find users" {...register("term")} />

      <select style={{marginRight:10}} defaultValue={String(filterFriend)} {...register("friend")}>
        <option value={'null'}>All</option>
        <option value={'true'}>Only followed</option>
        <option value={'false'}>Only unfollowed</option>
      </select>

      <button>Find</button>
    </form>

  </div>

}