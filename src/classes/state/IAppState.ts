import React = require("react");

export interface IAppState {
    user: IUserState;
}

export interface IUserState {
    isUserAuthenticated: boolean;
    userName: string;
    userDisplayName: string;
}
 
export const initialState: IAppState = {
    user: {
        isUserAuthenticated: false,
        userDisplayName: "",
        userName: ""
    }
}
export const AppUserContext = React.createContext<IUserState>({userDisplayName: '', userName: '', isUserAuthenticated: false});