import React from "react";
import { Post } from "../post/post";
import cls from "./myPosts.module.css";

export const MyPosts = (props) => {

  const changeText = (e) => {
    let newText = e.target.value;
    props.updateNewPostText(newText)
  };

  const handleChange = (e) => {
    e.preventDefault();
    props.addPost()
  };
  return (
    <>
      <form className={cls.form}>
        <input
          onChange={changeText}
          className={cls.input}
          value={props.newPostText}
          type="text"
        />
        <button onClick={handleChange}>addPost</button>
      </form>
      {props.posts.map(({ message,id }) => {
        return <Post key={id} postText={message} />;
      })}
    </>
  );
};
