import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import '../index.css'
import {getPosts} from "../http/postAPI";
import {observer} from "mobx-react-lite";
import ShowPost from "../components/modals/ShowPost";
import {useNavigate, useParams} from "react-router-dom";
import {getOrganization} from "../http/organizationAPI";
import {POST_ROUTE} from "../utils/consts";

const Post = observer(() => {
    const {user, post} = useContext(Context)
    const {organization} = useContext(Context)
    const [showPostVisible, setShowPostVisible] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные поста
                const postData = await getPosts(id);
                post.setPosts(postData);
                const orgData = await getOrganization(id);
                organization.setSelectedOrganization(orgData);
            } catch (error) {
                navigate(POST_ROUTE + '/' + user.user.organizationId);
                window.location.reload();
            }
        };
        fetchData();
    }, [id, navigate]);

    return (
        <Container>
            <Row>
                <Col md={2}>

                </Col>
                <Col md={8}>
                    <h4  className="mt-4 d-flex flex-column align-items-center" >Заявки {organization.selectedOrganization.name}</h4>
                    {post.posts.length ? (
                        <ListGroup className="mt-4" style={{marginBottom: 58}}>
                            {post.posts.map(pst =>
                                <ListGroup.Item
                                    key={pst.id}
                                    className="custom-list-item"
                                    style={{cursor: "pointer"}}
                                    onClick={()=>{
                                        post.setSelectedPost(pst)
                                        console.log(pst);
                                        setShowPostVisible(true)
                                    }}
                                >
                                    {/*postNumber, postDate, article, description, estimatedPrice, payment, company, contractDate, additionalInformation*/}
                                    <div><b>Номер заявки:</b> {pst.postNumber}</div>
                                    <div><b>Дата заявки:</b> {new Date(pst.postDate).toLocaleDateString()}</div>
                                    {/*<div><b>Дата заявки:</b> {pst.postDate}</div>*/}
                                    <div><b>Статья:</b> {pst.article} </div>
                                    <div><b>Описание заявки:</b> {pst.description} </div>
                                    <div style={{fontWeight: "bold"}}>
                                        {pst.blocked ? 'На удаление' : ()=>{}}
                                    </div>
                                </ListGroup.Item>)}
                        </ListGroup>
                    ) : (
                        <h5>Нет заявок!</h5>
                    )}

                </Col>
                <Col md={2}>

                </Col>
            </Row>
            <ShowPost show={showPostVisible} onHide={() => setShowPostVisible(false)}/>

        </Container>
    );
});

export default Post;
