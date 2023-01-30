import React, {useEffect, useContext} from 'react'
import Context from '../context'
import SearchWidget from './searchWidget'
//work
export default function Product(){ 
    //
    //получаем объект product
    //work
    const {SelectedProduct} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = SelectedProduct
    const {SearchSubmited} = useContext(Context)
    const [isSearchSubmited, setIsSearchSubmited] = SearchSubmited
    //
    useEffect(() => {
        if(!isSearchSubmited)
        {
            fetch(`https://localhost:7104/api/Products/${selectedProduct.id}`,{
                method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                }).then(response => {
                if(response.status === 200){
                    response.json().then(json => {
                    setSelectedProduct(json)
                    })
                    .catch(e => console.log(e))
                }
                }).catch(e => console.log(e))
        }
        
        return () => {
            if(isSearchSubmited){
                setIsSearchSubmited(!isSearchSubmited)
            }
        }
    }, [])
    return(
        <div className={'container mt-5'}>
            <div className={'row'}>
                <div className={'col-lg-8'}>
                    <article>
                        <header className={'mb-4'}>
                            <h1 className={'fw-bolder mb-1 d-sm-flex justify-content-between'}>
                                {selectedProduct.name}
                                <button>Buy</button>
                            </h1>
                            <div className={'text-muted fst-italic mb-2'}>
                                {new Date(selectedProduct.published).toLocaleDateString()}
                            </div>
                            <button className={'badge bg-secondary text-decoration-none link-light'}>{selectedProduct.category.name}</button>
                        </header>
                        <figure className={'mb-4'}>
                            <img className={'img-fluid rounded'} src={`https://localhost:7104/images/${selectedProduct.imagePath}`} alt="..."></img>
                        </figure>
                        <section>                           
                            <p className={'fs-5 mb-4'}>{selectedProduct.content}</p>
                        </section>
                    </article>
                    
                </div>
                <div className={'col-lg-4'}>
                    <SearchWidget/>
                </div>
            </div>
        </div>
        
    )
}