import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./component/login";
import {Register} from "./component/register";
import {Home} from "./component/Home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
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
