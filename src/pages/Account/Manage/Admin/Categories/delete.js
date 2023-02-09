import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { NavLink, useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
export default function AdminPanelCategoriesDeletePage(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location

    //Error handling
    const [isAnyErrors, setIsAnyErrors] = useState(false)
    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')
    const errorHolderClassName = isAnyErrors? 'text-danger' : 'text-success'

    const {IsInAdminRole} = useContext(Context)
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole

    useEffect(() => {
        if(!state){
            return navigate('/Account/Manage/Admin/Categories')
        }
    })

    const submit = async (e) => {
        e.preventDefault()
        await fetch(`https://localhost:7104/api/Categories/${state.category.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
        }).then(response => {
            if(response.status === 204){
                setIsAnyErrors(false)  
                setLocalRequestResultHolder('Successfuly deleted')
                navigate('/Account/Manage/Admin/Categories')
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
                    <label className={'form-label'}>Are you sure you want to delete "{state.category.name}" category ?</label>
                </div>
                <span className={errorHolderClassName}>{localRequestResultHolder}</span>
                <div className={'form-floating'}>
                    <button className={'btn btn-danger'} type={'submit'}>Delete</button>
                    <NavLink className={'btn btn-secondary'} to='/Account/Manage/Admin/Categories'>
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