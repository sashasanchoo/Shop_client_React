import React, {useContext} from 'react'
import Context from '../context'
import { NavLink } from 'react-router-dom'
import LoginPartial from './loginpartial'

export default function Navbar(){
    const {SelectedCategory} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = SelectedCategory
    //if clear unused selectedCategory it invokes re-render of page
    const refreshSelectedCategory = () => {
        setSelectedCategory('')
    }
    return(
        <>
            <nav className={'navbar navbar-expand-lg navbar-dark bg-dark'}>
                <div className={'container-fluid'}>
                <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className={"navbar-toggler-icon"}></span></button>
                    <div className={'collapse navbar-collapse d-sm-inline-flex justify-content-between'} id="navbarSupportedContent">
                        <ul className={'navbar-nav ms-auto mb-2 mb-lg-0'}>
                            <li className={'nav-item'}>
                                <NavLink to='/' className={'navbar-brand text-white'} onClick={refreshSelectedCategory}>
                                    Home
                                </NavLink>
                            </li>                               
                            <li className={'nav-item'}>
                                <NavLink to='/redirect' className={'navbar-brand text-white'}>
                                    Redirect
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