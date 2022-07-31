import React from "react";
import cls from "./dialogItem.module.css";
import { Link } from "react-router-dom";

export const DialogItem = (props) => {
  
  return (
    <>
      <Link to={props.id} className={cls.dialog}>
        {props.name}
      </Link>
    </>
  );
};
