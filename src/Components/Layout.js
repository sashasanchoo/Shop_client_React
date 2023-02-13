import React from 'react'
import Footer from './footer'
import Header from './header'
export default function Layout({children}){
    return(
        <>
            <Header/>
            <main>
                <div className={"container mt-5"}>
                    <div className={'row'}>
                        {children}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}