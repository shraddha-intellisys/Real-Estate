import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar'

import HomePage from './components/HomePage'
import Aboutus from './components/Aboutus'
import ContactUs from './components/Contactus'
import HomesList from './components/HomesList';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import SavedProperties from './components/SavedProperties';
import Profile from './components/Profile';





function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

<div>
      <Navbar/> 
     
    
      
      
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/about' element={<Aboutus/>}/>
      <Route path='/contact' element={ <ContactUs/>}/>
      <Route path='/homeslist' element={<HomesList/>}/>
      <Route path='/adminPanel' element={<AdminPanel/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/SavedProperties'element={<SavedProperties/>}/>

     
      </Routes>
      <Footer/>
      
   
    </div>

    </Router>
  )
}

export default App
