import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
import Context from '../../../../../Context/context'
export default function AdminPanelCategoriesCreatePage(){
    const {IsInAdminRole} = useContext(Context)
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole

    const [isAnyErrors, setIsAnyErrors] = useState(false)
    const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')
    const errorHolderClassName = isAnyErrors? 'text-danger' : 'text-success'

    const [category, setCategory] = useState({
        name: "",
        products: []
    })
    const submit = async (e) => {
        e.preventDefault()
        await fetch(`https://localhost:7104/api/Categories`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
            body: JSON.stringify(category)
        }).then(response => {
            if(response.status === 204){
                setIsAnyErrors(false)  
                setLocalRequestResultHolder('Successfuly added')
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
        (<form onSubmit={submit}>
            <div className={'form-group'}>
                <label className={'form-label'}>Category name</label>
                <input className={'form-input'} value={category.name} onChange={e => {
                    setLocalRequestResultHolder('')
                    return setCategory((prevState) => ({...prevState, name: e.target.value}))}
                }
                ></input>
            </div>
            <span className={errorHolderClassName}>{localRequestResultHolder}</span>
            <div className={'form-floating'}>
                <button className={'btn btn-success'} type={'submit'}>Create</button>
                <NavLink className={'btn btn-secondary'} to='/Account/Manage/Admin/Categories'>
                    Back to list
                </NavLink>
            </div>
        </form>) 
        : 
        (<UnauthorizedUserErrorMessage/>)}
        
    </>)
}