import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Header() {

    const nav = useNavigate()

    const logout = () => {
        sessionStorage.clear()
        nav('/auth')
    }
    return (
        <>
            <Navbar className="bg-primary">
                <Container>
                    <Navbar.Brand href="#home">
                    <i className="fa-lg fa-solid fa-school" style={{color: "#241f33",}} />
                        {' '}
                        Student Management
                    </Navbar.Brand>
                    <button className='btn btn-dark' onClick={logout}>Log Out</button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header