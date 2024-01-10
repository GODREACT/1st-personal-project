import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';

// 컴포넌트 불러오기
import Main from "./main/main";
import Header from './include/header';
import Footer from "./include/footer";
import Login from './customer/login';
import Sinup from './customer/signup';
import Htmlboard from "./noticeboard/htmlboard";
import Cssboard from "./noticeboard/cssboard";
import Htmlboard_p from "./noticeboard/htmlboard_p";
function App() {
  return (
    <div className="App">
      <Header/>
      <div id='App_Main'>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/htmlboard' element={<Htmlboard/>}/>
          <Route path='/htmlboard_p' element={<Htmlboard_p/>}/>
          <Route path='/cssboard' element={<Cssboard/>}/>
          <Route path='/members/login' element={<Login/>}/>
          <Route path='/members/signup' element={<Sinup/>}/>
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
