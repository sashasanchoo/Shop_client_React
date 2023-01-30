import React, {useEffect, useState} from 'react'
import Navbar from './Components/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Account/register';
import ErrorPage from './pages/error';
import Index from './pages/Account/Manage';
import ChangePassword from './pages/Account/Manage/changepassword';
import Context from './context';
import LogOut from './pages/Account/logout';
import Login from './pages/Account/login';
import Product from './Components/detailedProduct';
import ProductList from './Components/productList';

function App() {
  const [Products, setProducts] = useState([])
  const [Categories, setCategories] = useState([])
  const [isSignedIn, setIsSignedIn] = useState(Boolean(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true)))
  const [username, setUsername] = useState()
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isSearchSubmited, setIsSearchSubmited] = useState()

  useEffect(() => {
    fetch(`https://localhost:7104/api/Users`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(process.env.REACT_APP_JWT_KEY)}`
                }}).then(response => 
                    {   
                        if(response.status === 200){
                            response.json()
                            .then(json => {
                              setIsSignedIn(true)
                              setUsername(json['userName'])
                            })
                            .catch(e => console.log(e))
                        }
                        else if(response.status !== 200){
                          setIsSignedIn(false)
                        }
                    })           
                .catch(e => {
                    setIsSignedIn(false)
                    console.log(e)
                })
  }, [isSignedIn])
  return (
    <>
    <Context.Provider value={{SignedIn: [isSignedIn, setIsSignedIn], ContextUsername: [username, setUsername],
    SelectedProduct: [selectedProduct, setSelectedProduct], SearchSubmited: [isSearchSubmited, setIsSearchSubmited],
    ContextProducts: [Products, setProducts], ContextCategories: [Categories, setCategories],
    SelectedCategory: [selectedCategory, setSelectedCategory]}}>
      <Router>
        <Navbar/>
        <Routes>
              <Route path='/' element={<ProductList/>}/>
              <Route path='/Account/Login' element={<Login/>}/>
              <Route path='/Account/Logout' element={<LogOut/>}/>
              <Route path='/Account/Register' element={<Register/>}/>
              <Route path='/error-page' element={<ErrorPage/>}/>
              <Route path='/redirect' element={<Navigate to='/error-page'/>}/>
              <Route path='/Account/Manage/Index' element={<Index/>}/>
              <Route path='/Account/Manage/ChangePassword' element={<ChangePassword/>}/>
              <Route path='/Product' element={<Product/>}/>
        </Routes>   
        </Router>
      </Context.Provider>
    </>   
  );
}

export default App;
