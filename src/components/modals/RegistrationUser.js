import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {registration} from "../../http/userAPI";
import {getOrganizations} from "../../http/organizationAPI";
import {Context} from "../../index";

const RegistrationUser = ({show, onHide}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [organiz, setOrganiz] = useState('')
    const [position, setPosition] = useState('')

    const {organization} = useContext(Context)

    useEffect(() => {
        getOrganizations().then(data => organization.setOrganizations(data))
    }, [])

    const click = async () => {
        if (!login || !password || !lastName || !firstName || !patronymic || organiz == "Организация" || !position) {
            alert("Заполните все поля!")
        } else {
            try {
                let data;
                data = await registration(login, password, lastName, firstName, patronymic, organiz, position)
                alert(data.message)
                onHide()
                window.location.reload();
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    alert(e.response.data.message);
                } else {
                    alert('Заполните все поля.');
                    console.log(e);
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
                    Зарегистрировать пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mb-2"
                        placeholder={"Фамилия"}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={"Имя"}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={"Отчество"}
                        value={patronymic}
                        onChange={e => setPatronymic(e.target.value)}
                    />
                    <Form.Select className="mb-2" aria-label="Default select example" value={organiz}
                                 onChange={e => setOrganiz(e.target.value)}>
                        <option>Организация</option>
                        {organization.organizations.map(org => (
                            <option key={org.id} value={org.id}>
                                {org.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        className="mb-2"
                        placeholder={"Должность"}
                        value={position}
                        onChange={e => setPosition(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={"Логин"}
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={"Пароль"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => {
                    click()
                }}>Создать</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistrationUser;
