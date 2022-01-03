import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import updateClient from "../../api/client/updateClient";
import { useContext } from "react";
import { AuthContext } from "../../../app";
import PreviewImage from "../../ui/PreviewImage";
import DisplayImage from "../../ui/DisplayImage";
import getClient from "../../api/client/getClient";

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]; //["jpg", "bmp", "png", "gif"];

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Required")
        .min(2, "Name must be 2 characters or more")
        .max(100, "Name must be 100 characters or less"),

    email: yup
        .string()
        .required("Required")
        .email("Invalid email address")
        .min(5, "Email must be 5 characters or more")
        .max(255, "Email must be 255 characters or less"),

    profile_picture: yup
        .mixed()
        .nullable()
        .test(
            "FILE_SIZE",
            "Uploaded file is too big",
            (value) => !value || (value && value.size <= FILE_SIZE)
        )
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsupported format",
            (value) =>
                !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
});

function ClientEdit(props) {
    const navigate = useNavigate();
    const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
    if (!authenticatedUser) {
        console.log("You are not authenticated: Taking you to Login Page.");
        navigate("/login");
    }

    const [formValues, setFormValues] = useState(null);
    const [client, setClient] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getClient(id)
            .then((response) => {
                setClient(response.data);
                setFormValues({
                    name: response.data.name,
                    email: response.data.email,
                    profile_picture: null,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    function handleSubmit(values, { setErrors, setSubmitting }) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);

        if (values.profile_picture)
            formData.append("profile_picture", values.profile_picture);

        updateClient(id, formData)
            .then(function (response) {
                navigate("/clients", {
                    state: {
                        variant: "success",
                        message: response.data["message"],
                    },
                });
            })
            .catch(function (error) {
                setSubmitting(false);
                if (!error.response) {
                    console.log(error.message);
                    return;
                }

                const validation = {};
                for (var key in error.response.data.errors) {
                    validation[key] = error.response.data.errors[key][0];
                }
                setErrors(validation);
            });
    }

    const initialValues = {
        name: "",
        email: "",
        profile_picture: null,
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={formValues || initialValues}
            enableReinitialize
        >
            {({
                handleSubmit,
                handleChange,
                setFieldValue,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                isSubmitting,
            }) => (
                <Layout>
                    <Row className="justify-content-center">
                        <Col sm={8} md={6}>
                            <Card className="text-center">
                                <Card.Body>
                                    <span className="fs-1">
                                        Edit Client Details
                                    </span>
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit}
                                        encType="multipart/form-data"
                                    >
                                        <Form.Group
                                            as={Col}
                                            className="input-group-lg mt-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                name="name"
                                                value={values.name}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.name && !errors.name
                                                }
                                                isInvalid={
                                                    touched.name &&
                                                    !!errors.name
                                                }
                                            />
                                            <Form.Control.Feedback type="valid">
                                                Input OK
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <InputGroup
                                                hasValidation
                                                className="input-group-lg mt-3"
                                            >
                                                <InputGroup.Text>
                                                    @
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Email address"
                                                    name="email"
                                                    value={values.email}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    isValid={
                                                        touched.email &&
                                                        !errors.email
                                                    }
                                                    isInvalid={
                                                        touched.email &&
                                                        !!errors.email
                                                    }
                                                />
                                                <Form.Control.Feedback type="valid">
                                                    Input OK
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>

                                        <label
                                            className="form-label"
                                            htmlFor="profile_picture"
                                            style={{
                                                textAlign: "left",
                                                color: "#adadad",
                                            }}
                                        >
                                            Profile Picture
                                        </label>
                                        {values.profile_picture ? (
                                            <PreviewImage
                                                file={values.profile_picture}
                                            />
                                        ) : (
                                            <DisplayImage
                                                src={client.profile_picture}
                                            />
                                        )}

                                        <input
                                            className="form-control"
                                            type="file"
                                            name="profile_picture"
                                            onChange={(event) => {
                                                setFieldValue(
                                                    "profile_picture",
                                                    event.currentTarget.files[0]
                                                );
                                            }}
                                        />
                                        <ErrorMessage name="profile_picture" />

                                        <div className="d-grid gap-2 mt-3">
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                className="fs-4"
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="mt-4 fs-4">
                                        <Link to="/clients" className="ml-2">
                                            Go Back
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Layout>
            )}
        </Formik>
    );
}

export default ClientEdit;
