import React, {useState} from 'react';
import {createOrganization} from "../../http/organizationAPI";
import {Button, Form, Modal} from "react-bootstrap";

const CreateOrganization = ({show, onHide}) => {
    const [nameToCreate, setNameToCreate] = useState('')

    const click = async () => {
        try {
            await createOrganization(nameToCreate)
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

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать организацию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mb-2"
                        placeholder={"Название организации"}
                        value={nameToCreate}
                        onChange={e =>setNameToCreate(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={()=> click()}>Создать</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOrganization;
