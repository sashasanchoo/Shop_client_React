import React, { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Context from '../Context/context'
import { useNavigate } from 'react-router-dom'
export default function DropDownLoginPartial(){
    const {SignedIn, ContextUsername, IsInAdminRole} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [username, setUsername] = ContextUsername
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    const navigate = useNavigate()
    return(
        <>
        {isSignedIn === true ? (
                <>
                    <Dropdown.Item href="" onClick={() => {navigate('/Account/Manage/index')}}>
                        Hello, {username}
                    </Dropdown.Item>
                    {isInAdminRole === true ? (
                        <Dropdown.Item href="" onClick={() => {navigate('/Account/Manage/Admin/Index')}}>
                            Admin's panel
                        </Dropdown.Item>
                    ):(<></>)}
                    <Dropdown.Item href="" onClick={() => {navigate('/Account/logout')}}>
                        Logout
                    </Dropdown.Item>
                </>)
                : 
                (
                <>
                    <Dropdown.Item href="" onClick={() => {navigate('/Account/Login')}}>
                        Login
                    </Dropdown.Item>
                    <Dropdown.Item href="" onClick={() => {navigate('/Account/Register')}}>
                        Register
                    </Dropdown.Item>                  
                </>
                )}     
        </>
    )
}