import axios from "axios";

export default async function login(inputs) {
    return await axios.post("/api/login", inputs, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}
