import { followingUser } from "./usersReducer";
import { usersApi } from './../../api/usersApi';
import { ResponseTypesDefault, ResultCodesEnum } from "../../api/ApiTypes";
jest.mock('./../../api/usersApi')

const usersApiMock = usersApi

const result: ResponseTypesDefault = {
  data: {},
  messages: [],
  resultCode: ResultCodesEnum.Success
}
// @ts-ignore
usersApiMock.follow.mockReturnValue(result)

test("thunk", () => {
  const thunk = followingUser(1);
  const dispatchMock = jest.fn();

  // @ts-ignore
  thunk(dispatchMock);
  expect(dispatchMock).toBeCalledTimes(2);
});
