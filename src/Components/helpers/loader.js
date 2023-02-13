import React from 'react'
export default function Loader(){
    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>        
        </div>
    )
}