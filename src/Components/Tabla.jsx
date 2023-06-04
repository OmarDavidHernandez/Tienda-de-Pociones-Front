import {useState} from 'react'
import { mostrar_alerta } from '../funciones';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Tabla(parametros) {
  const [filtro,setFiltro] = useState('');
  const [por,setPor] = useState('nombre');
  const buscar = (e) =>{
    console.log('Filtro'+filtro);
    if(filtro != ''){
      if(por == 'nombre'){
        parametros.setTemporal(parametros.pociones.filter(p => p.nombre == filtro));
      }
      else if(por == 'descripcion'){
        parametros.setTemporal(parametros.pociones.filter(p => p.descripcion == filtro));
      }
      else{
        parametros.setTemporal(parametros.pociones.filter(p => p.categoria == filtro));
      }
    }
    else{
      parametros.setTemporal(parametros.pociones);
    }
  }
  const filtrarIngredientres = (ingres) =>{
    let listaing = '';
    if(ingres != null){  
      let arrayList = ingres.split(',');
      arrayList.forEach(ele => {
        let prov = parametros.ingredientes.filter(i => i.id == ele);
        listaing += '<br>  -  '+prov[0].nombre;
      });
    }
    return listaing;
  }
  return (
    <>
    <Card border="white" id='pociones'>
    <Card.Header className='bg-dark text-white'>Nuestras Pociones mágicas</Card.Header>
        <Card.Body>
            <Card.Title>
            <Row className='mb-3'>
              <Col lg={{span:4, offset:5}}>
                <Button onClick={()=>parametros.modal(1)}> <i className='fa-solid fa-plus'></i>  Nueva Poción</Button>
              </Col>
            </Row>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                  <i className="fa-solid fa-search"></i>
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Buscar" value={filtro} onChange={(e) =>{setFiltro(e.target.value)}} onKeyUpCapture={buscar}/>
              <Form.Select onChange={(e) => setPor(e.target.value)}>
                <option value="nombre">Nombre</option>
                <option value="descripcion">Descripción</option>
                <option value="categoria">Categoría</option>
              </Form.Select>
            </InputGroup>
            </Card.Title>
            <Card.Text className='text-center'>
            <Row className='mb-3'>
              <Col lg={{span:4, offset:5}}>
                <img src='../public/loading_2.gif' className={'img-fluid '+parametros.classLoad}></img>
              </Col>
            </Row>
            
              <Table responsive striped bordered hover className={parametros.classTable}>
                <thead>
                    <tr>
                      <th>#</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PRECIO</th><th>CANTIDAD</th><th>IMAGEN</th><th></th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                {
                parametros.tempo.map( (row,i)=>(
                <tr key={row.id}>
                    <td>{(i+1)}</td>
                    <td>{row.nombre}</td>
                    <td>{row.descripcion}</td>
                    <td>{row.precio}</td>
                    <td>{row.cantidad}</td>
                    <td>{row.imagen}</td>
                    <td>
                      <Button className='me-2 mb-1' variant="info" 
                      onClick={()=>mostrar_alerta(row.nombre,'info',('<i>'+row.descripcion+'</i><br> <b>$'+row.precio+'</b><br><b>'+row.cantidad+'</b> disponilbes <br>'+' Categoría: <b>'+row.categoria+'</b><br><b>Ingredientes:</b>'+filtrarIngredientres(row.ingredientes)))}>
                        <i className='fa-solid fa-eye'></i></Button>                    
                      <Button className='me-2 mb-1' variant="warning" onClick={()=>parametros.modal(2,row)}> <i className='fa-solid fa-edit'></i></Button>
                      <Button className='me-2 mb-1' variant="danger" onClick={()=>parametros.confirmar(row.id,row.nombre)}> <i className='fa-solid fa-trash'></i></Button>
                    </td>
                </tr>
                ))}
                </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default Tabla