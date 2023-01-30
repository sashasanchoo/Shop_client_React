import React, { useContext, useState } from 'react'
import Context from '../context'
import { useNavigate } from 'react-router-dom'
export default function SearchWidget(){
    const navigate = useNavigate()
    const {SelectedProduct} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = SelectedProduct
    const {SearchSubmited} = useContext(Context)
    const [isSearchSubmited, setIsSearchSubmited] = SearchSubmited
    const [productName, setProductName] = useState('')
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
        }).catch(e => console.log(e))
    }
    return (
        <div className={'card mb-4'}>
            <div className={'card-header'}>Search</div>
                <div className={'card-body'}>
                    <form method="post" className={'input-group'} onSubmit={submit}> 
                        <input className={'form-control'} type="text" placeholder="Enter search term..." value={productName} onChange={e => {
                            return setProductName(e.target.value)
                            }
                        }/>
                        <button className={'btn btn-primary'} id="button-search" type="submit">Search</button>
                    </form>
            </div>
        </div>
    )
}