import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
const Ingredientes = (parametros) => {
  return (
    <>
    <Card border="white" id='ingredientes'>
    <Card.Header className='bg-dark text-white'>Nuestros ingredientes</Card.Header>
    <Card.Body>
        <Card.Title>Tenemos todos los ingredientes que necesitas para tus pociones</Card.Title>
        <Card.Text>
        <Row className='mt-3'>
        {
      parametros.listado.map( (row,i)=>(
        <Col lg={{span:3}} md={{span:4}} className='mt-3' key={row.id}>
        <Card className='salto'>
            <Card.Body>
                <Card.Title>{row.nombre}</Card.Title>
                <Card.Text>
                {row.descripcion}
                </Card.Text>
                Disponibles: <Badge variant="dark">{row.cantidad}</Badge>
            </Card.Body>
        </Card>
        </Col>
      ))}
        </Row>
        </Card.Text>
    </Card.Body>
    </Card>
    
    </>
  )
}

export default Ingredientes