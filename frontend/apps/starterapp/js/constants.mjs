/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
const FRONTEND = "https://{{{hostname}}}";
const BACKEND = "https://{{{hostname}}}:9090";
const APP_NAME = $$.getRootAppName();
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH,
    MAIN_THTML: APP_PATH+"/main.html",
    LOGIN_THTML: APP_PATH+"/login.html",

    // Login constants
    MIN_PASS_LENGTH: 8,
    API_LOGIN: BACKEND+"/apps/starterapp/login",
    API_REGISTER: BACKEND+"/apps/starterapp/register",
    BCRYPT_SALT: "$2a$10$VFyiln/PpFyZc.ABoi4ppf",
    USERID: "id",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
    PERMISSIONS_MAP: {
        user:[APP_PATH+"/main.html", APP_PATH+"/login.html", $$.MONKSHU_CONSTANTS.ERROR_THTML], 
        guest:[APP_PATH+"/login.html", $$.MONKSHU_CONSTANTS.ERROR_HTML]
    }
}