import React from "react";
import cls from "./dialogs.module.css";
import { DialogItem } from "./dialogItem/dialogItem";
import { Message } from "./message/message";
import { useState } from "react";


export const Dialogs = (props) => {


  return (
    <div className={cls.dialogs}>
      <div className={cls.dialogsItem}>
        {props.dialogs.map(({ name, id }) => {
          return <DialogItem key={id} id={id} name={name} />;
        })}
      </div>
      <div className={cls.messages}>
        {props.messages.map(({ message, id }) => {
          return <Message key={id} message={message} />;
        })}
        <div>
          <DialogsInput sendMessage={props.sendMessage} />
        </div>
      </div>
    </div>
  );
};

const DialogsInput = (props) => {
  const [message, setMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    props.sendMessage(message)
    setMessage('')

  }
  const onChangeHandler = (e) => {
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
