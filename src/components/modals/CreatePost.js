import React, {useContext, useEffect, useState} from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createPost } from '../../http/postAPI';
import { createFile } from '../../http/fileAPI';
import {getOrganizations} from "../../http/organizationAPI";
import {Context} from "../../index";

const CreatePost = ({ show, onHide }) => {
    const {user} = useContext(Context)
    const [postNumber, setPostNumber] = useState('');
    const [executed, setExecuted] = useState(false);
    const [postDate, setPostDate] = useState('');
    const [article, setArticle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState('');
    const [payment, setPayment] = useState('');
    const [company, setCompany] = useState('');
    const [contractDate, setContractDate] = useState('');
    const [additionalInformation, setAdditionalInformation] = useState('');

    const [organizationId, setOrganizationId] = useState('');
    const [organizations, setOrganizations] = useState([]);

    const [files, setFiles] = useState({});

    const [fileFields, setFileFields] = useState([Date.now()]); // Keep track of file fields using an array
    const [fileNames, setFileNames] = useState([]); // Keep track of selected file names separately

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const organizationsData = await getOrganizations(); // Replace getOrganizations with the actual API function
                setOrganizations(organizationsData);
                if (user.user.role !== 'ADMIN') {
                    setOrganizationId(user.user.organizationId);
                }
            } catch (error) {
                console.error('Ошибка при загрузке организаций: ', error);
            }
        };
        fetchOrganizations();
    }, []);

    const convertCommaToDot = (value) => {
        const stringValue = String(value);
        const floatValue = parseFloat(stringValue.replace(/,/g, '.'));
        return isNaN(floatValue) ? null : floatValue;
    };

    const generateFileFieldId = () => Date.now();

    const selectFiles = (e, fieldId) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = { ...files };
        updatedFiles[fieldId] = selectedFiles[0];
        setFiles(updatedFiles);

        const updatedFileNames = [...fileNames];
        updatedFileNames[fieldId] = selectedFiles[0].name;
        setFileNames(updatedFileNames);
    };

    const addFileField = () => {
        const newFieldId = generateFileFieldId();
        setFileFields((prevFields) => [...prevFields, newFieldId]); // Add a new fieldId to the array
        setFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles };
            updatedFiles[newFieldId] = null;
            return updatedFiles;
        });
    };

    const removeFileField = (fieldId) => {
        setFileFields((prevFields) => prevFields.filter((id) => id !== fieldId)); // Remove the fieldId from the array
        setFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles };
            delete updatedFiles[fieldId];
            return updatedFiles;
        });
        setFileNames((prevFileNames) => prevFileNames.filter((name, index) => index !== fieldId));
    };

    const click = async () => {
        try {
            if (!organizationId) {
                alert('Выберите организацию!');
                return;
            }
            const postData = await createPost(
                postNumber,
                executed,
                postDate,
                article,
                description,
                convertCommaToDot(estimatedPrice),
                convertCommaToDot(payment),
                company,
                contractDate,
                additionalInformation,
                organizationId
            );
            console.log(postData);

            Object.values(files).forEach((file) => {
                if (file) {
                    const formData = new FormData();
                    let filename = file.name
                    formData.append('postId', postData.id);
                    formData.append('file', file);
                    formData.append('filename',filename)
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
                            <h4>Добавить заявку</h4>
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
                    {(user.user.role == "ADMIN") && (
                        <Col xs="auto">
                            {/* Add the select element here */}
                            <Form.Select
                                className="mb-2"
                                value={organizationId}
                                onChange={(e) => setOrganizationId(e.target.value)}
                            >
                                <option value="">Выберите организацию</option>
                                {organizations.map((org) => (
                                    <option key={org.id} value={org.id}>
                                        {org.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    )}
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

                    {fileFields.map((fieldId, index) => (
                        <div key={fieldId}>
                            <Form.Control
                                className="mt-2 mb-2"
                                type="file"
                                onChange={(e) => selectFiles(e, fieldId)}
                            />
                            {index >= 0 && (
                                <Button
                                    variant="outline-danger"
                                    className="mb-2"
                                    onClick={() => removeFileField(fieldId)}
                                >
                                    Удалить
                                </Button>
                            )}
                        </div>
                    ))}

                    <Button variant="outline-primary" onClick={addFileField}>
                        Добавить файл
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={click}>
                    Добавить
                </Button>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePost;
