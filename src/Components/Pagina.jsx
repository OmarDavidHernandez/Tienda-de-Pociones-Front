import { useState,useEffect} from 'react'
import { confirmacion, enviarPeticion } from '../funciones';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabla from './Tabla';
import Formulario from './Formulario';
import Ingredientes from './Ingredientes';

const Pagina = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [titulo,setTitulo] = useState('');
    const [operacion,setOperacion] = useState('');
    const [pociones,setPociones] = useState([]);
    const [temporal,setTemporal] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [imagen, setImagen] = useState();
    const [categoria, setCategoria] = useState('');
    const [classLoad,setClassLoad] = useState('');
    const [classTable,setClassTable] = useState('d-none');
    const [ingredientes,setIngredientes] = useState([]);
    useEffect(()=>{
      obtenerPociones();
      obtenerIngredientes();
    },[]);
  
    const obtenerPociones = async() =>{
      const res = await enviarPeticion('GET','','/pociones','');
      setPociones(res.data);
      setTemporal(res.data); 
      setClassTable('');
      setClassLoad('d-none');
    }
    const obtenerIngredientes = async() =>{
        const res = await enviarPeticion('GET','','/ingredientes','');
        setIngredientes(res.data);
      }
    const laimagen = (img) =>{
        console.log(img);
        setImagen(img);
    }
    const abrirModal = (op,datos) =>{
        
        setOperacion(op);
        setShow(true);
        if(op == 1){
            setTitulo('Crear poción');
            limpiar();
        }
        else{
            setTitulo('Editar poción');
            setId(datos.id);
            setNombre(datos.nombre);
            setDescripcion(datos.descripcion);
            setPrecio(datos.precio);
            setCantidad(datos.cantidad);
            setCategoria(datos.categoria);
            setImagen(undefined);
        }
    }
    const eliminar = (id,nombre) =>{
        confirmacion(nombre,'/pociones/'+id,'/');
    }
    const limpiar = () =>{
        setId('');
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        setCategoria('');
        setImagen(undefined);
    }
  return (
    <>
    <Row className='mt-0'>
        <Col lg={{span:10, offset:1}}>
            <Tabla pociones={pociones} tempo={temporal} setTemporal={setTemporal} modal={abrirModal} confirmar={eliminar} classLoad={classLoad} classTable={classTable}></Tabla>
        </Col>
    </Row>
    <Row className='mt-3 mb-3'>
        <Col lg={{span:10, offset:1}}>
            <Ingredientes listado={ingredientes} />
        </Col>
    </Row>
    <Formulario titulo={titulo} show={show} onHide={handleClose} op={operacion} id={id}
    nombre={nombre} setNombre={setNombre} descripcion={descripcion} setDescripcion={setDescripcion}
    precio={precio} setPrecio={setPrecio} cantidad={cantidad} setCantidad={setCantidad}
     imagen={imagen} laimagen={laimagen} categoria={categoria} setCategoria= {setCategoria} 
     refrescar={obtenerPociones} limpiar = {limpiar} ingredientes={ingredientes}>
    </Formulario>
    </>
    
  )
}

export default Pagina