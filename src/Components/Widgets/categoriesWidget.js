import React, { useContext } from 'react'
import Context from '../../Context/context'
export default function CategoriesWidget(props){

    const {SelectedCategory} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = SelectedCategory
    //Select concrete category by clicking widget item
    const selectCategory = (categoryName) => {
        setSelectedCategory('/' + categoryName)
    }
    return(
        <>
            <div className={'card mb-4'}>
                <div className={'card-header'}>Categories</div>
                <div className={'card-body'}>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', alignItems: 'flex-start'}}>
                        {props.categories.map((category) => {
                                return <button style={{margin: 1}} className={'btn btn-light'} key={category.id} onClick={() => {                                          
                                    selectCategory(category.name)
                                }}>{category.name}</button>
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}