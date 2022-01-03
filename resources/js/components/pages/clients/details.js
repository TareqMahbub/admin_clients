import Layout from "../../layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import getClient from "../../api/client/getClient";
import { Image, Table } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../app";
import { PersonCheck } from "react-bootstrap-icons";
import classes from "./details.module.css";

function ClientDetails() {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        console.log("You are not authenticated: Taking you to Login Paeg.");
        navigate("/login");
    }

    const [client, setClient] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getClient(id)
            .then((response) => {
                setClient(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <Layout>
            <div>Client Details</div>

            <Table responsive striped bordered hover>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{client.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{client.email}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>
                            {client.profile_picture ? (
                                <Image
                                    src={client.profile_picture}
                                    className={
                                        classes.profile_picture +
                                        " img-fluid rounded mx-auto d-block"
                                    }
                                />
                            ) : (
                                <PersonCheck
                                    color="#32ca6c"
                                    className="rounded mx-auto d-block"
                                    size="6em"
                                />
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>

            <div className="mt-4 fs-4">
                <Link to="/clients" className="btn btn-primary btn-lg ml-2">
                    Go back
                </Link>
            </div>
        </Layout>
    );
}

export default ClientDetails;
