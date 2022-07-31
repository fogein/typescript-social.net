import { profileReducer } from './profileReducer';
import { dialogsReducer } from '../redux/reducers/dialogsReducer';

export let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "hi its post", likesCount: 12 },
        { id: 2, message: "hi", likesCount: 32 },
        { id: 3, message: "hi it third post", likesCount: 31 },
      ],
      newPostText: ''
    },
    dialogsPage: {
      dialogs: [
        { id: "1", name: "Dima" },
        { id: "2", name: "Oleg" },
        { id: "3", name: "Sasha" },
        { id: "4", name: "Vlad" },
      ],
      messages: [
        { id: 1, message: "yo" },
        { id: 2, message: "Hi" },
        { id: 3, message: "How a y" },
        { id: 4, message: "yo" },
      ],
      newMessageText: ''
    }
  },

  getState() {
    return this._state
  },

  _rerender() { },

  updateTree(observer) {
    this._rerender = observer
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._rerender(this._state);
  }
}
// action


// action

