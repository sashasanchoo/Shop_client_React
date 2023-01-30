import { type } from '@testing-library/user-event/dist/type'
import React, {useContext, useEffect, useState} from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import Context from '../../../context'
import ManageNav from './manageNav'

export default function ChangePassword(){
    const {SignedIn} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn

    const navigate = useNavigate()

    const [localErrorHolder, setLocalErrorHolder] = useState('')

    const [credentialsHolder, setCredentialsHolder] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    })
    const submit = async (e) => {
        e.preventDefault()
        await fetch(`https://localhost:7104/api/Users/ChangePassword`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
            body: JSON.stringify(credentialsHolder)
        }).then(response => {
            if(response.status !== 200){
                response.json().then(data => {
                    console.log(data)
                    var errors = ""
                    for(const value of data){
                        errors = errors.concat(`${value}`)
                    }                
                    setLocalErrorHolder(errors) 
                }).catch(e => {
                    console.log(e)
                })
            }
        }).catch(e => console.log(e))
    }
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
                    <h3>Change password</h3>
                    <div className={'row'}>
                        <div className={'col-md-6'}>
                            <form id={'change-password-form'} onSubmit={submit}>
                                <div className={'form-floating'}>
                                    <label className={'form-label'}>Current password</label>
                                    <input className={'form-control'} value={credentialsHolder.oldpassword}
                                    onChange={e => {
                                        setLocalErrorHolder('')
                                        return setCredentialsHolder((prevState) => ({
                                            ...prevState,
                                            oldpassword: e.target.value
                                        }))
                                    }}/>
                                </div>
                                <div className={'form-floating'}>
                                    <label className={'form-label'}>New password</label>
                                    <input className={'form-control'} value={credentialsHolder.newpassword}
                                    onChange={e => {
                                        return setCredentialsHolder((prevState) => ({
                                            ...prevState,
                                            newpassword: e.target.value
                                        }))
                                    }}/>
                                </div>
                                <div className={'form-floating'}>
                                    <label className={'form-label'}>Confirm new password</label>
                                    <input className={'form-control'} value={credentialsHolder.confirmpassword}
                                    onChange={e => {
                                        return setCredentialsHolder((prevState) => ({
                                            ...prevState,
                                            confirmpassword: e.target.value
                                        }))
                                    }}/>
                                </div>
                                <span className={'text-danger'}>{localErrorHolder}</span>
                                <div className={'form-floating'}>                
                                    <button type='submit' className={'w-100 btn btn-lg btn-primary'}>Update password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
            
        </>
        
    )
}