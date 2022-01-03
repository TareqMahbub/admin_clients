import axios from "axios";
import Auth from "../../../auth";

export default async function updateClient(id, inputs) {
    const token_parts = Auth.getToken().split("|");
    if (token_parts.length == 0) return;

    return await axios.post(`/api/clients/${id}/update`, inputs, {
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            "X-ACCESS-KEY": token_parts[0],
            Authorization: `Basic ` + token_parts[1],
        },
    });
}
