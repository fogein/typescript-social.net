
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/reducers/profileReducer';
import { MyPosts } from "./myPosts";
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (newText) => {
      dispatch(updateNewPostTextActionCreator(newText));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    }
  }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)