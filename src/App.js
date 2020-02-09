import React from 'react'
import './App.css';
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Signup from './Components/Signup'
import Signin from './Components/Signin'
// import TestSignUp from './Components/TestSignUp'
import {getProfileFetch} from './actions';
import LandlordDashboard from './Components/LandlordDashboard'
import TenantDashboard from './Components/TenantDashboard'
import LandlordNavbar from './Components/LandlordNavbar'
import TenantNavbar from './Components/TenantNavbar'




export default function App() {
  const dispatch = useDispatch() 
  const isLogged = useSelector(state => state.isLogged)
  const userType = useSelector(state => state.user.userType)


  useEffect(() => {
    dispatch(getProfileFetch())

}, [dispatch])

  const decideUserPath = () => {
    if (isLogged){
      if (userType === 'tenant'){
        return <div><TenantNavbar/>
        <TenantDashboard/>
        </div>
      } else {
        return <div><LandlordNavbar/>
        <LandlordDashboard/>
        </div>
      }
    } return <> <Signin/> <Signup/> </>
  } 
 

  return (
    
       <div className="App">
          {decideUserPath()}  
     </div>
   
  )
}


