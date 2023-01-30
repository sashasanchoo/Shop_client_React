import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../context'
export default function CommonProduct({product}){
    const {SelectedProduct} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = SelectedProduct
    const selectProduct = () => {
        setSelectedProduct(product)
    }
    return(
        <div className={'col-lg-6'}>
            <div className={'card mb-4'}>
                <img style={{height: 350}} className={'card-img-top'} src={`https://localhost:7104/images/${product.imagePath}`} alt="..."></img>
                <div className={'card-body'}>
                    <div className={'small text-muted'}>{new Date(product.published).toLocaleDateString()}</div>
                    <h2 className={'card-title h4'}>{product.name}</h2>
                    <p className={'card-text'}>{product.content}</p>
                    <p></p> 
                    <Link to={{pathname: '/Product'}} className={'btn btn-primary'} onClick={selectProduct}>
                        Read more
                    </Link>                  
                </div>
            </div>
        </div>      
    )
}