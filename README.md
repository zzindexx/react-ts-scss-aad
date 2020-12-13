# ReactJS application template with Azure AD authentication
A simple React application with support of Azure AD authentication (without MSAL.js) and GraphAPI calling.
Azure AD authentication is made using [implicit authentication flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow).

## What is used
* ReactJS
* react-router-dom
* TypeScript
* Scss
* Webpack
* Webpack dev server

## How to use
* Clone the repository or download it as zip
* Install dependencies
```
npm install
```
* Create App Registration in Azure Active Directory
* Update authSettings.ts file with your trnant and application parameters
* To test
```
npm start
```
* To build
```
npm run build
```
* To publish release version
```
npm run publish
```

## Create application registration in Azure AD
To add authentication capabilities to SPA application, an application registration should be created in Azure Active Directory.  
* Create a new App Registration on Azure Portal
* Add needed API permissions for your app
* Navigate to Authentication page for the App Registration
* Add "Single-page application" as a platform
* Add your site URL as a redirect URL
* In the Implicit Grant section check "Access tokens" and "ID tokens"
* Update following values in authSettings.ts:
    * tenantId - your tenant id
    * clientId - id of your app registration
    * redirectUrl - url of your site

![Azure AD Application config](https://github.com/zzindexx/react-ts-scss-aad/docs/AAD-App_auth.png)

