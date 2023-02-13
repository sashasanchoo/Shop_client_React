import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { NavLink, useNavigate } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
import Loader from '../../../../../Components/helpers/loader'
export default function AdminPanelProductsIndexPage(){
    const [loading, setLoading] = useState(true)
    const {IsInAdminRole, RequestResultHolder} = useContext(Context)
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    useEffect(() => {
        if(isInAdminRole)
        {
            fetch(`https://localhost:7104/api/Products`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.status === 200){
                    response.json().then(data => {
                        setProducts(data)
                        setLoading(false)
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
    const getProps = (item) => {
        let content = []
        for(const [key,value] of Object.entries(item)){
            if(key.toLowerCase().includes("published")){
                content.push(<td key={key}>{new Date(value).toLocaleDateString()}</td>)
            }
            else if(!key.toLowerCase().includes("id") && typeof(value) !== 'object')
            {
                content.push(<td key={key}>{value}</td>)
            }
        }      
        return content;
    }
    return(
        <>
            {loading ? (<Loader/>):
            (
                isInAdminRole ? 
                    (
                        <div className={'table-responsive'}>
                            <table className={'table table-bordered text-nowrap'}>
                                <thead>
                                    <tr>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Published
                                        </th>
                                        <th>
                                            Image path
                                        </th>
                                        <th>
                                            Content
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => {
                                        return <tr key={product.id}>
                                            {getProps(product)}
                                            <td>
                                                {product.category.name}
                                            </td>
                                            <td>
                                                <NavLink className={'btn btn-light'} to='/Account/Manage/Admin/Products/Details' state={{id: product.id}} key={product.id}>
                                                    Details
                                                </NavLink>  
                                                <NavLink className={'btn btn-warning'} to='/Account/Manage/Admin/Products/Edit' state={{product: product}} key={product.id}>
                                                    Edit
                                                </NavLink>  
                                                <NavLink className={'btn btn-danger'} to='/Account/Manage/Admin/Products/Delete' state={{product: product}} key={product.id}>
                                                    Delete
                                                </NavLink>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div className={'form-group'}>
                                <NavLink className={'btn btn-success'} to='/Account/Manage/Admin/Products/Create'>
                                    Create
                                </NavLink>
                                <NavLink className={'btn btn-secondary'} to='/Account/Manage/Admin/Index'>
                                    Back to list
                                </NavLink>
                            </div>
                        </div>
                    )
                    :
                    (
                        <UnauthorizedUserErrorMessage/>
                    )
            )}           
        </>
    )
}