import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../Components/unauthorizedUserMessage'
import Context from '../../../../Context/context'


export default function AdminPanelIndex(){  
    const {IsInAdminRole} = useContext(Context)
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    return(
        <>
            {isInAdminRole ? 
            (
            <>
                <div className={'container'}>
                    <main className={'pb-3'} role={'main'}>
                    <h1>
                        Admin's panel
                    </h1>
                    <table className={'table'}>
                        <thead>
                            <tr>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <NavLink to='/Account/Manage/Admin/Products'>
                                        Products
                                    </NavLink>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to='/Account/Manage/Admin/Categories'>
                                        Categories
                                    </NavLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </main>
                </div>             
            </>         
            ) : 
            (
                <UnauthorizedUserErrorMessage/>
            )}
            
        </>
    )
}