import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from './components/login-form';
import { AfterLogin } from './components/after-login';
import { RegisterForm } from './components/register-form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path='register' element={<RegisterForm/>}/>
        <Route path="after-login" element={<AfterLogin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
