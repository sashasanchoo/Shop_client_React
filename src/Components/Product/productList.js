import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../Context/context'
import CommonProduct from './commonProduct'
import PageManager from '../helpers/pageManager'
import CategoriesWidget from '../Widgets/categoriesWidget'
import SearchWidget from '../Widgets/searchWidget'
import Loader from '../helpers/loader'

export default function ProductList(){ 

    const [loading, setLoading] = useState(true)
    //Items for products managing
    const [Products, setProducts] = useState([])
    const [Categories, setCategories] = useState([])
    const {SelectedCategory,RequestResultHolder} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = SelectedCategory

    //Items for pages managing
    const allProductsCount = Products.length
    const [currentPage, setCurrentPage] = useState(1)
   
    const [productsPerPage, setProductsPerPage] = useState(process.env.REACT_APP_PRODUCTS_PER_PAGE)
    const currentPageLastProductNumber = currentPage * productsPerPage
    const currentPageFirstProductIndex = currentPageLastProductNumber - productsPerPage
    const limitedCurrentPageProducts = Products.slice(currentPageFirstProductIndex, currentPageLastProductNumber)

    //Items for handling errors
    const navigate = useNavigate()
    const [requestResultHolder, setRequestResultHolder] = RequestResultHolder

    useEffect(() => {
        fetch(`https://localhost:7104/api/Products${selectedCategory}`,{
          method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
        }).then(response => {
          if(response.status === 200){
            response.json().then(json => {
              setProducts(json)
              setLoading(false)
            })
            .catch(e => {
              setRequestResultHolder(e.message)
              navigate('/Error')
            })
          }
        }).catch(e => {
          setRequestResultHolder(e.message)
          navigate('/Error')
        })
        fetch(`https://localhost:7104/api/Categories`,{
          method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
        }).then(response => {
          if(response.status === 200){
            response.json().then(json => {          
              setCategories(json)
            })
            .catch(e => {
              setRequestResultHolder(e.message)
              navigate('/Error')
            })
          }
        }).catch(e => {
          setRequestResultHolder(e.message)
          navigate('/Error')
        })
      }, [selectedCategory])
    return(
        <>
        {loading ? <Loader/> : (
          <>
                    <div className={'col-lg-8'}>
                    <div className={'row'}>
                        {limitedCurrentPageProducts.map((product, index) => {
                            return <CommonProduct product={product} key={product.id}/>
                        })}                       
                        
                    </div>    
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PageManager
                          itemsCount={allProductsCount}
                          itemsPerPage={productsPerPage}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          alwaysShown={false}
                        />
                    </div>
                    
                </div>
                <div className={'col-lg-4'}>
                    <SearchWidget/>
                    <CategoriesWidget categories={Categories}/>
                </div>
          </>
        )}
        
        </>       
    )
}