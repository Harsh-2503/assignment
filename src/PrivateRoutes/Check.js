import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Check({children}) {
    const [check,setCheck] = useState(localStorage.getItem('userState'))
    console.log(check)
    return (
        <>
       {check?children:false}
        </>
      )
}
