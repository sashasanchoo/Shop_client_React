import React, { useEffect, useState } from 'react'


export default function Register(){

    const [credentialsHolder, setCredentialsHolder] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const [isRequestSubmited, setIsRequestSubmited] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setIsRequestSubmited(true)
        console.log("isRequestSubmited from submitHandler" + isRequestSubmited)
    }
    const clearInputs = () => {
        setCredentialsHolder({
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        })
    }

    useEffect(() => {
        if(isRequestSubmited === true){
            fetch(
                `https://localhost:7104/api/Users`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentialsHolder)
            }).then(response => {
                if(response.status === 200 || response.status === 201){
                    clearInputs()
                    response.json().then(user => {
                        console.log(user);                     
                    })
                }
                if(response.status !== 200){
                    response.text().then(data => {
                        console.log(data)
                        throw new Error(data);
                        
                    }).catch(e => console.log(e));
                }
            })
        }
        return () => {
            setIsRequestSubmited(false)
            console.log("isRequestSubmited from useEffect cleaning resources" + isRequestSubmited)
        }
    }, [isRequestSubmited])

    return(
        <div className={'row'}>
            <div className={'col-md-4'}>
                <section>
                    <form onSubmit={submitHandler}>
                    <div className={'form-floating'}>
                        <label className={'form-label'}>Username</label>
                        <input className={'form-control'} value={credentialsHolder.username} onChange={e => {
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            username: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className={'form-floating'}>
                        <label className={'form-label'}>Email</label>
                        <input className={'form-control'} value={credentialsHolder.email} onChange={e => {
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            email: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className={'form-floating'}>
                        <label className={'form-label'}>Password</label>
                        <input className={'form-control'} value={credentialsHolder.password} type='password' onChange={e => {
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            password: e.target.value
                        }))}
                        }/>
                    </div>
                    <div className={'form-floating'}>
                        <label className={'form-label'}>Confirm password</label>
                        <input className={'form-control'} value={credentialsHolder.confirmpassword} type='password' onChange={e => {
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            confirmpassword: e.target.value
                        }))}
                        }/>
                    </div>
                    <div>
                        <button type='submit' className={'w-100 btn btn-lg btn-primary'}>Register</button>
                    </div>
                    </form>
                    
                </section>
                
            </div>

        </div>
    )
}