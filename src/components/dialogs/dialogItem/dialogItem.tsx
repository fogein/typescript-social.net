import React from "react";
import cls from "./dialogItem.module.css";
import { Link } from "react-router-dom";

type PropsType = {
  id: any
  name: string
}

export const DialogItem: React.FC<PropsType> = (props) => {

  return (
    <>
      <Link to={props.id} className={cls.dialog}>
        {props.name}
      </Link>
    </>
  );
};
