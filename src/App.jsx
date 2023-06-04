import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Pagina from './Components/Pagina';
import Container from 'react-bootstrap/Container';
import Encabezado from './Components/Encabezado';
import './App.css'
function App() {
  return (
    <>
      
      <Container fluid>
        <Encabezado />
        <Pagina></Pagina>
      </Container>
    </>
  )
}

export default App
