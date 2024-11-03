import React from 'react'
import { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { addStudent } from '../Services/allApi';
import { toast } from 'react-toastify';
import { addResponseContext } from '../ContextApi/Context';

function Add() {

    const [show, setShow] = useState(false);
    
    const [student, setStudent] = useState({
        name: '', phone: '', batch: '', image: ''
    })

    const {addResponse,setAddResponse} = useContext(addResponseContext)

    const [preview, setPreview] = useState('')

    const handleClose = () => {
        setShow(false)
        setStudent({
            name: '', phone: '', batch: '', image: ''
        })
    }
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (student.image) {
            setPreview(URL.createObjectURL(student.image))
        }
        else {
            setPreview('')
        }

    }, [student.image])


    const handleAdd = async () => {
        console.log(student)
        const { name, phone, batch, image } = student
        if (!name || !phone || !batch || !image) {
            toast.warning("please Enter Valid inputs!")
        }
        else {
            const fd = new FormData()
            fd.append('name', name)
            fd.append('phone', phone)
            fd.append('batch', batch)
            fd.append('image', image)

            const header = {
                'Content-Type':'multipart/form-data',
                'Authorization':`Token ${sessionStorage.getItem('token')}`
            }

            const res = await addStudent(fd, header)
            console.log(res)
            if (res.status == 200) {
                setAddResponse(res)
                toast.success('Student Added!!')
                handleClose()
            }
            else{
                toast.error('Failed!!')
            }

        }

    }

    return (
        <>
            <div className='m-3'>
                <button className='btn btn-success' onClick={handleShow}>Add Student</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} />
                                <img style={{ cursor: 'pointer' }} className='rounded-3 img-fluid' 
                                src={preview ? preview : "https://png.pngtree.com/png-clipart/20191121/original/pngtree-user-icon-png-image_5097430.jpg"} alt="" />
                            </label>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                                <Form.Control onChange={(e) => setStudent({ ...student, name: e.target.value })} type="text" placeholder="Name" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                                <Form.Control onChange={(e) => setStudent({ ...student, phone: e.target.value })} type="number" placeholder="7483946384" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingCls" label="Batch" className="mb-3">
                                <Form.Control onChange={(e) => setStudent({ ...student, batch: e.target.value })} type="text" placeholder="BCA" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add