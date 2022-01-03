import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import Layout from "../../layout/Layout";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import Auth from "../../../auth";
import loginAdmin from "../../api/admin/login";
import { useContext } from "react";
import { AuthContext } from "../../../app";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("Required")
        .email("Invalid email address")
        .min(5, "Email must be 5 characters or more")
        .max(255, "Email must be 255 characters or less"),

    password: yup
        .string()
        .required("Required")
        .min(6, "Password must be 6 characters or more")
        .max(64, "Password must be 64 characters or less"),
});

function Login(props) {
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) {
        console.log("You are authenticated: Taking you to Dashboard.");
        navigate("/");
    }

    function handleSubmit(values, { setErrors, setSubmitting }) {
        let inputs = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
        };

        loginAdmin(inputs)
            .then(function (response) {
                Auth.storeToken(
                    `${response.data.data["access_key"]}|${response.data.data["access_token"]}`,
                    new Date(response.data.data["expires_at"])
                );

                navigate("/", {
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

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
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
                                        <Logo size="6em" />
                                        <br></br>
                                        <span className="fs-1">Login</span>
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                        >
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

                                            <Form.Group className="input-group input-group-lg mt-3">
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={values.password}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    isValid={
                                                        touched.password &&
                                                        !errors.password
                                                    }
                                                    isInvalid={
                                                        touched.password &&
                                                        !!errors.password
                                                    }
                                                />
                                                <Form.Control.Feedback type="valid">
                                                    Input OK
                                                </Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <div className="d-grid gap-2 mt-3">
                                                <Button
                                                    type="submit"
                                                    disabled={
                                                        !isValid ||
                                                        isSubmitting ||
                                                        Object.keys(touched)
                                                            .length == 0
                                                    }
                                                    variant="primary"
                                                    size="lg"
                                                    className="fs-4"
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form>

                                        <div className="mt-4 fs-4">
                                            No account yet?&nbsp;&nbsp;
                                            <Link
                                                to="/register"
                                                className="ml-2"
                                            >
                                                Create one here
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Layout>
                )}
            </Formik>
        </>
    );
}

export default Login;
