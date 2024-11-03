import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
        <div className='w-100 d-flex justify-content-center align-items-center bg-primary-subtle' style={{height:'90vh'}}>
            <div className='w-75 p-5'>
                <Row>
                    <Col>
                        <h3>Student Management</h3>
                        <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum itaque amet reprehenderit repellendus voluptatibus magni voluptate quisquam eaque minima voluptas? Veniam iste ratione incidunt ipsam mollitia eaque! Ullam, minima laboriosam.</p>
                        <div className='d-grid'>
                        <Link className='btn btn-success' to='/auth'>Lets Go...</Link>
                        </div>
                    </Col>
                    <Col>
                        <img className='img-fluid' src="https://wpschoolpress.com/wp-content/uploads/2023/03/student-management-system.png" alt="" />
                    </Col>
                </Row>
            </div>
        </div>
    </>
  )
}

export default Landing