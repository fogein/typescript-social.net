import React from "react";
import cls from "./dialogs.module.css";
import { DialogItem } from "./dialogItem/dialogItem";
import { Message } from "./message/message";
import { actions } from "../../redux/reducers/dialogsReducer";
import { DialogsInput } from "./DialogInput/DialogInput";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";

type PropsType = {}

export const Dialogs: React.FC<PropsType> = (props) => {

  const dispatch = useDispatch()
  const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs)
  const messages = useSelector((state: AppStateType) => state.dialogsPage.messages)

  const sendMessage = (message: string) => {
    dispatch(actions.sendMessageCreator(message));
  }
  return (
    <div className={cls.dialogs}>
      <div className={cls.dialogsItem}>
        {dialogs.map(({ name, id }) => {
          return <DialogItem key={id} id={id.toString()} name={name} />;
        })}
      </div>
      <div className={cls.messages}>
        {messages.map(({ message, id }) => {
          return <Message key={id} message={message} />;
        })}
        <div>
          <DialogsInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

