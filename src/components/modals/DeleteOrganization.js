import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteOrganization, getOrganizations} from "../../http/organizationAPI";
import {Context} from "../../index";

const DeleteOrganization = ({show, onHide}) => {
    const [nameToDelete, setNameToDelete] = useState('')

    const {organization} = useContext(Context)

    useEffect(() => {
        getOrganizations().then(data => organization.setOrganizations(data))
    }, [])

    const click = async () => {
        if (nameToDelete === "Организация") {
            alert("Заполните поле!")
        } else {
            try {
                await deleteOrganization(nameToDelete)
                onHide()
                window.location.reload();
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    alert(e.response.data.message);
                } else {
                    alert('Произошла непредвиденная ошибка');
                }
            }
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить организацию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select className="mb-2" aria-label="Default select example" value={nameToDelete}
                                 onChange={e => setNameToDelete(e.target.value)}>
                        <option>Организация</option>
                        {organization.organizations.map(org => (
                            <option key={org.name} value={org.name}>
                                {org.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => click()}>Удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteOrganization;
