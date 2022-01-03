import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Layout(props) {
    const { state } = useLocation();
    const alert = state && (
        <Alert variant={state.variant}>{state.message}</Alert>
    );

    return (
        <>
            <Header />
            <Container className="mt-5 fs-4">
                {state && state.message && alert}
                {props.children}
            </Container>
            <Footer />
        </>
    );
}

export default Layout;
