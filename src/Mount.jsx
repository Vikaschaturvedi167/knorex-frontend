import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Mount = () => {

    const[count , setcount] = useState(0);

    useEffect(()=>{
        console.log("mounting");
        console.log("updating");
        console.log("unMount");

    },[]);
    const incre = ()=>{
setcount(count+1);
    }
  return (
    <div>
        <h1>count : {count}</h1>
        <button onClick={incre}>incre</button>
    </div>
  )
}

export default Mount