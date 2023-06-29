import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
<<<<<<< HEAD:react/matricula/src/App.js
import {Login} from "./component/login";
import {Register} from "./component/register";
import {Home} from "./component/Home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
=======
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { Logout } from './components/Logout';
>>>>>>> e2ab720f0dbda188fc82aac74c03cec39c7c15c8:react/src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return <BrowserRouter>
    <Navigation></Navigation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;
