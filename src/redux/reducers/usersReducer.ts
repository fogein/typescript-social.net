import { usersApi } from "../../api/usersApi";
import { UsersType } from "../../types/types";
import { ActionTypesFromStore, BaseThunkType } from "../store";


let initialState = {
  users: [] as Array<UsersType>,
  totalUsersCount: 21,
  pageSize: 5,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

export const usersReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };

    case 'SET_USERS':
      return {
        ...state,
        users: [...action.users],
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'TOGGLE_IS_FOLLOWING':
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

type ActionType = ActionTypesFromStore<typeof actions>;

export const actions = {
  follow: (userId: number) => {
    return { type: 'FOLLOW', userId }as const;
  },
  unfollow: (userId: number) => {
    return { type: 'UNFOLLOW', userId }as const;
  },
  setUsers: (users: Array<UsersType>) => {
    return { type: 'SET_USERS', users }as const;
  },
  setCurrentPage: (currentPage: number) => {
    return { type: 'SET_CURRENT_PAGE', currentPage }as const;
  },
  setTotalUsersCount: (count: number) => {
    return { type: 'SET_TOTAL_USERS_COUNT', count }as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    return { type: 'TOGGLE_IS_FETCHING', isFetching }as const;
  },
  toggleIsFollowing: (isFetching: boolean, userId: number) => {
    return { type: 'TOGGLE_IS_FOLLOWING', isFetching, userId }as const;
  },
};

type ThunkType = BaseThunkType<ActionType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number):ThunkType => {
  return (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    usersApi.getUsers(currentPage, pageSize).then((data) => {
      setTimeout(() => {
        dispatch(actions.toggleIsFetching(false));
      }, 500);
      dispatch(actions.setCurrentPage(currentPage))
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
    });
  };
};
export const followingUser = (userId: number):ThunkType => {
  return (dispatch) => {
    dispatch(actions.toggleIsFollowing(true, userId));
    usersApi.follow(userId).then((data) => {
      dispatch(actions.toggleIsFollowing(false, userId));
      if (data.resultCode === 0) {
        return dispatch(actions.follow(userId));
      }
    });
  };
};
export const unfollowingUser = (userId: number):ThunkType => {
  return (dispatch) => {
    dispatch(actions.toggleIsFollowing(true, userId));
    usersApi.unfollow(userId).then((data) => {
      dispatch(actions.toggleIsFollowing(false, userId));
      if (data.resultCode === 0) {
        return dispatch(actions.unfollow(userId));
      }
    });
  };
};
