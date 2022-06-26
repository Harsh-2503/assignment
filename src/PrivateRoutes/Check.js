import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Check({children}) {
    const {detector} = useSelector(state=>state.verifier)
    const [check,setCheck] = useState(detector)
    return (
        <>
       {check===false?false:children}
        </>
      )
}
