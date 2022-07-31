import { usersApi } from "../../api/api";
const following = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";

let initialState = {
  users: [],
  totalUsersCount: 21,
  pageSize: 5,
  currentPage: 1,
  isFetching:false,
  followingProgress:[],

}
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case following:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }
          return user
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user
        })
      }

      case SET_USERS:
        return {
          ...state,
          users: [...action.users]
        }
      case  SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.currentPage
        }
      case  SET_TOTAL_USERS_COUNT:
        return {
          ...state,
          totalUsersCount: action.count
        }
      case  TOGGLE_IS_FETCHING:
        return {
          ...state,
          isFetching:action.isFetching
        }
      case  TOGGLE_IS_FOLLOWING:
        return {
          ...state,
          followingProgress:action.isFetching
          ? [...state.followingProgress, action.userId]
          :state.followingProgress.filter(id => id !== action.userId)
        }
        
    default:
      return state
  }
}

export const follow = (userId) => {
  return {
    type: following,
    userId
  };
};
export const unfollow = (userId) => {
  return {
    type: UNFOLLOW,
    userId
  };
};
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  };
};
export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  };
};
export const setTotalUsersCount = (count) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count
  };
};
export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching
  };
};
export const toggleIsFollowing = (isFetching,userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING,
    isFetching,userId
  };
};

export const getUsersThunkCreator = (currentPage,pageSize) => {
  return (dispatch) => {
  dispatch(toggleIsFetching(true))
  usersApi.getUsers(currentPage,pageSize).then(data => {
      setTimeout(() => {
        dispatch(toggleIsFetching(false))
      }, 500);
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
    });
}}
export const followingUser =(userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowing(true,userId))
    usersApi.follow(userId)
      .then(data => {
        dispatch(toggleIsFollowing(false,userId))
        if (data.resultCode === 0) {
          return dispatch(follow(userId))
        }
      })
  }
}
export const unfollowingUser =(userId) => {
  return (dispatch) => {
    dispatch(toggleIsFollowing(true,userId))
    usersApi.unfollow(userId)
      .then(data => {
        dispatch(toggleIsFollowing(false,userId))
        if (data.resultCode === 0) {
          return dispatch(unfollow(userId))
        }
      })
  }
}
