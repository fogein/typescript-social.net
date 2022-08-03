import React from "react";
import { PostsType } from "../../../types/types";
import { Post } from "../post/post";
import cls from "./myPosts.module.css";

type PropsType = {
  updateNewPostText: (newText:string) => void
  addPost:() => void
  newPostText:string
  posts:Array<PostsType>
}

export const MyPosts:React.FC<PropsType> = (props) => {

  const changeText = (e:React.ChangeEvent<HTMLInputElement>) => {
    let newText = e.target.value;
    props.updateNewPostText(newText)
  };

  const handleChange = (e:React.MouseEvent) => {
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
