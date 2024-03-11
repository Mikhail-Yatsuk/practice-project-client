import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {getOrganizations} from "../http/organizationAPI";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {POST_ROUTE} from "../utils/consts";

const Organization = observer(() => {
    const {user, organization} = useContext(Context)
    const navigate = useNavigate()

    useEffect(()=>{
        if (user.user.role !== "ADMIN") {
            navigate(POST_ROUTE + '/' + user.user.organizationId);
        }
        getOrganizations().then(data=>organization.setOrganizations(data))
    }, [])

    return (
        <Container>
            <Row>
                <Col md={2}>

                </Col>
                <Col md={8}>
                    <h4  className="mt-4 d-flex flex-column align-items-center" >Организации</h4>
                    {organization.organizations.length ? (
                        <ListGroup className="mt-4">
                            {organization.organizations.map(org =>
                                <ListGroup.Item
                                    key={org.id}
                                    style={{cursor: "pointer"}}
                                    className="custom-list-item"
                                    onClick={()=>{
                                        organization.setSelectedOrganization(org)
                                        navigate(POST_ROUTE + '/' + organization.selectedOrganization.id)
                                    }}
                                >
                                    <h6>{org.name}</h6>
                                </ListGroup.Item>)}
                        </ListGroup>
                    ) : (
                        <h5>Нет организаций!</h5>
                    )}

                </Col>
                <Col md={2}>

                </Col>
            </Row>
        </Container>
    );
});

export default Organization;
