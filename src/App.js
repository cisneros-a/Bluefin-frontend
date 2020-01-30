import React  from 'react'
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import TenantDashbaord from './Components/TenantDashboard'




export default function App() {

  const isLogged = useSelector(state => state.isLogged)

 

  return (
    
       <div className="App">
            
  { isLogged ? <> <TenantDashbaord/> </> : <><Signin/> <Signup/></> }
     </div>
   
  )
}


