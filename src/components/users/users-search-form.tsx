import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FilterType, getUsersThunkCreator } from "../../redux/reducers/usersReducer";

type PropsType = {
  totalUsersCount: number
  pageSize: number

}

export const UsersSearchForm: React.FC<PropsType> = ({ pageSize }) => {

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<FilterType>();
  const onSubmit = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter))
  }


  return <div >
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Find users" {...register("term")} />

      <select  {...register("friend")}>
        <option value={'null'}>All</option>
        <option value={'true'}>Only followed</option>
        <option value={'false'}>Only unfollowed</option>
      </select>

      <button>Find</button>
    </form>

  </div>

}