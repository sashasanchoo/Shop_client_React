import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Context from '../context'

export default function LoginPartial(){
    const {SignedIn, ContextUsername} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [username, setUsername] = ContextUsername
    //isAdmin вынести на уровень App.js
    const [isAdm, setIsAdmin] = useState('')
    useEffect(() => {
        if(isSignedIn){
            fetch(
                `https://localhost:7104/api/Roles/IsAdmin`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
                }
            }).then(response => {
                if(response.status === 200){
                    response.json().then(json => {
                        setIsAdmin(json)
                        console.log(json)
                    }
                )
                }
                if(response.status !== 200){
                    response.text().then(data => {
                        throw new Error(data);
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        }
        
    })
    return(
        <>
            {isSignedIn === true ? (
                <ul className={'navbar-nav'}>
                    <li className={'nav-item'}>
                        <NavLink to='/Account/Manage/index' className={'navbar-brand text-white'}>
                            Hello, {username}
                        </NavLink>
                    </li>
                    {isAdm === true ? (<li className={'nav-item'}>
                        <NavLink to='/Account/Manage/Admin/Index' className={'navbar-brand text-white'}>
                            Admin's panel 
                        </NavLink>
                    </li>) : (<li></li>)}
                    <li className={'nav-item'}>
                        <NavLink to='/Account/logout' className={'navbar-brand text-white'}>
                            Logout
                        </NavLink>
                    </li>
                </ul>)
    : 
            (<ul className='navbar-nav'>
                <li className={'nav-item'}>
                    <NavLink to='/Account/Login' className={'navbar-brand text-white'}>
                        Login
                    </NavLink>
                </li>  
                <li className={'nav-item'}>
                    <NavLink to='/Account/Register' className={'navbar-brand text-white'}>
                        Register
                    </NavLink>
                </li> 
            </ul>)}
        </>
    )
}