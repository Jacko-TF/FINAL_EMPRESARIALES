import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./components/Login";
import {Register} from "./components/register";
import {Home} from "./components/Home";
import { Navigation } from './components/Navigation';
import {Logout} from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

import ShowDepartamento from './components/departamento/ShowDepartamento';
import ShowSemestre from './components/semestre/ShowSemestre';
import ShowCarreras from './components/carreras/ShowCarreras';
import ShowMatriculas from './components/matriculas/ShowMatriculas';
import EditMatricula from './components/matriculas/EditMatricula';
import CreateMatricula from './components/matriculas/CreateMatricula';
import CursosList from './components/curso/CursosList';
import PagosList from './components/pago/PagosList';
import ShowSeccion from './components/seccion/ShowSeccion';
import ShowCiclo from './components/ciclo/ShowCiclo';
import ShowEstudiante from './components/estudiante/ShowEstudiante';
import CreateEstudiante from './components/estudiante/createEstudiante';
import EditEstudiante from './components/estudiante/EditEstudiante';
import CarreraMatriculados from './components/consultas/CarreraMatriculados';
import CicloMatriculados from './components/consultas/CicloMatriculados';
import DepartamentoMatriculados from './components/consultas/DepartamentoMatriculados';

DepartamentoMatriculados

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
            <Route path="/curso" element={<CursosList/>} />
            <Route path="/pago" element={<PagosList/>} />
            <Route path="/matricula/create" element={<CreateMatricula/>} />
            <Route path="/matricula/edit/:id" element={<EditMatricula/>} />
            <Route path='/ciclo' element={<ShowCiclo/>}></Route>
            <Route path='/seccion' element={<ShowSeccion/>}></Route>
            <Route path='/estudiante' element={<ShowEstudiante/>}></Route>
            <Route path='/estudiante/create' element={<CreateEstudiante/>}></Route>
            <Route path='/estudiante/edit/:id' element={<EditEstudiante/>}></Route>

            <Route path='/carreraMatriculados' element={<CarreraMatriculados/>}></Route>
            <Route path='/cicloMatriculados' element={<CicloMatriculados/>}></Route>
            <Route path='/departamentoMatriculados' element={<DepartamentoMatriculados/>}></Route>
            
        </Routes>
    </BrowserRouter>;
}

export default App;
