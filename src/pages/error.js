import React from 'react'
export default function ErrorPage({error}){
    return(
        <div>
            <h1 className={'text-danger'}>{error}</h1>
        </div>
    )
}