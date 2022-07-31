import React from "react";
import cls from "../dialogs.module.css";

export const Message = (props) => {
  return (
    <>
      <div className={cls.message}>{props.message}</div>
    </>
  );
};
