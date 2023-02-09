import React, {useEffect, useContext, useState} from 'react'
import Context from '../../Context/context'
import Order from './order'
import SearchWidget from '../Widgets/searchWidget'
import OrderFormVisibilityContext from '../../Context/orderFormVisibilityContext'
import CommentPublicationContext from '../../Context/commentPublicationContext'
import PublishComment from '../Widgets/publishComment'
import ConcreteProductComments from '../Widgets/concreteProductComments'
import { useNavigate } from 'react-router-dom'

export default function Product(){ 
    const navigate = useNavigate()
    const {SelectedProduct, RequestResultHolder} = useContext(Context)
    const [selectedProduct, setSelectedProduct] = SelectedProduct
    const {SearchSubmited} = useContext(Context)
    const [isSearchSubmited, setIsSearchSubmited] = SearchSubmited
    const [isOrderFormOpened, setIsOrderFormOpened] = useState(false)
    const [isCommentPublished, setIsCommentPublished] = useState(false)

    //errorHandling
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder
    useEffect(() => {
        //Attempt to get product not by using UI or by any other unexpected way
        if(!selectedProduct)
        {
            return navigate('/')
        }
        //If required product obtained from search request and 
        //checking below must prevent unexpected updating data
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
                    .catch(e => {
                        setRequestResultHolder(e.message) 
                        navigate('/Error')
                    })
                }
                else if(response.status !== 200){

                    response.json().then(data => {
                        var errors = ""
                        for(const value of data){
                            errors = errors.concat(`${value}`)
                        }
                        setRequestResultHolder(errors) 
                        navigate('/Error')
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
        
        return () => {
            if(isSearchSubmited){
                setIsSearchSubmited(!isSearchSubmited)
            }
        }
    }, [isCommentPublished])
    return(
        <> 
        <OrderFormVisibilityContext.Provider value={{IsOrderFormOpened: [isOrderFormOpened, setIsOrderFormOpened]}}>
            <CommentPublicationContext.Provider value={{IsCommentPublished: [isCommentPublished, setIsCommentPublished]}}>
                {selectedProduct ? 
                (<div className={'container mt-5'}>
                        <div className={'row'}>
                            <div className={'col-lg-8'}>
                                <article >
                                    <header className={'mb-4'}>
                                        <h1 className={'fw-bolder mb-1 d-sm-flex justify-content-between'}>
                                            {selectedProduct.name}
                                        </h1>
                                        <div className={'text-muted fst-italic mb-2'}>
                                            {new Date(selectedProduct.published).toLocaleDateString()}
                                        </div>
                                    </header>
                                    <figure className={'mb-4'}>
                                        <img style={{height:"80%", width: "100%"}}  className={'img-fluid rounded'} src={`https://localhost:7104/images/${selectedProduct.imagePath}`} alt="..."></img>
                                        <figcaption className={'fs-5 mb-4'}>{selectedProduct.content}</figcaption>
                                    </figure>
                                </article>
                                <section className={'mb-5'}>
                                <div className={'card bg-light'}>
                                    <div className={'card-body'}>
                                        <PublishComment productId={selectedProduct.id}/>
                                        <ConcreteProductComments productId={selectedProduct.id} comments={selectedProduct.comments}/>
                                    </div>
                                </div>
                            </section>
                            </div>
                            <div className={'col-lg-4'}>                        
                                <div className={'card mb-4'}>
                                    <button style={{fontSize: "1.5rem"}} className={'btn btn-outline-secondary fw-bolder'} onClick={() => setIsOrderFormOpened(true)}>Make an order</button>     
                                </div>
                                <SearchWidget/>
                            </div>                 
                            <div className={'col-lg-5'}>
                                {isOrderFormOpened && <Order product={selectedProduct}/>}
                            </div>
                        </div>
                    </div>) : (navigate('/'))}
            </CommentPublicationContext.Provider>
        </OrderFormVisibilityContext.Provider> 
        </>   
    )
}