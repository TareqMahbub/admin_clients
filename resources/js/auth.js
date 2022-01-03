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

    static storeUsername(username, expires_at) {
        const options = {
            path: new URL(window.location.href).hostname,
            expires: expires_at,
            sameSite: "strict",
        };

        Cookies.set("username", username, options);
    }

    static getUsername() {
        const username = Cookies.get("username") ?? "";
        return username;
    }

    static getToken() {
        return Cookies.get("token") ?? "";
    }

    static removeToken() {
        Cookies.remove("token");
        Cookies.remove("username");
    }

    static isAuthenticated(caller = "") {
        return Cookies.get("token") ? true : false;
    }

    static get(caller = "") {
        return this.getUsername();
    }
}
