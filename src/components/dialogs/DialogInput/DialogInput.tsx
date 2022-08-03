import React, { useState } from "react";
import cls from "../dialogs.module.css";

type PropsType = {
  sendMessage: (message: string) => void

}

export const DialogsInput: React.FC<PropsType> = (props) => {
  const [message, setMessage] = useState('')

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.sendMessage(message)
    setMessage('')

  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value
    setMessage(text)
  }

  return (
    <form className={cls.form} onSubmit={onSubmit}>
      <input className={cls.inpur} onChange={onChangeHandler} value={message} type="text" placeholder='Enter your message' />
      <button>Send</button>
    </form>

  )
}
