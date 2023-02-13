import React, { useEffect, useState, useContext } from 'react'
import Context from '../../Context/context'
import { useNavigate } from 'react-router-dom'

export default function Register(){

    const [credentialsHolder, setCredentialsHolder] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    const navigate = useNavigate()
    const {SignedIn, RequestResultHolder} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn

    //Global error handling 
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    //Local error handling
    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        await fetch(
            `https://localhost:7104/api/Users`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsHolder)
        }).then(response => {
            if(response.status === 200 || response.status === 201){
                clearInputs()
                response.json().then(user => {
                    console.log(user);                     
                })
            }
            if(response.status !== 200){
                response.text().then(data => {
                    throw new Error(data);
                }).catch(e => {
                    setLocalRequestResultHolder(`${e}`)
                });
            }
        }).catch((e) => {
            setRequestResultHolder(e.message)
            navigate('/Error')
        })
    }
    const clearInputs = () => {
        setCredentialsHolder({
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        })
    }

    useEffect(() => {
        if(isSignedIn){
            return navigate('/')     
        }
    })

    return(
        <div className={'row'}>
            <div className={'col-md-4'}>
                <section>
                    <form onSubmit={submitHandler}>
                    <div className={'form-group'}>
                        <label className={'form-label'}>Username</label>
                        <input className={'form-control'} value={credentialsHolder.username} 
                        autoComplete="username" onChange={e => {
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            username: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>Email</label>
                        <input className={'form-control'} value={credentialsHolder.email} 
                        autoComplete="email" onChange={e => {
                            setLocalRequestResultHolder('')
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            email: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>Password</label>
                        <input className={'form-control'} value={credentialsHolder.password} type='password' 
                        autoComplete="password" onChange={e => {
                            setLocalRequestResultHolder('')
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            password: e.target.value
                        }))}
                        }/>
                    </div>
                    <div className={'form-group'}>
                        <label className={'form-label'}>Confirm password</label>
                        <input className={'form-control'} value={credentialsHolder.confirmpassword} type='password' 
                        autoComplete="confirm-password" onChange={e => {
                            setLocalRequestResultHolder('')
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            confirmpassword: e.target.value
                        }))}
                        }/>
                    </div>
                    <span className={'text-danger'}>{localRequestResultHolder}</span>
                    <div>
                        <button type='submit' className={'w-100 btn btn-lg btn-primary'}>Register</button>
                    </div>
                    </form>          
                </section>           
            </div>
        </div>
    )
}