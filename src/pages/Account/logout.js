import { useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../../context'

export default function LogOut(){
    const {SignedIn, ContextUsername} = useContext(Context)
    const [isSignedIn, setIsSignedIn] = SignedIn
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem(process.env.REACT_APP_JWT_KEY)
        localStorage.removeItem(process.env.REACT_APP_JWT_EXPIRATON) 
        setIsSignedIn(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true))
        console.log(isSignedIn)
        navigate('/Account/Login')
    })
}