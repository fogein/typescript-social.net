import React from 'react';
import cls from './post.module.css';


export const Post = ({postText}) => {
  return (
    <>
      <div className={cls.post}>
        <span>{postText}</span>
      </div>
    </>
  );
}