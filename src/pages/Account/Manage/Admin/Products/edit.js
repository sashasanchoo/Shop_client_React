import React, { useEffect, useState, useContext } from 'react'
import Context from '../../../../../Context/context'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import UnauthorizedUserErrorMessage from '../../../../../Components/unauthorizedUserMessage'
export default function AdminPanelProductsEditPage(){
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const [selectedFile, setSelectedFile] = useState()
    const [product, setProduct] = useState(state ? 
        {
            id: state.product.id,
            name: state.product.name,
            published: new Date(state.product.published).toLocaleDateString(),
            imagePath: state.product.imagePath,
            content: state.product.content,
            price: state.product.price,
            categoryName: state.product.category.name
        }: 
        {
            id: "",
            name: "",
            published: "",
            imagePath: "",
            content: "",
            price: "",
            categoryName: ""
        })

        const {IsInAdminRole} = useContext(Context)
        const [isInAdminRole, setIsInAdminRole] = IsInAdminRole

        const [isAnyErrors, setIsAnyErrors] = useState(false)
        const [localRequestResultHolder, setLocalRequestResultHolder] = useState('')
        const errorHolderClassName = isAnyErrors? 'text-danger' : 'text-success'
        const submit = async (e) => {
            e.preventDefault()
            const formData = new FormData()
            formData.append("DataFile", selectedFile)
            formData.append("Product.Id", product.id)
            formData.append("Product.Name", product.name)
            formData.append("Product.Published", product.published)
            formData.append("Product.ImagePath", product.imagePath)
            formData.append("Product.Content", product.content)
            formData.append("Product.Price", product.price)
            formData.append("Product.CategoryName", product.categoryName)
            
            await fetch(`https://localhost:7104/api/Products/${product.id}`,{
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
                },
                body: formData
            }).then(response => {
                if(response.status === 204){
                    setIsAnyErrors(false)  
                    setLocalRequestResultHolder('Successfuly updated')
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
        const selectFile = (event) => {
            setSelectedFile(event.target.files[0])
        }
        useEffect(() => {
            if(!state){
                return navigate('/Account/Manage/Admin/Products')
            }
        })
        return(
            <>
                {isInAdminRole ? 
                (
                    <form onSubmit={submit} encType="multipart/form-data">
                    <div className="form-group">
                        <label className={'form-label'}>Name</label>
                        <input className={'form-control'} value={product.name} onChange={e => {
                                    setLocalRequestResultHolder('')
                                    return setProduct((prevState) => ({...prevState, name: e.target.value}))}
                        }/>
                    </div>
                    <div className="form-group">
                        <label className={'form-label'}>Published</label>
                        <input type="date" className={'form-control'} onChange={e => {
                                    setLocalRequestResultHolder('')
                                    return setProduct((prevState) => ({...prevState, published: e.target.value}))
                        }}/>
                    </div>
                    <div className="form-group">
                        <label className={'form-label'}>Image</label>
                        <input id="image" name="image" type="file" className={'form-control'} onChange={e => {
                            selectFile(e)
                            return setProduct((prevState) => ({...prevState, imagePath: e.target.files[0].name}))
                        }}/>
                    </div> 
                    <div className="form-group">
                        <label className={'form-label'}>Content</label>
                        <input className={'form-control'} value={product.content} onChange={e => {
                                    setLocalRequestResultHolder('')
                                    return setProduct((prevState) => ({...prevState, content: e.target.value}))
                        }}/>
                    </div>
                    <div className="form-group">
                        <label className={'form-label'}>Price</label>
                        <input className={'form-control'} value={product.price} onChange={e => {
                                    setLocalRequestResultHolder('')
                                    return setProduct((prevState) => ({...prevState, price: e.target.value}))
                        }}/>
                    </div>
                    <div className="form-group">
                        <label className={'form-label'}>Category name</label>
                        <input className={'form-control'} value={product.categoryName} onChange={e => {
                                    setLocalRequestResultHolder('')
                                    return setProduct((prevState) => ({...prevState, categoryName: e.target.value}))
                        }}/>
                    </div>
                    <span className={errorHolderClassName}>{localRequestResultHolder}</span>
                    <div className="form-floating">
                        <button type="submit" class="btn btn-success">Update</button>
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