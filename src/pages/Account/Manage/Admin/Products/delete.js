import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
export default function AdminPanelProductsDeletePage(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location

    const {IsInAdminRole} = useContext(Context)
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole

    const [isAnyErrors, setIsAnyErrors] = useState(false)
    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')
    const errorHolderClassName = isAnyErrors? 'text-danger' : 'text-success'

    useEffect(() => {
        if(!state){
            return navigate('/Account/Manage/Admin/Products')
        }
    })

    const submit = async (e) => {
        e.preventDefault()
        await fetch(`https://localhost:7104/api/Products/${state.product.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
        }).then(response => {
            if(response.status === 204){
                setIsAnyErrors(false)  
                setLocalRequestResultHolder('Successfuly deleted')
                navigate('/Account/Manage/Admin/Products')
            }
            else if(response.status !== 204){
                response.json().then(data => {
                    var errors = ""
                    for(const value of data){
                        errors = errors.concat(`${value}`)
                    }
                    setIsAnyErrors(true)                
                    setLocalRequestResultHolder(errors) 
                }).catch(e => {
                    setIsAnyErrors(true)                
                    setLocalRequestResultHolder(e.message) 
                })

            }
        }).catch(e => {
            setIsAnyErrors(true)                
            setLocalRequestResultHolder(e.message) 
        })
    }

    return(
        <>
            {isInAdminRole ? 
            (
                <form onSubmit={submit}>
                <div className={'form-group'}>
                    <label className={'form-label'}>Are you sure you want to delete "{state.product.name}" product ?</label>
                </div>
                <span className={errorHolderClassName}>{localRequestResultHolder}</span>
                <div className={'form-floating'}>
                    <button className={'btn btn-danger'} type={'submit'}>Delete</button>
                    <NavLink className={'btn btn-secondary'} to='/Account/Manage/Admin/Products'>
                        Back to list
                    </NavLink>
                </div>
            </form>
            )
            :
            (
                <UnauthorizedUserErrorMessage/>
            )}

        </>
    )
}