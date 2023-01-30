import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ManageNav(){

    return(
        <ul className={'nav nav-pills flex-column'}>
                <li className={'nav-item'}>
                    <NavLink to='/Account/Manage/Index' className={'nav-link'}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/Account/Manage/ChangePassword' className={'nav-link'}>
                        Password 
                    </NavLink>
                </li>               
            </ul>       
    )
}