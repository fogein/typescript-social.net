import { connect } from "react-redux";
import { compose } from "redux";
import { DialogType, MessageType, actions } from '../../redux/reducers/dialogsReducer';
import { AppStateType } from "../../redux/store";
import { Dialogs } from "./dialogs";

type MapStateToPropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
}
type MapDispatchToPropsType = {
  sendMessage: (message: string) => void
}

type OwnPropsType = {
  //

}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  }
}
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
  return {
    sendMessage: (message: string) => {
      dispatch(actions.sendMessageCreator(message));
    }
  }
}


export const DialogsContainer =
  compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
  )(Dialogs)
