import Layout from "../../layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import getClient from "../../api/client/getClient";
import { Button, Image, Table } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../app";
import { PersonCheck } from "react-bootstrap-icons";
import deleteClient from "../../api/client/deleteClient";
import classes from "./details.module.css";

function ClientDelete() {
    const navigate = useNavigate();
    const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
    if (!authenticatedUser) {
        console.log("You are not authenticated: Taking you to Login Paeg.");
        navigate("/login");
    }

    function handleDelete(e) {
        deleteClient(e.target.id)
            .then((response) => {
                navigate("/clients", {
                    state: {
                        variant: "success",
                        message: response.data["message"],
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
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
            <div>Are you sure? (confirm delete below)</div>

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
                </Link>{" "}
                <Button
                    id={client.id}
                    size="lg"
                    variant="danger"
                    onClick={handleDelete}
                >
                    Confirm Delete
                </Button>
            </div>
        </Layout>
    );
}

export default ClientDelete;
