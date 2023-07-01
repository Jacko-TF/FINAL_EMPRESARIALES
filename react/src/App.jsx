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

import CursosList from './components/Cursos/CursosList';
import PagosList from './components/Pagos/PagosList';

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

            <Route path="/cursos" element={<CursosList/>}/>
            <Route path="/pagos" element={<PagosList/>}/>
   
            
        </Routes>
    </BrowserRouter>;
}

export default App;
