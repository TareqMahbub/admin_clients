import { Col, Container, Row } from "react-bootstrap";

function Footer() {
    return (
        <footer className="bd-footer py-5 mt-5 bg-light">
            <Container>
                <Row>
                    <Col className="text-center border-top fs-5">
                        © 2021 Admin Clients
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
