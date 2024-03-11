import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {deleteUser, getLogins} from "../../http/userAPI";

const DeleteUser = ({show, onHide}) => {

    const [loginToDelete, setLoginToDelete] = useState()

    const [logins, setLogins] = useState([]);

    const click = async () => {
        if (loginToDelete == undefined) {
            alert("Заполните поле!")
        } else {
            try {
                await deleteUser(loginToDelete)
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

    useEffect(() => {
        getLogins().then(data => setLogins(data))
    }, [])


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select className="mb-2" aria-label="Default select example" value={loginToDelete}
                                 onChange={e => setLoginToDelete(e.target.value)}>
                        <option>Логин</option>
                        {logins.map(lgn => (
                            <option key={lgn} value={lgn}>
                                {lgn}
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

export default DeleteUser;
