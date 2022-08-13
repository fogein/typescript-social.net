 import { actions, InitialStateType, usersReducer } from "./usersReducer"


let state:InitialStateType

// beforeEach(() => {
//   state = {
//     users: [
//       {id:0,name:'Vlad 0',followed:false,status:'status 0',photos:{small:null,large:null}},
//       {id:1,name:'Vlad 1',followed:false,status:'status 1',photos:{small:null,large:null}},
//       {id:2,name:'Vlad 2',followed:true,status:'status 2',photos:{small:null,large:null}},
//       {id:3,name:'Vlad 3',followed:true,status:'status 3',photos:{small:null,large:null}},
//     ] ,
//     totalUsersCount: 21,
//     pageSize: 5,
//     currentPage: 1,
//     isFetching: false,
//     followingProgress: [] ,
//   };
// })

// test("follow success", () => {


// const newState = usersReducer(state,actions.follow(1))
// expect(newState.users[0].followed).toBeFalsy()
// expect(newState.users[1].followed).toBeTruthy()

// })
// test("unfollow success", () => {


// const newState = usersReducer(state,actions.unfollow(3))
// expect(newState.users[2].followed).toBeTruthy()
// expect(newState.users[3].followed).toBeFalsy()

// })
