import React from 'react'
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Encabezado = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#inicio">Pociones mágicas</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#pociones">Pociones</Nav.Link>
            <Nav.Link href="#ingredientes">Ingredientes</Nav.Link>
            </Nav>
        </Navbar>
        <Image id='inicio' className='mt-5 d-md-none d-lg-none' src="../public/bannerm.jpg" width="100%" height="160" />
        <Image id='inicio' className='mt-5 d-none d-md-block d-lg-none' src="../public/bannerm.jpg" width="100%" height="250" />
        <Image id='inicio' className='mt-5 d-none d-lg-block' src="../public/banner.jpg" width="100%" height="280" />
    </header>
  )
}

export default Encabezado