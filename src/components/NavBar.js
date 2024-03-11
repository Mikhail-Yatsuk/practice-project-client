import React, { useContext, useState } from 'react';
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { ADMIN_ROUTE, LOGIN_ROUTE, ORGANIZATION_ROUTE, POST_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import CreatePost from "./modals/CreatePost";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE);
    };
    const [addPostVisible, setAddPostVisible] = useState(false);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href={user.isAuth ? (user.user.role === "ADMIN" ? ORGANIZATION_ROUTE : POST_ROUTE + '/' + user.user.organizationId) : LOGIN_ROUTE}>
                    Электронная система заявок
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {user.isAuth ? (
                            <>
                                {user.user.role === "ADMIN" && (
                                    <Nav.Link href={ADMIN_ROUTE}>
                                        Админ панель
                                    </Nav.Link>
                                )}
                                {user.user.role !== "ADMIN" && (
                                    <Nav.Link href={POST_ROUTE + '/' + user.user.organizationId}>
                                        Заявки
                                    </Nav.Link>
                                )}
                                {user.user.role === "ADMIN" && (
                                    <Nav.Link href={ORGANIZATION_ROUTE}>
                                        Организации
                                    </Nav.Link>
                                )}
                                <Nav.Link style={{ marginRight: 10 }} onClick={() => setAddPostVisible(true)}>Добавить заявку</Nav.Link>
                                <Button variant="outline-light" onClick={logOut}>
                                    Выход
                                </Button>
                            </>
                        ) : (
                            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                                Авторизация
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <CreatePost show={addPostVisible} onHide={() => setAddPostVisible(false)} />
        </Navbar>
    );
});

export default NavBar;
