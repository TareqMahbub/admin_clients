import { NavLink } from "react-bootstrap";

const MenuDropdownLi = (props) => {
    return "to" in props ? (
        <li className="fs-5">
            <NavLink className="dropdown-item" to={props.to}>
                {props.children}
            </NavLink>
        </li>
    ) : (
        <li className="fs-5">{props.children}</li>
    );
};

export default MenuDropdownLi;
