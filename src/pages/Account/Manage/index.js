import React, { useEffect, useContext, useState }  from 'react'
import ManageNav from './manageNav'
import { useNavigate } from 'react-router-dom'
import Context from '../../../Context/context'

export default function Index(){
    const {SignedIn, ContextUsername} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [username, setUsername] = ContextUsername
    const navigate = useNavigate()
    useEffect(() => {
        if(isSignedIn === false){
            navigate('/Account/Login')
        }     
    })
    return(
        <>
        <div>
            <h2>Change your account settings</h2>
            <hr/>
            <div className={'row'}>
                <div className={'col-md-3'}>
                    <ManageNav/>
                </div>
                <div className={'col-md-9'}>
                    <h3>Profile</h3>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <div className={'form-group'}>
                                <label className={'form-label'}>{username}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
            
        </>
        
    )
}