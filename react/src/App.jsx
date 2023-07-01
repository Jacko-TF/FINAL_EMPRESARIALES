import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./components/login";
import {Register} from "./components/register";
import {Home} from "./components/Home";
import { Navigation } from './components/Navigation';
import {Logout} from './components/logout';
import 'bootstrap/dist/css/bootstrap.min.css';

import ShowDepartamento from './components/departamento/ShowDepartamento';
import ShowSemestre from './components/semestre/ShowSemestre';
import ShowCarreras from './components/carreras/ShowCarreras';
import ShowMatriculas from './components/matriculas/ShowMatriculas';
import EditMatricula from './components/matriculas/EditMatricula';
import CreateMatricula from './components/matriculas/CreateMatricula';

function App() {
    return <BrowserRouter>
    <Navigation></Navigation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
        
            <Route path='/departamento' element={<ShowDepartamento/>}></Route>
            <Route path="/semestre" element={<ShowSemestre/>} />
            <Route path="/carrera" element={<ShowCarreras/>} />
            <Route path="/matricula" element={<ShowMatriculas/>} />
            <Route path="/matricula/create" element={<CreateMatricula/>} />
            <Route path="/matricula/edit/:id" element={<EditMatricula/>} />
            
        </Routes>
    </BrowserRouter>;
}

export default App;
