import Cookies from "js-cookie";

export default class Auth {
    static storeToken(access_token, expires_at) {
        const options = {
            path: new URL(window.location.href).hostname,
            expires: expires_at,
            sameSite: "strict",
        };

        Cookies.set("token", access_token, options);
    }

    static getToken() {
        return Cookies.get("token") ?? "";
    }

    static removeToken() {
        return Cookies.remove("token");
    }

    static isAuthenticated(caller = "") {
        //console.log(`auth check from ${caller}: ` + window.performance.now());
        return Cookies.get("token") ? true : false;
    }
}
