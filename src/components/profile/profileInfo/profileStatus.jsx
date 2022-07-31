import React, { useEffect, useState } from 'react'
import cls from './profileInfo.module.css'

export const ProfileStatus = ({ status, updateStatus }) => {

  const [editMode, setEditMode] = useState(false);
  const [statusText, setStatusText] = useState(status);

  useEffect(() => {
    setStatusText(status)
  }, [status]);

  const deactivateInput = () => {
    setEditMode(false)
    updateStatus(statusText)
  }
  const onChangeHandler = (e) => {
    let text = e.target.value;
    setStatusText(text)
  }


  return (
    <>
      {!editMode ?
        <span onDoubleClick={() => setEditMode(true)} className={cls.status}>Status: {status ? status : '_____'}</span>
        :
        <input onChange={onChangeHandler}
          autoFocus={true}
          onBlur={deactivateInput} type="text" value={statusText} />
      }
    </>
  )
}
