import { Button } from "antd";
import React from "react";
import { PostsType } from "../../../types/types";
import { Post } from "../post/post";
import cls from "./myPosts.module.css";
import { Input } from 'antd';

const { TextArea } = Input;

type PropsType = {
  updateNewPostText: (newText:string) => void
  addPost:() => void
  newPostText:string
  posts:Array<PostsType>
}

export const MyPosts:React.FC<PropsType> = (props) => {

  const changeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <TextArea value={props.newPostText} showCount maxLength={100} style={{ height: 100 ,marginBottom:20}} onChange={changeText} />
        <Button type='primary' onClick={handleChange}>addPost</Button>
      </form>
      {props.posts.map(({ message,id }) => {
        return <Post key={id} postText={message} />;
      })}
    </>
  );
};
