import {useRef} from 'react';
import { enviarPeticion } from '../funciones';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
const Formulario = (parametros) => {
    let op = parametros.op;
    const btnCerrar = useRef();
    
    const save = async(e) =>{
        e.preventDefault();
        let metodo = (op == 1) ? 'POST' : 'PUT';
        let url = (op == 1) ? '/pociones' : '/pociones/'+parametros.id;
        
        /*const form = new FormData()
        form.append('nombre',parametros.nombre);
        form.append('descripcion',parametros.descripcion);
        form.append('precio',parametros.precio);
        form.append('cantidad',parametros.cantidad);
        form.append('imagen',parametros.imagen);
        form.append('categoria',parametros.categoria);
        form.append('id',parametros.id);*/
        let form = {nombre:parametros.nombre,descripcion:parametros.descripcion,precio:parametros.precio,cantidad:parametros.cantidad,imagen:parametros.imagen,categoria:parametros.categoria,id:parametros.id,ingredientes:parametros.ingres};
        const res = await enviarPeticion(metodo,form,url,'');
        if(metodo == 'PUT' && res.status == true){
            btnCerrar.current.click();
        }
        if(res.status == true){
        parametros.limpiar();
        parametros.refrescar();
        }
    }
    

  return (
    <Modal show={parametros.show} onHide={parametros.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{parametros.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={save}>
                <InputGroup className="mb-3">
                    <InputGroup.Text >
                        <i className="fa-solid fa-hat-wizard"></i>
                    </InputGroup.Text>
                    <Form.Control value={parametros.nombre} onChange={(e) => parametros.setNombre(e.target.value)} type="text" placeholder="Nombre de la poción" required/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text >
                        <i className="fa-solid fa-comment-dots"></i>
                    </InputGroup.Text>
                    <Form.Control value={parametros.descripcion} onChange={(e) => parametros.setDescripcion(e.target.value)} type="text" placeholder="Descripción" required/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text >
                        <i className="fa-solid fa-dollar-sign"></i>
                    </InputGroup.Text>
                    <Form.Control value={parametros.precio} onChange={(e) => parametros.setPrecio(e.target.value)} type="number" placeholder="Precio" required/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text >
                        <i className="fa-solid fa-box"></i>
                    </InputGroup.Text>
                    <Form.Control value={parametros.cantidad} onChange={(e) => parametros.setCantidad(e.target.value)} type="number" placeholder="Cantidad inicial" required/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text >
                        <i className="fa-solid fa-image"></i>
                    </InputGroup.Text>
                    <Form.Control onChange={(e)=> parametros.laimagen(e.target.files[0])} type="file" accept="image/jpeg, image/png"/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text >
                        <i className="fa-solid fa-certificate"></i>
                    </InputGroup.Text>
                    <Form.Control value={parametros.categoria} onChange={(e) => parametros.setCategoria(e.target.value)} type="text" placeholder="Categoría" required/>
                </InputGroup>
                <hr></hr>
                <i className="fa-solid fa-hand-sparkles"></i> <b>Ingredientes de la Poción:</b><br></br>
                <InputGroup className="mb-3">
                {
                parametros.ingredientes.map( (row,i)=>(
                    <Form.Check key={row.id}
                    type="switch"name='ingres[]'className='me-2'
                    id={'ing_'+row.id} label={row.nombre} 
                    
                    onChange={(e) => parametros.actualizaChecks(e)}
                    />
                ))}
                </InputGroup>
                <br></br>
                <Button type="submit" variant="success"><i className='fa-solid fa-save'></i> Guardar </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={parametros.onHide} ref={btnCerrar}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Formulario