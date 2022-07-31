
const sendMessage = 'SEND_MESSAGE'

let initialState = {
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

}
export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case sendMessage:
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: action.message }]
      }
    default:
      return state;
  }
}


export const sendMessageCreator = (message) => {
  return {
    type: sendMessage,
    message
  };
};