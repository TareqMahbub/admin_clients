import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import MenuLi from "./../ui/MenuLi";
import Logo from "./../ui/Logo";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Auth from "./../../auth";
import logoutAdmin from "../api/admin/logout";
import { AuthContext } from "../../app";

function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const location = useLocation();
    useEffect(async () => {
        setIsAuthenticated(
            Auth.isAuthenticated("components/layout/Header.js - useEffect")
        );
    }, [location]);

    function handleLogout() {
        if (isAuthenticated) {
            logoutAdmin()
                .then(function (response) {
                    navigate("/login", {
                        state: {
                            variant: "success",
                            message:
                                "Logout successful! You can login back anytime",
                        },
                    });
                })
                .catch(function (error) {
                    console.log("Logout attempt failed");
                    if (!error.response) {
                        console.log(error.message);
                        return;
                    }
                    console.log(error.response);
                })
                .finally(function () {
                    Auth.removeToken();
                    navigate("/login", {
                        state: {
                            variant: "success",
                            message: response.data["message"],
                        },
                    });
                });
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink className="navbar-brand fs-4" to="/">
                    <Logo size="3em" /> Admin Clients
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!isAuthenticated && (
                            <MenuLi to="/register">Register</MenuLi>
                        )}

                        {!isAuthenticated && <MenuLi to="/login">Login</MenuLi>}

                        {isAuthenticated && (
                            <MenuLi to="/clients">Clients</MenuLi>
                        )}

                        {isAuthenticated && (
                            <NavDropdown
                                title="User"
                                id="basic-nav-dropdown"
                                className="fs-4"
                            >
                                {/* <MenuDropdownLi to="/profile" id="profile">
                                    Edit Profile
                                </MenuDropdownLi>

                                <MenuDropdownLi>
                                    <hr className="dropdown-divider" />
                                </MenuDropdownLi> */}

                                <li className="fs-5">
                                    <a
                                        className="dropdown-item"
                                        onClick={handleLogout}
                                        href="#"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
