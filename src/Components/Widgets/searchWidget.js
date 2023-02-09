import React, { useContext, useState } from 'react'
import Context from '../../Context/context'
import { useNavigate } from 'react-router-dom'
export default function SearchWidget(){
    const navigate = useNavigate()
    const {SelectedProduct} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = SelectedProduct
    const {SearchSubmited} = useContext(Context)
    const [isSearchSubmited, setIsSearchSubmited] = SearchSubmited
    const [productName, setProductName] = useState('')
    const [isAnyErrors, setIsAnyErrors] = useState(false)
    const [requestResultHolder, setRequestResultHolder] = useState('')
    const errorHolderClassName = 'text-secondary'
    const submit = async (e) => {
        e.preventDefault()
        await fetch(`https://localhost:7104/api/Products/Find/${productName}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(response.status === 200){
                response.json().then(json => {
                    setSelectedProduct(json)
                    setIsSearchSubmited(true)
                    console.log(json)
                    navigate('/Product')
                }).catch(e => console.log(e))
            }
            else if(response.status !== 200){
                response.json().then(data => {
                    var errors = ""
                    for(const value of data){
                        errors = errors.concat(`${value}`)
                    }
                    setIsAnyErrors(true)                
                    setRequestResultHolder(errors) 
                }).catch(e => {
                    console.log(e)
                    setIsAnyErrors(true)                
                    setRequestResultHolder(e) 
                })
            }
        }).catch(e => {
            setIsAnyErrors(true)                
            setRequestResultHolder(e) 
        })
    }
    return (
        <div className={'card mb-4'}>
            <div className={'card-header'}>Search</div>
                <div className={'card-body'}>
                    <form method="post" className={'input-group'} onSubmit={submit}> 
                        <input className={'form-control'} type="text" placeholder="Enter product's name..." value={productName} onChange={e => {
                            setRequestResultHolder('')
                            return setProductName(e.target.value)
                            }
                        }/>
                        <button className={'btn btn-secondary'} id="button-search" type="submit">Search</button>
                    </form>
                    <span className={errorHolderClassName}>{requestResultHolder}</span>
            </div>
        </div>
    )
}