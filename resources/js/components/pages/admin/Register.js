import React from "react";
import Logo from "../../ui/Logo";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import registerAdmin from "../../api/admin/register";
import { useContext } from "react";
import { AuthContext } from "../../../app";

//TestKey reCaptcha2
//6LcqoeMdAAAAAJELYUKh1goUcD7SJOn-hVt7OWx5

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

    password: yup
        .string()
        .required("Required")
        .min(6, "Password must be 6 characters or more")
        .max(64, "Password must be 64 characters or less"),

    password_confirmation: yup
        .string()
        .min(6, "Password must be 6 characters or more")
        .max(64, "Password must be 64 characters or less")
        .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf(
                    [yup.ref("password")],
                    "Both password need to be the same"
                ),
        }),
    recaptcha: yup.string().required(),
});

function Register(props) {
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

        registerAdmin(inputs)
            .then(function (response) {
                navigate("/login", {
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
                                    <Logo size="6em" />
                                    <br></br>
                                    <span className="fs-1">Register</span>
                                    <Form noValidate onSubmit={handleSubmit}>
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

                                        <Form.Group className="input-group input-group-lg mt-3">
                                            <Form.Control
                                                type="password"
                                                placeholder="Repeat your password"
                                                name="password_confirmation"
                                                value={
                                                    values.password_confirmation
                                                }
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isValid={
                                                    values.password &&
                                                    values.password_confirmation &&
                                                    touched.password_confirmation &&
                                                    !errors.password_confirmation
                                                }
                                                isInvalid={
                                                    values.password &&
                                                    touched.password_confirmation &&
                                                    (values.password_confirmation.trim()
                                                        .length == 0 ||
                                                        errors.password_confirmation)
                                                }
                                            />
                                            <Form.Control.Feedback type="valid">
                                                Input OK
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password_confirmation}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div className="d-grid gap-2 mt-3">
                                            <ReCAPTCHA
                                                sitekey="6LcqoeMdAAAAAJELYUKh1goUcD7SJOn-hVt7OWx5"
                                                onChange={(token) => {
                                                    setFieldValue(
                                                        "recaptcha",
                                                        token
                                                    );
                                                }}
                                            />
                                        </div>

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
                                                Create Account
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="mt-4 fs-4">
                                        Already have an account?&nbsp;&nbsp;
                                        <Link to="/login" className="ml-2">
                                            Login here
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

export default Register;
