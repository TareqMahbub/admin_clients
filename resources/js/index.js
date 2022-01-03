require("./bootstrap");
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import App from "./app";

if (document.getElementById("main")) {
    ReactDOM.render(<App />, document.getElementById("main"));
}
