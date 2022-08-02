import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import PokeDetail from './components/PokeDetail'
import Pokedex from './components/Pokedex'
import ProtectedRoutes from './components/ProtectedRoutes'


function App() {


  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoutes />
        }>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokeDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
