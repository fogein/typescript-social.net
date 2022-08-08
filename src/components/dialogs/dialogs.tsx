import React from "react";
import cls from "./dialogs.module.css";
import { DialogItem } from "./dialogItem/dialogItem";
import { Message } from "./message/message";
import { DialogType, MessageType } from "../../redux/reducers/dialogsReducer";
import { DialogsInput } from "./DialogInput/DialogInput";

type PropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  sendMessage: (message: string) => void
}

export const Dialogs: React.FC<PropsType> = (props) => {


  return (
    <div className={cls.dialogs}>
      <div className={cls.dialogsItem}>
        {props.dialogs.map(({ name, id }) => {
          return <DialogItem key={id} id={id.toString()} name={name} />;
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

