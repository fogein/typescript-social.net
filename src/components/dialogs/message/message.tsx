import React from "react";
import cls from "../dialogs.module.css";


type PropsType = {
  message: string
}

export const Message: React.FC<PropsType> = (props) => {
  return (
    <>
      <div className={cls.message}>{props.message}</div>
    </>
  );
};
