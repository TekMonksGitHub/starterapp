/* 
 * (C) 2018 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
import {xhr} from "/framework/js/xhr.mjs";
import {application} from "./application.mjs";
import {session} from "/framework/js/session.mjs";
import {securityguard} from "/framework/js/securityguard.mjs";

async function signin(id, pass) {
    let pwph = `${id} ${pass}`;
        
    return new Promise(async (resolve, _reject) => {
        await $$.require(`${APP_CONSTANTS.APP_PATH}/3p/bcrypt.js`);
        let bcrypt = dcodeIO.bcrypt;
        bcrypt.hash(pwph, APP_CONSTANTS.BCRYPT_SALT, async (_err, hash) => {
            let req = {}; req[APP_CONSTANTS.USERID] = hash;
            let resp = await xhr.rest(APP_CONSTANTS.API_LOGIN, "GET", req);
            if (resp.result) {session.set(APP_CONSTANTS.USERID, hash); securityguard.setCurrentRole(APP_CONSTANTS.USER_ROLE);}
            resolve(resp.result);
        });
    });
}

async function register(regid, pass) {
    let pwph = `${regid} ${pass}`;

    return new Promise(async (resolve, _reject) => {
        await $$.require(`${APP_CONSTANTS.APP_PATH}/3p/bcrypt.js`);
        let bcrypt = dcodeIO.bcrypt;
        bcrypt.hash(pwph, APP_CONSTANTS.BCRYPT_SALT, async (_err, hash) => {
            let req = {}; req[APP_CONSTANTS.USERID] = hash; req["name"] = regid;
            let resp = await xhr.rest(APP_CONSTANTS.API_REGISTER, "POST", req);
            if (resp.result) {session.set(APP_CONSTANTS.USERID, hash); securityguard.setCurrentRole(APP_CONSTANTS.USER_ROLE);}
            resolve(resp.result);
        });
    });
}

function logout(){
    let savedLang = session.get($$.MONKSHU_CONSTANTS.LANG_ID);     // save current session langauge, as we are about to destory the session
	session.destroy(); securityguard.setCurrentRole(APP_CONSTANTS.GUEST_ROLE);
	session.set($$.MONKSHU_CONSTANTS.LANG_ID, savedLang);   // restore the session language from the saved one
	application.main();
}

export const loginmanager = {signin, register, logout}