import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { NavLink, useNavigate } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
export default function AdminPanelCategoriesIndexPage(){
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const {IsInAdminRole,RequestResultHolder} = useContext(Context)
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole

    useEffect(() => {
        if(isInAdminRole)
        {
            fetch(`https://localhost:7104/api/Categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.status === 200){
                    response.json().then(data => {
                        setCategories(data)
                    }).catch(e => {
                        setRequestResultHolder(e.message) 
                        navigate('/Error')
                    })
                }
            }).catch(e => {
                setRequestResultHolder(e.message) 
                navigate('/Error')
            })
        }
    }, [])
    return(
        <>
            {isInAdminRole ? 
            (
                <>
                    <table className={'table table-bordered'}>
                        <thead>
                            <tr>
                                <th>
                                    Categories
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => {
                                return <tr key={category.id}>
                                    <td>
                                        {category.name}
                                    </td>
                                    <td>
                                        <NavLink className={'btn btn-warning'} to='/Account/Manage/Admin/Categories/Edit' state={{category: category}} key={category.id}>
                                            Edit
                                        </NavLink>
                                        <NavLink className={'btn btn-danger'} to='/Account/Manage/Admin/Categories/Delete' state={{category: category}} key={category.id}>
                                            Delete
                                        </NavLink>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                        <NavLink className={'btn btn-success'} to='/Account/Manage/Admin/Categories/Create'>
                            Create
                        </NavLink>
                        <NavLink className={'btn btn-secondary'} to='/Account/Manage/Admin/Index'>
                            Back to list
                        </NavLink>
                    </div>
                </>
            )
            :
            (
                <UnauthorizedUserErrorMessage/>
            )}
        
        </>
    )
}