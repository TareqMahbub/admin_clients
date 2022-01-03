import axios from "axios";

export default async function register(inputs) {
    return await axios.post("/api/register", inputs, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
}
