import { NavLink } from "react-router-dom";

const MenuLi = (props) => {
    return "to" in props ? (
        <li className="nav-item fs-4">
            <NavLink className="nav-link" aria-current="page" to={props.to}>
                {props.children}
            </NavLink>
        </li>
    ) : (
        <li className="nav-item fs-4">{props.children}</li>
    );
};

export default MenuLi;
