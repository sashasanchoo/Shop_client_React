import React, { useEffect, useState, useContext} from 'react'
import CommentPublicationContext from '../../Context/commentPublicationContext'
export default function ConcreteProductComments(props){
    const [lastCommentNumber, setLastCommentNumber] = useState(process.env.REACT_APP_COMMENTS_TO_SHOW)
    const commentsToRender = props.comments.slice(0, lastCommentNumber)
    const {IsCommentPublished} = useContext(CommentPublicationContext)
    const [isCommentPublished, setIsCommentPublished] = IsCommentPublished

    useEffect(() => {
        if(isCommentPublished)
        {
            setLastCommentNumber(props.comments.length + 1)
        }
    }, [isCommentPublished])
    return(
        <>
            {commentsToRender.map((comment, index) => {
                return  <div className={'d-flex'} key={comment.id}>
                            <div className={'flex-shrink-0'}><img className={'rounded-circle'} src={`https://dummyimage.com/50x50/ced4da/6c757d.jpg`} alt="..."></img></div>
                            <div className={'ms-3'}>
                                <div className={'fw-bold'}>{comment.username} <span className={'text-muted fst-italic mb-2'}>{new Date(comment.published).toLocaleDateString()}</span></div>
                                {comment.content}
                            </div>
                        </div>
            })}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {lastCommentNumber < props.comments.length ? (
            <button  className={'btn btn-secondary'} onClick={() => setLastCommentNumber(lastCommentNumber + process.env.REACT_APP_COMMENTS_TO_SHOW)}>Load more</button>) 
            : 
            (props.comments.length > process.env.REACT_APP_COMMENTS_TO_SHOW && (<button className={'btn btn-secondary'} onClick={() => setLastCommentNumber(3)}>Hide</button>))}
            </div>
           
            
        </>
    )
}