import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import MenuLi from "./../ui/MenuLi";
import Logo from "./../ui/Logo";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Auth from "./../../auth";
import logoutAdmin from "../api/admin/logout";
import { AuthContext } from "../../app";

function Header() {
    const navigate = useNavigate();
    const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

    const location = useLocation();
    useEffect(async () => {
        setAuthenticatedUser(
            Auth.get("components/layout/Header.js - useEffect")
        );
    }, [location]);

    function handleLogout() {
        if (authenticatedUser) {
            logoutAdmin()
                .then(function (response) {
                    console.log("Logout successful");
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
                            message:
                                "Logout successful! You can login back anytime",
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
                        {!authenticatedUser && (
                            <MenuLi to="/register">Register</MenuLi>
                        )}

                        {!authenticatedUser && (
                            <MenuLi to="/login">Login</MenuLi>
                        )}

                        {authenticatedUser && (
                            <MenuLi to="/clients">Clients</MenuLi>
                        )}

                        {authenticatedUser && (
                            <NavDropdown
                                title={authenticatedUser}
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
