import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from './Pages/Layout'
import Hangngay from './Pages/Hangngay'
import HuTaichinh from './Pages/HuTaichinh'
import Thongke from './Pages/Thongke'
import Caidat from './Pages/Caidat'
import NoPage from './Pages/NoPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='Budget-App' element={<Hangngay />} />
          <Route path="hutaichinh" element={<HuTaichinh />} />
          <Route path="thongke" element={<Thongke />} />
          <Route path="caidat" element={<Caidat />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)