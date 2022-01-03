import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Layout from "../layout/Layout";

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Row className="justify-content-center">
                    <Col>
                        <Card className="text-center">
                            <Card.Body>
                                <p className="fs-4 danger">Page Not Found!</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
