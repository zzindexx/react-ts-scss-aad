import * as React from "react";
import { NavBar } from './NavBar/NavBar';
import { Main } from "./Main/Main";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { authSettings } from './../authSettings';
import { JwtHelper } from "../classes/JwtHelper";
import { IAppState, AppUserContext, initialState } from "../classes/state/IAppState";
import { AboutMe } from "./AboutMe/AboutMe";
import { HashTable, parseQueryString } from "../classes/Helpers";



export const App: React.FunctionComponent = () => {
    let params: HashTable<string>;

    const [appState, setAppState] = React.useState<IAppState>(initialState);
    React.useEffect(() => { 
        const access_token = window.localStorage.getItem("access_token");

        if (access_token !== null) {
            const jwtHelper = new JwtHelper();
            const parsedToken = jwtHelper.decodeToken(access_token);
            const expiryTime = new Date(parsedToken.exp * 1000);
            const now = new Date();
            if (now > expiryTime) {
                LogOut();
            } else {
                setAppState({
                    user: {
                        isUserAuthenticated: true,
                        userName: parsedToken.upn,
                        userDisplayName: parsedToken.name
                    }
                });
            }
        } else {
            params = parseQueryString(location.hash);
            if (params['id_token'] != null) {
                window.localStorage.setItem('id_token', params['id_token']);
                window.location.href = `https://login.microsoftonline.com/${authSettings.tenantId}` +
                    `/oauth2/authorize?response_type=token&client_id=${authSettings.clientId}` +
                    `&resource=https://graph.microsoft.com` +
                    `&redirect_uri=${encodeURIComponent(window.location.origin)}` +
                    `&prompt=none&state=${params['state']}&nonce=SomeNonce`;
            } else if (params['access_token'] != null) {
                window.localStorage.setItem('access_token', params['access_token']);
                window.location.href = params['state'];
            } else {
                LogIn();
            }
        }
    }, []);

    const LogIn = () => {
        window.location.href = `https://login.microsoftonline.com/${authSettings.tenantId}/` +
        `oauth2/authorize?response_type=id_token&` +
        `client_id=${authSettings.clientId}` +
        `&redirect_uri=${encodeURIComponent(window.location.origin)}` +
        `&state=/&nonce=SomeNonce`;
    };

    const LogOut = () => {
        window.localStorage.removeItem("id_token");
        window.localStorage.removeItem("access_token");
        window.location.href = "/";
    }

    return <React.Fragment>
        <AppUserContext.Provider value={appState.user}>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route path="/about">
                        <AboutMe />
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AppUserContext.Provider>
    </React.Fragment>;
}