import React, { useEffect} from 'react'
export default function ConcreteProductComments(props){
    useEffect(() => {}, [])
    return(
        <>
            {props.comments.map((comment, index) => {
                return  <div className={'d-flex'} key={comment.id}>
                            <div className={'flex-shrink-0'}><img className={'rounded-circle'} src={`https://dummyimage.com/50x50/ced4da/6c757d.jpg`} alt="..."></img></div>
                            <div className={'ms-3'}>
                                <div className={'fw-bold'}>{comment.username} <span className={'text-muted fst-italic mb-2'}>{new Date(comment.published).toLocaleDateString()}</span></div>
                                {comment.content}
                            </div>
                        </div>
            })}
        </>
    )
}