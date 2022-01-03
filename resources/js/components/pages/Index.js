import Logo from "../ui/Logo";
import { Card, Col, Row } from "react-bootstrap";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../app";

function GuestHome() {
    return (
        <>
            <Logo size="6em" />
            <br />
            <span className="fs-1">Welcome to Admin Clients</span>
            <hr /> <br />
            <Link to="/register" className="btn btn-primary btn-lg">
                Register
            </Link>
            &nbsp;&nbsp;
            <Link to="/login" className="btn btn-primary btn-lg">
                Login
            </Link>
        </>
    );
}

function AdminDashboard() {
    return (
        <>
            <Logo size="6em" />
            <br />
            <span className="fs-1">Welcome to Dashboard</span>
            <hr /> <br />
            <Link to="/clients" className="btn btn-primary btn-lg">
                My Clients
            </Link>
        </>
    );
}

function Index() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    return (
        <Layout>
            <Row className="justify-content-center">
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                            {isAuthenticated ? (
                                <AdminDashboard />
                            ) : (
                                <GuestHome />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Index;
