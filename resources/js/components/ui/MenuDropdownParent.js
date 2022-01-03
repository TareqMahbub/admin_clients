import { Link } from "react-router-dom";
import MenuDropdownLi from "./MenuDropdownLi";

const MenuDropdownParent = (props) => {
    return (
        <li className="nav-item dropdown fs-4">
            <Link
                className="nav-link link-dark dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {props.children}
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <MenuDropdownLi to="/profile" id="profile">
                    Edit Profile
                </MenuDropdownLi>
                <MenuDropdownLi>
                    <hr className="dropdown-divider" />
                </MenuDropdownLi>
                <MenuDropdownLi
                    to="/under-construction"
                    id="under-construction"
                >
                    Logout
                </MenuDropdownLi>
            </ul>
        </li>
    );
};

export default MenuDropdownParent;
