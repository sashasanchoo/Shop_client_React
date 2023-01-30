import React from 'react'
export default function Header(){
    return(
        <header className={"py-5 bg-light border-bottom mb-4"}>
        <div className={"container"}>
            <div className={"text-center my-5"}>
                <h1 className={"fw-bolder"}>Archives Explorer</h1>
                <p className={"lead mb-0"}>Archived memories and garments.</p>
            </div>
        </div>
    </header>
    )
}