import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { getProfile, updateProfile } from '../../../redux/reducers/profileReducer'
import cls from './profileInfo.module.css'

export const ProfileDataForm = ({ setEditMode, profile, updateStatus, status }) => {

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(updateProfile(data))
    setTimeout(() => {
      dispatch(getProfile(profile.userId))
      setEditMode(false)

    })
  }

  return <div className={cls.aboutProfile}>
    <form className={cls.editForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={cls.editInput}>
        <label htmlFor="fullName">Full Name</label>
        <input defaultValue={profile.fullName} placeholder="fullName" {...register("fullName")} />
      </div>

      <div className={cls.editInput}>
        <label>Loking for a job</label>
        <select defaultValue={profile.lookingForAJob} {...register("lookingForAJob")}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>

      <div className={cls.editInput}>
        <label htmlFor="lookingForAJobDescription">Looking for a job description</label>
        <input defaultValue={profile.lookingForAJobDescription} placeholder="lookingForAJobDescription" {...register("lookingForAJobDescription")} />
      </div>


      <div className={cls.editInput}>
        <label htmlFor="aboutMe">About me</label>
        <input defaultValue={profile.aboutMe} placeholder="aboutMe" {...register("aboutMe")} />
      </div>

      <div className={cls.contacts}>Contacts</div>
      <div>{Object.keys(profile.contacts).map(key => {
        return <div key={key} className={cls.editInput}>
          <label htmlFor={key}>{key}</label>
          <input defaultValue={profile.contacts[key]} placeholder={key} {...register(`contacts.${key}`)} />
        </div>
      })}
      </div>
      <button type={'submit'} className={cls.editButton}>save</button>
    </form>

  </div>

}