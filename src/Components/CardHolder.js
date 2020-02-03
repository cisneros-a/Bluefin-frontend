import React from 'react';
import HomeCard from "./HomeCard";
import { useSelector } from 'react-redux';


export default function CardHolder(props) {

  const userType = useSelector(state => state.user.userType)

    

    let populateCards = () => {
        if (userType === 'tenant'){
            return props.homes.state.map(home=>  <HomeCard key={home.id} home={home}/> )
          } else {
            return props.homes.map(home=>  <HomeCard key={home.id} home={home}/> )
          }
    }
    

    return (
        <div className="scroll">
            {populateCards()}
        </div>
    )
}
