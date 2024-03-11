import React, {useContext, useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {deletePost} from "../../http/postAPI";
import ChangePost from "./ChangePost";

const ShowPost = ({show, onHide}) => {
    const {post} = useContext(Context)
    const {user} = useContext(Context)
    const [changePostVisible, setChangePostVisible] = useState(false)

    const clickToDelete = async () => {
        try {
            const data = await deletePost(post.selectedPost.id)
            console.log(data)
            onHide()
            window.location.reload();
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert('An unexpected error occurred.');
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
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <h4>{`Заявка ${post.selectedPost.postNumber}`}</h4>
                        </Col>
                        <Col xs="auto">
                            <h4 style={{color: post.selectedPost.executed ? 'green' : 'red'}}>
                                {post.selectedPost.executed ? 'Исполнено' : 'Не исполнено'}
                            </h4>
                        </Col>
                    </Row>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{marginLeft: '30px', marginRight: '30px'}}>
                <Form>
                    {post.selectedPost && post.selectedPost.user && (
                        <div>
                            {/*postNumber, postDate, article, description, estimatedPrice, payment, company, contractDate, additionalInformation*/}
                            <div><b>Номер заявки:</b> {post.selectedPost.postNumber}</div>
                            <div><b>Дата заявки:</b> {new Date(post.selectedPost.postDate).toLocaleDateString()}</div>
                            <div><b>Организация:</b> {post.selectedPost.organization.name} </div>
                            <div><b>Статья:</b> {post.selectedPost.article}</div>
                            <div><b>Описание заявки:</b> {post.selectedPost.description}</div>
                            <div><b>Ориентировочная цена:</b> {post.selectedPost.estimatedPrice} руб.</div>
                            <div><b>Оплата:</b> {post.selectedPost.payment} руб.</div>
                            <div><b>Заключен договор:</b> {post.selectedPost.company}</div>
                            <div><b>Дата заключения
                                договора:</b> {new Date(post.selectedPost.contractDate).toLocaleDateString()}</div>
                            <div>
                                <b>Опубликовал(а)
                                    заявку:</b> {post.selectedPost.user.lastName} {post.selectedPost.user.firstName} {post.selectedPost.user.patronymic}, {post.selectedPost.user.position}
                            </div>
                            <div><b>Уникальный номер в системе:</b> {post.selectedPost.id}</div>
                            <div><b>Примечание:</b> {post.selectedPost.additionalInformation}</div>

                            {post.selectedPost.files ? (<div><b>Файлы: </b>
                                {post.selectedPost.files.map(pst =>
                                    <a href={`${process.env.REACT_APP_API_URL}api/file/download/${pst.uniqueName}`}
                                       style={{display: 'block'}}>{pst.name}</a>)}</div>) : ({})}
                        </div>
                    )}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {(user.user.role === "ADMIN" || post.selectedPost.userId === user.user.id) ? (
                    <>
                        <Button variant="outline-success" onClick={() => setChangePostVisible(true)}>Изменить</Button>
                        <Button variant="outline-success" onClick={() => clickToDelete()}>Удалить</Button>
                    </>) : (() => {
                })}
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
            <ChangePost show={changePostVisible} onHide={() => setChangePostVisible(false)} post={post.selectedPost}/>
        </Modal>
    );
};


export default ShowPost;
