import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from './Register';
import Zalogowano from './Zalogowano';
import Login from './Login';
import Home from './Home';
import Wyloguj from './Wyloguj';
import WyslijZdjecie from './WyslijZdjecie';
import './index.css'
import MojeZdjecia from "./MojeZdjecia";
import WszystkieZdjecia from "./WszystkieZdjecia";

const App = () => {

    console.log(localStorage.getItem("myToken"));

 return (
 <>
    <Router>
        <Routes>
            <Route exact path = "/" element = {<Home/>}/>
            <Route exact path = "/login" element = {<Login/>} />
            <Route exact path = "/register" element = {<Register/>} />
            <Route exact path = "/zalogowano" element = {<Zalogowano/>} />
            <Route exact path = "/wyloguj" element = {<Wyloguj/>} />
            <Route exact path = "/wyslijZdjecie" element = {<WyslijZdjecie/>} />
            <Route exact path = "/mojeZdjecia" element = {<MojeZdjecia/>} />
            <Route exact path = "/wszystkieZdjecia" element = {<WszystkieZdjecia/>} />
        </Routes>       
    </Router>
 </>
 );

}

export default App;
