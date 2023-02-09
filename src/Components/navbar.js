import React, {useContext} from 'react'
import Context from '../Context/context'
import { NavLink } from 'react-router-dom'
import LoginPartial from './loginpartial'
import CustomDropDownButton from './navbarButton'

export default function Navbar(){
    const {SelectedCategory} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = SelectedCategory
    //If setting selected category state as empty string
    //it means that all products must to be shown and unsorted
    //and as a result invokes a render of ProductsList component due it's 
    //useEffect() has dependency on 'selectedCategory' state
    const refreshSelectedCategory = () => {
        setSelectedCategory('')
    }
    return(
        <>
            <nav className={'navbar navbar-expand-sm navbar-dark bg-dark'}>
                <div className={'container-fluid'}>
                    <CustomDropDownButton />
                    <div className={'collapse navbar-collapse d-sm-inline-flex justify-content-between'} id={"navbarSupportedContent"}>
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <NavLink to='/' className={'navbar-brand text-white'} onClick={refreshSelectedCategory}>
                                    Home
                                </NavLink>
                            </li>                                                                            
                        </ul>
                        <LoginPartial/>
                    </div>
                </div>
            </nav>          
        </>
    )
}