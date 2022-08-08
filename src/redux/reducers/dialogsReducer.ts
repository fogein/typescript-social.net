import { ActionTypesFromStore } from "../store";


export type DialogType = {
  id: number;
  name: string;
};
export type MessageType = {
  id: number;
  message: string;
};
type InitialStateType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};

let initialState : InitialStateType = {
  dialogs: [
    { id: 1, name: "Dima" },
    { id: 2, name: "Oleg" },
    { id: 3, name: "Sasha" },
    { id: 4, name: "Vlad" },
  ],
  messages: [
    { id: 1, message: "yo" },
    { id: 2, message: "Hi" },
    { id: 3, message: "How a y" },
    { id: 4, message: "yo" },
  ],
};
export const dialogsReducer = (
  state = initialState,
  action:ActionType
): InitialStateType => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: action.message }],
      };
    default:
      return state;
  }
};

type ActionType = ActionTypesFromStore<typeof actions>;

export const actions = {
  sendMessageCreator : (message:string) => {
    return {
      type: "SEND_MESSAGE",
      message,
    }as const;
  }
}
