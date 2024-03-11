import React, { useState, useEffect } from 'react';
import {Button, Col, Form, Modal, Row} from 'react-bootstrap';
import { updatePost } from '../../http/postAPI';
import {createFile, deleteFile} from '../../http/fileAPI';
import '../../index.css'
import { format } from 'date-fns';

const ChangePost = ({ show, onHide, post }) => {
    const [postNumber, setPostNumber] = useState('');
    const [executed, setExecuted] = useState('');
    const [postDate, setPostDate] = useState('');
    const [article, setArticle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState('');
    const [payment, setPayment] = useState('');
    const [company, setCompany] = useState('');
    const [contractDate, setContractDate] = useState('');
    const [additionalInformation, setAdditionalInformation] = useState('');

    const [fileInputs, setFileInputs] = useState([]);
    const [newFile, setNewFile] = useState(null);

    useEffect(() => {
        if (post) {
            setPostNumber(post.postNumber);
            setExecuted(post.executed);
            setPostDate(format(new Date(post.postDate), 'dd.MM.yyyy'));
            setArticle(post.article);
            setDescription(post.description);
            setEstimatedPrice(post.estimatedPrice);
            setPayment(post.payment);
            setCompany(post.company);
            setContractDate(format(new Date(post.contractDate), 'dd.MM.yyyy'));
            setAdditionalInformation(post.additionalInformation);
            setFileInputs(post.files ? [...post.files] : []);
        }
    }, [post]);

    function convertCommaToDot(value) {
        const stringValue = String(value);
        const floatValue = parseFloat(stringValue.replace(/,/g, '.'));
        return isNaN(floatValue) ? null : floatValue;
    }

    const handleNewFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const addFileInput = () => {
        if (newFile) {
            setFileInputs((prevFileInputs) => [...prevFileInputs, newFile]);
            setNewFile(null);
        }
    };

    const removeFileInput = async (index, fileId) => {
        if (fileId) {
            try {
                await deleteFile(fileId);
            } catch (e) {
                if (e.response && e.response.data && e.response.data.message) {
                    alert(e.response.data.message);
                } else {
                    alert('Произошла непредвиденная ошибка при удалении файла!');
                }
            }
        }
        setFileInputs((prevFileInputs) => prevFileInputs.filter((_, i) => i !== index));
    };

    const click = async () => {
        try {
            await updatePost(post.id, {
                postNumber,
                executed,
                postDate,
                article,
                description,
                estimatedPrice: convertCommaToDot(estimatedPrice),
                payment: convertCommaToDot(payment),
                company,
                contractDate,
                additionalInformation,
            });

            fileInputs.forEach((file) => {
                if (file instanceof File) {
                    const formData = new FormData();
                    let filename = file.name
                    formData.append('postId', post.id);
                    formData.append('file', file);
                    formData.append('filename', filename);
                    createFile(formData);
                }
            });

            onHide();
            window.location.reload();
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                alert('Произошла непредвиденная ошибка!');
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <h4>Изменить заявку</h4>
                        </Col>
                        <Col xs="auto">
                            {/* Add the select element here */}
                            <Form.Select
                                className="mb-0"
                                value={executed}
                                onChange={(e) => setExecuted(e.target.value)}
                            >
                                <option value={false}>Не исполнено</option>
                                <option value={true}>Исполнено</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mb-2"
                        placeholder={'Номер заявки'}
                        value={postNumber}
                        onChange={(e) => setPostNumber(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Дата заявки'}
                        value={postDate}
                        onChange={(e) => setPostDate(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Статья'}
                        value={article}
                        onChange={(e) => setArticle(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Описание заявки'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Ориентировочная стоимость'}
                        value={estimatedPrice}
                        onChange={(e) => setEstimatedPrice(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Оплата'}
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Заключен договор'}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Дата договора'}
                        value={contractDate}
                        onChange={(e) => setContractDate(e.target.value)}
                    />
                    <Form.Control
                        className="mb-2"
                        placeholder={'Дополнительная информация'}
                        value={additionalInformation}
                        onChange={(e) => setAdditionalInformation(e.target.value)}
                    />

                    {/* Display existing files */}
                    {fileInputs.map((file, index) => (
                        <div key={index} className="file-info mb-2">
                            <a
                                href={`${process.env.REACT_APP_API_URL}api/file/download/${file.uniqueName}`}
                                style={{ display: 'block' }}
                            >
                                {file.name}
                            </a>
                            <Button
                                variant="outline-danger"
                                onClick={() => removeFileInput(index, file.id)}
                            >
                                Удалить
                            </Button>
                        </div>
                    ))}

                    {/* Add a new file input field */}
                    <Form.Control type="file" className="mt-2 mb-2" onChange={handleNewFileChange} />

                    <Button variant="outline-primary" onClick={addFileInput}>
                        Добавить файл
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={click}>
                    Изменить
                </Button>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePost;
