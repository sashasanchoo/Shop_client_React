import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context';

export default function Login(){
    const {SignedIn} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn

    const [localErrorHolder, setLocalErrorHolder] = useState('')

    const [credentialsHolder, setCredentialsHolder] = useState({
        emailaddress: "",
        password: ""
    })
    const [isRequrestSubmited, setIsRequestSubmited] = useState(false);

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("isRequestSubmited from submitHandler" + isRequrestSubmited)
        setIsRequestSubmited(true)
    }
    
    useEffect(() => {
        console.log(isSignedIn)
        if(isSignedIn){
            navigate('/')     
        }
        if(isRequrestSubmited === true){
            fetch(
                `https://localhost:7104/api/Users/BearerToken`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentialsHolder)
            }).then(response => {
                if(response.status === 200){
                    response.json().then(json => {
                        const JWTValue = `${json["token"]}`;
                        const JWTExpiration = `${json["expiration"]}`
                        console.log(json['expiration'])
                        localStorage.setItem(process.env.REACT_APP_JWT_KEY, JWTValue);                       
                        localStorage.setItem(process.env.REACT_APP_JWT_EXPIRATON, JWTExpiration)       
                        setIsSignedIn(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true))            
                        navigate('/Account/Manage/Index')
                    })                  
                }
                if(response.status !== 200){
                    response.text().then(data => {
                        throw new Error(data);
                    }).catch(e => {
                        setLocalErrorHolder(`${e}`)
                    });
                }
            }).catch((e) => {
                navigate('/error-page')
                console.log(e)
            })
            }
        return () => {
            console.log("isRequestSubmited from useEffect cleaning resources" + isRequrestSubmited)
            setIsRequestSubmited(false)
        }
    }, [isRequrestSubmited])
    return(
        <div className={'row'}>
            <div className={'col-md-4'}>
                <section>
                    <form onSubmit={submitHandler}>
                    <div className={'form-floating'}>
                        <label className={'form-label'}>Email</label>
                        <input className={'form-control'} value={credentialsHolder.emailaddress} onChange={e => {
                            return setCredentialsHolder((prevState) => ({
                            ...prevState,
                            emailaddress: e.target.value
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
                    <span className={'text-danger'}>{localErrorHolder}</span>
                    <div>
                        <button type='submit' className={'w-100 btn btn-lg btn-primary'}>Login</button>
                    </div>
                    </form>               
                </section>              
            </div>
        </div>
    )
}