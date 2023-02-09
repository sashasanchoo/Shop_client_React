import React, { useContext, useState } from 'react'
import OrderFormVisibilityContext from '../../Context/orderFormVisibilityContext'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
export default function Order(props){
    const [credentialsHolder, setCredentialsHolder] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        product: props.product
    })
    const [isAnyErrors, setIsAnyErrors] = useState(false)
    const [requestResultHolder, setRequestResultHolder] = useState('')
    const errorHolderClassName = isAnyErrors? 'text-danger' : 'text-success'
    const submit = async (e) => {
        e.preventDefault()        
        console.log(credentialsHolder)
        await fetch(`https://localhost:7104/api/Orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentialsHolder)
        }).then(response => {
            if(response.status === 204){            
                setIsAnyErrors(false)  
                setRequestResultHolder('Success. To get more information please check your email')
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
    }
    const {IsOrderFormOpened} = useContext(OrderFormVisibilityContext)
    const [isOrderFormOpened, setIsOrderFormOpened] = IsOrderFormOpened
    return(
        <>
            {isOrderFormOpened && (
            <>
                <Modal show={isOrderFormOpened} onHide={() => setIsOrderFormOpened(false)}>
                    <Modal.Header>
                        <Modal.Title>Fill the fields below to make an order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={submit}>
                                        <div className={'form-group'}>
                                            <label className={'form-label'}>First name</label>
                                            <input className={'form-control'} value={credentialsHolder.firstname} onChange={e => {
                                                setRequestResultHolder('')
                                                return setCredentialsHolder((prevState) => ({...prevState, firstname: e.target.value}))}
                                            }></input>
                                        </div>
                                        <div className={'form-group'}>
                                            <label className={'form-label'}>Last name</label>
                                            <input className={'form-control'} value={credentialsHolder.lastname} onChange={e => {
                                                setRequestResultHolder('')
                                                return setCredentialsHolder((prevState) => ({...prevState, lastname: e.target.value}))}
                                            }></input>
                                        </div>
                                        <div className={'form-group'}>
                                            <label className={'form-label'}>Email</label>
                                            <input className={'form-control'} value={credentialsHolder.email} onChange={e => {
                                                setRequestResultHolder('')
                                                return setCredentialsHolder((prevState) => ({...prevState, email: e.target.value}))}
                                            }></input>

                                        </div>
                                        <div className={'form-group'}>
                                            <label className={'form-label'}>Address</label>
                                            <input className={'form-control'} value={credentialsHolder.address} onChange={e => {
                                                setRequestResultHolder('')
                                                return setCredentialsHolder((prevState) => ({...prevState, address: e.target.value}))}
                                            }></input>
                                        </div>
                                        <div className={'form-group'}>
                                            <label className={'form-label'}>Contact Phone</label>
                                            <input className={'form-control'} value={credentialsHolder.phone} onChange={e => {
                                                setRequestResultHolder('')
                                                return setCredentialsHolder((prevState) => ({...prevState, phone: e.target.value}))}
                                            }></input>
                                        </div>
                                        <span className={errorHolderClassName}>{requestResultHolder}</span>
                                        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>                                   
                                                <Button variant="secondary" onClick={() => {
                                                setRequestResultHolder('')
                                                setCredentialsHolder({
                                                    firstname: "",
                                                        lastname: "",
                                                        email: "",
                                                        address: "",
                                                        phone: "",
                                                        product: {}
                                                })
                                                setIsOrderFormOpened(false)
                                                }}>Close</Button>
                                                <Button type='submit' variant="success">Order</Button>
                                        </div>
                                    </form> 
                        
                    </Modal.Body>
                </Modal>            
            </>
            )}
        </>
    )
}