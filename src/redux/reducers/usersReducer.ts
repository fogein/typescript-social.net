import { Dispatch } from "redux";
import { usersApi } from "../../api/api";
import { UsersType } from "../../types/types";
import { AppStateType } from "../store";
const following = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";

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
    case following:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING:
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

type ActionType =
    FollowType
  | UnfollowType
  | SetUserType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | ToggleIsFetchingType
  | ToggleIsFollowingType;

type FollowType = {
  type: typeof following;
  userId: number;
};

export const follow = (userId: number): FollowType => {
  return {
    type: following,
    userId,
  };
};
type UnfollowType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollow = (userId: number): UnfollowType => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

type SetUserType = {
  type: typeof SET_USERS;
  users: Array<UsersType>;
};

export const setUsers = (users: Array<UsersType>): SetUserType => {
  return {
    type: SET_USERS,
    users,
  };
};

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

export const setTotalUsersCount = (count: number): SetTotalUsersCountType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count,
  };
};

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

type ToggleIsFollowingType = {
  type: typeof TOGGLE_IS_FOLLOWING;
  userId: number;
  isFetching: boolean;
};

export const toggleIsFollowing = (
  isFetching: boolean,
  userId: number
): ToggleIsFollowingType => {
  return {
    type: TOGGLE_IS_FOLLOWING,
    isFetching,
    userId,
  };
};

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionType>

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    dispatch(toggleIsFetching(true));
    usersApi.getUsers(currentPage, pageSize).then((data) => {
      setTimeout(() => {
        dispatch(toggleIsFetching(false));
      }, 500);
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };
};
export const followingUser = (userId: number) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    dispatch(toggleIsFollowing(true, userId));
    usersApi.follow(userId).then((data) => {
      dispatch(toggleIsFollowing(false, userId));
      if (data.resultCode === 0) {
        return dispatch(follow(userId));
      }
    });
  };
};
export const unfollowingUser = (userId: number) => {
  return (dispatch:DispatchType ,getState:GetStateType) => {
    dispatch(toggleIsFollowing(true, userId));
    usersApi.unfollow(userId).then((data) => {
      dispatch(toggleIsFollowing(false, userId));
      if (data.resultCode === 0) {
        return dispatch(unfollow(userId));
      }
    });
  };
};
