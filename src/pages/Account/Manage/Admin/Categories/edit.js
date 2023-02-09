import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
export default function AdminPanelCategoriesEditPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const [category, setCategory] = useState(state ? {
        id: state.category.id,
        name: state.category.name,
        products: []
    }: {
        id: "",
        name: "",
        products: []
    })
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
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
            body: JSON.stringify(category)
        }).then(response => {
            if(response.status === 204){
                setIsAnyErrors(false)  
                setLocalRequestResultHolder('Successfuly updated')
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
                        <label className={'form-label'}>Category name</label>
                        <input className={'form-input'} value={category.name} onChange={e => {
                            setLocalRequestResultHolder('')
                            return setCategory((prevState) => ({...prevState, name: e.target.value}))}
                        }
                        ></input>
                    </div>
                    <span className={errorHolderClassName}>{localRequestResultHolder}</span>
                    <div className={'form-floating'}>
                        <button className={'btn btn-success'} type={'submit'}>Update</button>
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