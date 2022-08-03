
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/reducers/profileReducer';
import { MyPosts } from "./myPosts";
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { PostsType } from '../../../types/types';

type MapStateToPropsType = {
    posts:Array<PostsType>
    newPostText:string
}
type MapDispatchToPropsType = {
  updateNewPostText: (newText:string) => void
  addPost:() => void
}

type OwnPropsType = {
  //

}

let mapStateToProps = (state:AppStateType):MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch:any):MapDispatchToPropsType => {
  return {
    updateNewPostText: (newText:string) => {
      dispatch(updateNewPostTextActionCreator(newText));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    }
  }
}

export const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)