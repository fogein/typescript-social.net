"use strict";
exports.__esModule = true;
var usersReducer_1 = require("./usersReducer");
var usersApi_1 = require("./../../api/usersApi");
var ApiTypes_1 = require("../../api/ApiTypes");
jest.mock('./../../api/usersApi');
var usersApiMock = usersApi_1.usersApi;
var result = {
    data: {},
    messages: [],
    resultCode: ApiTypes_1.ResultCodesEnum.Success
};
// @ts-ignore
usersApiMock.follow.mockReturnValue(result);
test("thunk", function () {
    var thunk = usersReducer_1.followingUser(1);
    var dispatchMock = jest.fn();
    // @ts-ignore
    thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(2);
});
