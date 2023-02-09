import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../Context/context'
export default function ErrorHandler(){
    const {RequestResultHolder} = useContext(Context)
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    const navigate = useNavigate()
    useEffect(() => {
        if(!requestResultHolder){
            return navigate('/')
        }
        return(() => {
            setRequestResultHolder('')
        })
    }, [requestResultHolder])
    return(
        <>
            <h1 className={'text-danger'}>{requestResultHolder}</h1>
        </>
    )
}