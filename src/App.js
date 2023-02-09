import React, {useEffect, useState} from 'react'
import Navbar from './Components/navbar';
import { Routes, Route, useNavigate, Router } from 'react-router-dom';
import Register from './pages/Account/register';
import Index from './pages/Account/Manage';
import ChangePassword from './pages/Account/Manage/changepassword';
import Context from './Context/context';
import LogOut from './pages/Account/logout';
import Login from './pages/Account/login';
import Product from './Components/Product/detailedProduct';
import ProductList from './Components/Product/productList';
import Order from './Components/Product/order';
import AdminPanelIndex from './pages/Account/Manage/Admin';
import AdminPanelCategoriesIndexPage from './pages/Account/Manage/Admin/Categories';
import AdminPanelCategoriesCreatePage from './pages/Account/Manage/Admin/Categories/create';
import AdminPanelCategoriesDeletePage from './pages/Account/Manage/Admin/Categories/delete';
import AdminPanelCategoriesEditPage from './pages/Account/Manage/Admin/Categories/edit';
import AdminPanelProductsIndexPage from './pages/Account/Manage/Admin/Products';
import AdminPanelProductsCreatePage from './pages/Account/Manage/Admin/Products/create';
import AdminPanelProductsEditPage from './pages/Account/Manage/Admin/Products/edit';
import AdminPanelProductsDeletePage from './pages/Account/Manage/Admin/Products/delete';
import AdminPanelProductsDetailsPage from './pages/Account/Manage/Admin/Products/details';
import AdminPanelDeleteConcreteCommentPage from './pages/Account/Manage/Admin/Comments/delete';
import ErrorHandler from './pages/errorHandler';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(Boolean(localStorage[process.env.REACT_APP_JWT_EXPIRATON] === undefined ? false : (Date.now() > Date.parse(localStorage[process.env.REACT_APP_JWT_EXPIRATON]) ? false : true)))
  const [username, setUsername] = useState()
  const [selectedProduct, setSelectedProduct] = useState()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isSearchSubmited, setIsSearchSubmited] = useState()
  const [isInAdminRole, setIsInAdminRole] = useState(false)
  const [requestResultHolder, setRequestResultHolder] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if(isSignedIn){
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
                    .catch(e => {
                      setRequestResultHolder(e.message)
                      navigate('/Error')
                    })
                }
                else if(response.status !== 200){
                  setIsSignedIn(false)
                }
            })           
            .catch(e => {
              setRequestResultHolder(e.message)
              navigate('/Error')
            })
    }

  }, [isSignedIn])
  return (
    <>
    <Context.Provider value={{SignedIn: [isSignedIn, setIsSignedIn], ContextUsername: [username, setUsername],
    SelectedProduct: [selectedProduct, setSelectedProduct], SearchSubmited: [isSearchSubmited, setIsSearchSubmited],
    SelectedCategory: [selectedCategory, setSelectedCategory], IsInAdminRole: [isInAdminRole, setIsInAdminRole],
    RequestResultHolder: [requestResultHolder, setRequestResultHolder]}}>
      <Navbar/>
        <Routes>
              <Route path='/' element={<ProductList/>}/>
              <Route path='/Account/Login' element={<Login/>}/>
              <Route path='/Account/Logout' element={<LogOut/>}/>
              <Route path='/Account/Register' element={<Register/>}/>
              <Route path='/Account/Manage/Index' element={<Index/>}/>
              <Route path='/Account/Manage/ChangePassword' element={<ChangePassword/>}/>
              <Route path='/Product' element={<Product/>}/>
              <Route path='/Modal' element={<Order/>}/>
              <Route path='/Account/Manage/Admin/Index' element={<AdminPanelIndex/>}/>
              <Route path='/Account/Manage/Admin/Categories' element={<AdminPanelCategoriesIndexPage/>}/>
              <Route path='/Account/Manage/Admin/Categories/Create' element={<AdminPanelCategoriesCreatePage/>}/>
              <Route path='/Account/Manage/Admin/Categories/Delete' element={<AdminPanelCategoriesDeletePage/>}/>
              <Route path='/Account/Manage/Admin/Categories/Edit' element={<AdminPanelCategoriesEditPage/>}/>
              <Route path='/Account/Manage/Admin/Products' element={<AdminPanelProductsIndexPage/>}/>
              <Route path='/Account/Manage/Admin/Products/Create' element={<AdminPanelProductsCreatePage/>}/>
              <Route path='/Account/Manage/Admin/Products/Edit' element={<AdminPanelProductsEditPage/>}/>
              <Route path='/Account/Manage/Admin/Products/Delete' element={<AdminPanelProductsDeletePage/>}/>
              <Route path='/Account/Manage/Admin/Products/Details' element={<AdminPanelProductsDetailsPage/>}/>
              <Route path='/Account/Manage/Admin/Products/DeleteProductConcreteComment' element={<AdminPanelDeleteConcreteCommentPage/>}/>
              <Route path='/Error' element={<ErrorHandler/>}/>
        </Routes>   
        
      </Context.Provider>
    </>   
  );
}

export default App;
