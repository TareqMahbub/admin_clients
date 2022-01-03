import axios from "axios";
import Auth from "../../../auth";

export default async function logout() {
    const token_parts = Auth.getToken().split("|");
    if (token_parts.length == 0) return;

    return await axios.post(
        "/api/logout",
        {},
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-ACCESS-KEY": token_parts[0],
                Authorization: `Basic ` + token_parts[1],
            },
        }
    );
}
