import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./components/login";
import {Register} from "./components/register";
import {Home} from "./components/Home";
import { Navigation } from './components/Navigation';
import {Logout} from './components/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Departamento} from './interceptors/Departamento';
// import {SemestreRoutes} from './interceptors/';

import ShowDepartamento from './components/departamento/ShowDepartamento';
import CreateDepartamento from './components/departamento/CreateDepartamento';
import EditDepartamento from './components/departamento/EditDepartamento';
import ShowSemestre from './components/semestre/ShowSemestre';
import CreateSemestre from './components/semestre/CreateSemestre';
import EditSemestre from './components/semestre/EditSemestre';

import MostrarEstudiante from './components/estudiante/Mostrar';
import NuevoEstudiante from './components/estudiante/Nuevo';
import EditarEstudiante from './components/estudiante/Editar';

import MostrarSeccion from './components/seccion/MostrarSeccion';
import MostrarCiclo from './components/ciclo/MostrarCiclo';

function App() {
    return <BrowserRouter>
    <Navigation></Navigation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
        

            <Route path='/departamento' element={<ShowDepartamento></ShowDepartamento>}></Route>
            <Route path='/departamento/create' element={<CreateDepartamento></CreateDepartamento>}></Route>
            <Route path='/departamento/edit/:id' element={<EditDepartamento></EditDepartamento>}></Route>
            
            <Route path="/semestres" element={<ShowSemestre />} />
            <Route path="/semestres/create" element={<CreateSemestre />} />
            <Route path="/semestres/edit/:id" element={<EditSemestre />} />
   
            <Route path='/estudiantes' element={<MostrarEstudiante/>}></Route>
            <Route path='/estudiantes/create' element={<NuevoEstudiante/>}></Route>
            <Route path='/estudiantes/edit/:id' element={<EditarEstudiante/>}></Route>
            
            <Route path='/ciclo' element={<MostrarCiclo></MostrarCiclo>}></Route>
            <Route path='/seccion' element={<MostrarSeccion></MostrarSeccion>}></Route>
            
        </Routes>
    </BrowserRouter>;
}

export default App;
