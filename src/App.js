import React from 'react'
import './App.css';
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import {getProfileFetch} from './actions';


import TenantDashbaord from './Components/TenantDashboard'




export default function App() {
  const dispatch = useDispatch() 
  const isLogged = useSelector(state => state.isLogged)


  useEffect(() => {
    dispatch(getProfileFetch())

}, [])


 

  return (
    
       <div className="App">
            
  { isLogged ? <> <TenantDashbaord/> </> : <><Signin/> <Signup/></> }
     </div>
   
  )
}


