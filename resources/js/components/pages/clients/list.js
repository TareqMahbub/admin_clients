import ReactPaginate from "react-paginate";
import React, { useEffect, useContext, useState } from "react";
import Layout from "../../layout/Layout";
import { Col, Image, Row, Table, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Eye, PencilSquare, Trash } from "react-bootstrap-icons";
import getClients from "../../api/client/getClients";
import { AuthContext } from "../../../app";
import { PersonCheck } from "react-bootstrap-icons";
import deleteClient from "../../api/client/deleteClient";

function Clients({ clients }) {
    const [showModal, setShowModal] = useState(false);

    if (clients.length === 0) {
        return (
            <div className="alert alert-warning" role="alert">
                No results.
            </div>
        );
    }

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Profile Picture</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>
                            {client.profile_picture ? (
                                <Image
                                    width="150px"
                                    src={client.profile_picture}
                                    className="img-fluid rounded mx-auto d-block"
                                />
                            ) : (
                                <PersonCheck
                                    color="#32ca6c"
                                    className="rounded mx-auto d-block"
                                    size="3em"
                                />
                            )}
                        </td>
                        <td>
                            <Link to={`/clients/${client.id}`}>
                                <Eye />
                            </Link>{" "}
                            <Link to={`/clients/${client.id}/edit`}>
                                <PencilSquare />
                            </Link>{" "}
                            <Link to={`/clients/${client.id}/delete`}>
                                <Trash />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

function ClientList({ perPage }) {
    const navigate = useNavigate();
    const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
    if (!authenticatedUser) {
        console.log("You are not authenticated: Taking you to Login Paeg.");
        navigate("/login");
    }

    const [clients, setClients] = useState([]);
    const [pageOffset, setPageOffset] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [apiError, setApiError] = useState(null);

    useEffect(async () => {
        getClients(perPage, pageOffset)
            .then((response) => {
                setClients(response.data.data);
                setPageCount(response.data.last_page);
            })
            .catch(function (error) {
                console.log(error);
                setApiError(error.message);
                setClients([]);
                setPageCount(0);
            });
    }, [pageOffset, perPage]);

    const handlePageChange = (event) => {
        setPageOffset(event.selected);
    };

    return (
        <Layout>
            <Row>
                <Col>
                    <span className="p-5">All Clients</span>
                    <Link
                        to="/clients/add"
                        className="btn btn-primary btn-lg mb-2"
                    >
                        Add New Client
                    </Link>
                </Col>
            </Row>
            {apiError && (
                <div className="alert alert-danger" role="alert">
                    {apiError}
                </div>
            )}
            <Clients className="listing" clients={clients} />
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={pageOffset}
            />
        </Layout>
    );
}

export default ClientList;
