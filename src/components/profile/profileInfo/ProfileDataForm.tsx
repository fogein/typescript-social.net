import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../redux/reducers/profileReducer'
import { ContactsType, ProfileType } from '../../../types/types';
import cls from './profileInfo.module.css'

type PropsType = {
  setEditMode: Dispatch<SetStateAction<boolean>>
  profile: ProfileType
}


export const ProfileDataForm: React.FC<PropsType> = ({ setEditMode, profile }) => {

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<ProfileType>();
  const onSubmit = (data:ProfileType) => {
    dispatch(updateProfile(data, profile.userId))
    setEditMode(false)


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
          <input defaultValue={profile.contacts[key as keyof ContactsType]} placeholder={key} {...register(`contacts.${key as keyof ContactsType}`)} />
        </div>
      })}
      </div>
      <button type={'submit'} className={cls.editButton}>save</button>
    </form>

  </div>

}