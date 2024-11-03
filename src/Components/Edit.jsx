import React, { useEffect, useState,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../Services/base_url';
import { updateStudentApi } from '../Services/allApi';
import { toast } from 'react-toastify';
import { editResponseContext } from '../ContextApi/Context';

function Edit({students}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [student,setStudent] = useState(students)
    const [preview,setPreview] = useState("")

    const {setEditResponse} = useContext(editResponseContext)

    useEffect(()=>{
        if(student.image.type){
            setPreview(URL.createObjectURL(student.image))
        }
    },[student?.image])

    const handleUpdate = async() => {
        console.log(student)
        const {name,phone,batch,image} = student
        if(!name || !phone || !batch || !image){
            toast.warning('Enter Valid Inputs!!')
        }
        else{
            if(image.type){
                const fd = new FormData()
                fd.append('name',name)
                fd.append('phone',phone)
                fd.append('batch',batch)
                fd.append('image',image)

                const header = {
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }

                const res = await updateStudentApi(student._id,fd,header)
                if(res.status == 200){
                    toast.success('Student Updated')
                    handleClose()
                    setEditResponse(res)
                }
                else{
                    toast.error('Updation Failed!!')
                }
            }
            else{
                const header = {
                    'Content-Type':'application/json',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }
                const result = await  updateStudentApi(student._id,student,header)
                if(result.status == 200){
                    toast.success('Student Updated')
                    handleClose()
                    setEditResponse(result)
                }
                else{
                    toast.error('Updation Failed!!')
                }
            }
        }
    }

    return (
        <>
            <button className="btn" onClick={handleShow}>
                <i className="fa-solid fa-user-pen" />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} />
                                <img style={{ cursor: 'pointer' }} className='rounded-3 img-fluid' src={preview?preview:`${base_url}/uploads/${student?.image}`} alt="" />
                            </label>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                                <Form.Control defaultValue={students.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} type="text" placeholder="Name" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                                <Form.Control defaultValue={students.phone} onChange={(e) => setStudent({ ...student, phone: e.target.value })} type="number" placeholder="7483946384" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingCls" label="Batch" className="mb-3">
                                <Form.Control defaultValue={students.batch} onChange={(e) => setStudent({ ...student, batch: e.target.value })} type="text" placeholder="BCA" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Edit;
