import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ORGANIZATION_ROUTE, POST_ROUTE} from "../utils/consts";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [log, setLog] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data;
            data = await login(log, password)
            user.setUser(data)
            user.setIsAuth(true)
            if (user.user.role == "ADMIN") {
                navigate(ORGANIZATION_ROUTE)
            } else {
                navigate(POST_ROUTE + '/' + user.user.organizationId)
            }
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert('Произошла непредвиденная ошибка.');
            }
        }
    }


    return (

        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 58}}
        >
            <Card style={{width: 600}} className="p-5">
                <h3 className="m-auto">Авторизация</h3>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Логин"
                        value={log}
                        onChange={e => setLog(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-between mt-4">
                        <Button
                            className="align-self-end "
                            variant="outline-dark"
                            onClick={() => {
                                click()
                            }}
                        >
                            Авторизоваться
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );

});

export default Auth;
