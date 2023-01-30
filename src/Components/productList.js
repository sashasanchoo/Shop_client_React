import React, { useContext, useEffect } from 'react'
import Context from '../context'
import CommonProduct from './commonProduct'
import Header from './header'
import SearchWidget from './searchWidget'
export default function ProductList(props){ 
    const {ContextProducts} = useContext(Context)
    const [Products, setProducts] = ContextProducts
    const {ContextCategories} = useContext(Context)
    const [Categories, setCategories] = ContextCategories
    const {SelectedCategory} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = SelectedCategory
    const submit = (categoryName) => {
        setSelectedCategory('/' + categoryName)
    }
    useEffect(() => {
        console.log(selectedCategory)
        fetch(`https://localhost:7104/api/Products${selectedCategory}`,{
          method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
        }).then(response => {
          if(response.status === 200){
            response.json().then(json => {
              setProducts(json['products'])
              setCategories(json['categories'])
              console.log(json)
            })
            .catch(e => console(e))
          }
        }).catch(e => console.log(e))
      }, [selectedCategory])
    return(
        <>
         <Header/>
        <div className={'container mt-5'}>
            <div className={'row'}>
                <div className={'col-lg-8'}>
                    <div className={'row'}>
                        {Products.map((product, index) => {
                            return <CommonProduct product={product} key={product.id}/>
                        })}
                        {/*pagination */}
                    </div>     
                </div>
                <div className={'col-lg-4'}>
                    {/*search widget*/}
                    <SearchWidget/>
                    {/*caregories widget */}
                    <div className={'card mb-4'}>
                        <div className={'card-header'}>Categories</div>
                        <div className={'card-body'}>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', alignItems: 'flex-start'}}>
                                {Categories.map((category) => {
                                        return <button style={{margin: 1}} className={'btn btn-light'} key={category.id} onClick={() => {                                          
                                            submit(category.name)
                                        }}>{category.name}</button>
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                {/*widgets */}
            </div>    
      </div>  
        </>       
    )
}