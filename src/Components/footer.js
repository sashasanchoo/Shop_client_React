import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { NavLink } from 'react-router-dom'
export default function Footer(){
    return(
        <>

        <footer className={"bg-dark mt-5"}>
            <div className={'p-4 pb-0'}>
                <section style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <div className="social">              
                        <a href="https://www.instagram.com/archives_explorer/" className="instagram">
                            <FontAwesomeIcon icon={faInstagram} size="2x"/>
                        </a>
                        <div>
                            <NavLink to='/About' className={"text-center text-white"}>About us</NavLink>
                            <NavLink to='/Privacy' className={"text-center text-white"}>Privacy</NavLink>
                        </div>
                    </div>
                </section>
            </div>
            <div className={"container pb-0"}>
                <p className={"m-0 text-center text-white"}>&copy; Archives Explorer 2023</p>
            </div>
        </footer>
        </>
        
    )
}
