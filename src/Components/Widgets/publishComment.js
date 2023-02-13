import React, { useContext, useState, useEffect } from 'react'
import Context from '../../Context/context'
import { useNavigate } from 'react-router-dom'
import CommentPublicationContext from '../../Context/commentPublicationContext'
export default function PublishComment(props){
    useEffect(() => {
        setIsCommentPublished(false)
    })
    const [complexComment,setComplexComment] = useState({
        content: "",
        productId: props.productId
    })
    const navigate = useNavigate()
    const [isAnyErrors, setIsAnyErrors] = useState(false)
    const [requestResultHolder, setRequestResultHolder] = useState('')
    const errorHolderClassName = 'text-danger'
    const {SignedIn} = useContext(Context)
    const {IsCommentPublished} = useContext(CommentPublicationContext)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const [isCommentPublished, setIsCommentPublished] = IsCommentPublished
    const submit = async (e) => {
        e.preventDefault()
        if(!isSignedIn){
            return navigate('/Account/Login')
        }
        await fetch(`https://localhost:7104/api/Comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
            },
            body: JSON.stringify(complexComment)
        }).then(response => {
            if(response.status === 204){            
                setIsAnyErrors(false)
                setComplexComment((prevState) => ({...prevState, content: ''}))
            }
            else if(response.status !== 204){

                response.json().then(data => {
                    var errors = ""
                    for(const value of data){
                        errors = errors.concat(`${value}`)
                    }
                    setIsAnyErrors(true)                
                    setRequestResultHolder(errors) 
                }).catch(e => {
                    setIsAnyErrors(true)                
                    setRequestResultHolder(e) 
                })
            }
        }).catch(e => {
            setIsAnyErrors(true)                
            setRequestResultHolder(e) 
        })
        return setIsCommentPublished(true)
    }
    return(
        <>
            <form onSubmit={submit} className={'mb-4'}>
                <div className={'form-group'}>
                    <textarea className={'form-control'} placeholder="Join the discussion and leave a comment" rows={3}
                    value={complexComment.content} onChange={e => {
                        setRequestResultHolder('')
                        return setComplexComment((prevState) => ({...prevState, content: e.target.value}))

                    }}></textarea>                
                </div>
                <span className={errorHolderClassName}>{requestResultHolder}</span>
                <div className={'form-floating'}>
                    <button className={'btn btn-primary'} type='submit'>Publish</button>
                </div>
                
            </form>
        </>
    )
}