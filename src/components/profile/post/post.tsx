import React from 'react';
import cls from './post.module.css';

type PropsType = {
  postText:string
}
export const Post:React.FC<PropsType> = ({postText}) => {
  return (
    <>
      <div className={cls.post}>
        <span>{postText}</span>
      </div>
    </>
  );
}