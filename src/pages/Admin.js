import React, {useContext, useState} from 'react';
import {Accordion, Button, Col, Container, Row} from "react-bootstrap";
import RegistrationUser from "../components/modals/RegistrationUser";
import DeleteUser from "../components/modals/DeleteUser";
import DeleteOrganization from "../components/modals/DeleteOrganization";
import CreateOrganization from "../components/modals/CreateOrganization";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {POST_ROUTE} from "../utils/consts";

const Admin = () => {
    const [registrationUserVisible, setRegistrationUserVisible] = useState(false)
    const [deleteUserVisible, setDeleteUserVisible] = useState(false)
    const [deleteOrganizationVisible, setDeleteOrganizationVisible] = useState(false)
    const [createOrganizationVisible, setCreateOrganizationVisible] = useState(false)
    const navigate = useNavigate()
    const {user} = useContext(Context)

    if (user.user.role != 'ADMIN') {
        navigate(POST_ROUTE + '/' + user.user.organizationId)
    }

    return (
        <Container className="d-flex flex-column">
            <Row>
                <Col md={2}>

                </Col>
                <Col md={8}>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0" className="mt-5 p-2">
                            <Accordion.Header>Организации</Accordion.Header>
                            <Accordion.Body className="d-flex flex-column">
                                <Button variant={"outline-success"} className="mt-2 p-2"
                                        onClick={() => setCreateOrganizationVisible(true)}>Создать организацию</Button>
                                <Button variant={"outline-danger"} className="mt-2 p-2"
                                        onClick={() => setDeleteOrganizationVisible(true)}>Удалить организацию</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className="p-2">
                            <Accordion.Header>Пользователи</Accordion.Header>
                            <Accordion.Body className="d-flex flex-column">
                                <Button variant={"outline-success"} className="mt-2 p-2"
                                        onClick={() => setRegistrationUserVisible(true)}>Зарегистрировать
                                    пользователя</Button>
                                <Button variant={"outline-danger"} className="mt-2 p-2"
                                        onClick={() => setDeleteUserVisible(true)}>Удалить пользователя</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <RegistrationUser show={registrationUserVisible} onHide={() => setRegistrationUserVisible(false)}/>
                    <DeleteUser show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)}/>
                    <DeleteOrganization show={deleteOrganizationVisible}
                                        onHide={() => setDeleteOrganizationVisible(false)}/>
                    <CreateOrganization show={createOrganizationVisible}
                                        onHide={() => setCreateOrganizationVisible(false)}/>
                </Col>
                <Col md={2}>

                </Col>
            </Row>
        </Container>
    );
};

export default Admin;
