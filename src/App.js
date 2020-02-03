import React from 'react'
import './App.css';
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Signup from './Components/Signup'
import Signin from './Components/Signin'
// import TestSignUp from './Components/TestSignUp'
import {getProfileFetch} from './actions';
import LandlordDashboard from './Components/LandlordDashboard'
import TenantDashbaord from './Components/TenantDashboard'




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
        return <TenantDashbaord/>
      } else {
        return <LandlordDashboard/>
      }
    } return <> <Signin/> <Signup/> </>
  } 
 

  return (
    
       <div className="App">
          {decideUserPath()}  
     </div>
   
  )
}


