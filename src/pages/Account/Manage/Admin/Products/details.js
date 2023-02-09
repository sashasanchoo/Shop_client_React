import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
export default function AdminPanelProductsDetailsPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const [product, setProduct] = useState({
        name: "",
        published: "",             
        imagePath: "",        
        content: "",         
        price: "",       
        category: {}
    })

    const {IsInAdminRole, RequestResultHolder} = useContext(Context)
    const [isInAdminRole, setIsInAdminRole] = IsInAdminRole
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder

    useEffect(() => {
        if(!state){
            return navigate('/Account/Manage/Admin/Products')
        }
        fetch(`https://localhost:7104/api/Products/${state.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            }
        }).then(response => {
            if(response.status === 200){
                response.json().then(data => {
                    setProduct(data)
                }).catch(e => {
                    setRequestResultHolder(e.message) 
                    navigate('/Error')
                })
            }
        }).catch(e => {
            setRequestResultHolder(e.message) 
            navigate('/Error')
        })
    }, [])
    return(
        <>
            {isInAdminRole ? 
            (
                <>
                    <dl className={'row'}>
                        <dt className={'col-sm-2'}>Name</dt>
                        <dd className={'col-sm-10'}>{product.name}</dd>
                        <dt className={'col-sm-2'}>Published</dt>
                        <dd className={'col-sm-10'}>{new Date(product.published).toLocaleDateString()}</dd>
                        <dt className={'col-sm-2'}>Image path</dt>
                        <dd className={'col-sm-10'}>{product.imagePath}</dd>
                        <dt className={'col-sm-2'}>Content</dt>
                        <dd className={'col-sm-10'}>{product.content}</dd>
                        <dt className={'col-sm-2'}>Price</dt>
                        <dd className={'col-sm-10'}>{product.price}</dd>
                        <dt className={'col-sm-2'}>Category</dt>
                        <dd className={'col-sm-10'}>{product.category.name}</dd>
                    </dl>
                    <table className={'table table-bordered'}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Content</th>
                                <th>Published</th>
                                <th></th>
                            </tr>        
                        </thead>
                        <tbody>
                            {product.comments && product.comments.map((comment, index) => {
                                return <tr key={comment.id}>
                                            {<td>{comment.id}</td>}
                                            <td>{comment.content}</td>
                                            <td>{new Date(comment.published).toLocaleDateString()}</td>
                                            <td>
                                                <NavLink className={'btn btn-danger'} to='/Account/Manage/Admin/Products/DeleteProductConcreteComment' state={{comment: comment, product: product}}>
                                                    Delete
                                                </NavLink>
                                            </td>
                                        </tr>
                            })}
                        
                        </tbody>
                    </table> 
                    <NavLink className={'btn btn-secondary'} to='/Account/Manage/Admin/Products'>
                        Back to list
                    </NavLink>
                </>
            )
            :
            (
                <UnauthorizedUserErrorMessage/>
            )}


        </>
    )
}


   
           