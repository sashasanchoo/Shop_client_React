import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from './Account/register'
import Index from './Account/Manage';
import ChangePassword from './Account/Manage/changepassword';
import LogOut from './Account/logout';
import Login from './Account/login';
import Product from '../Components/Product/detailedProduct';
import ProductList from '../Components/Product/productList';
import Order from '../Components/Product/order'
import AdminPanelIndex from './Account/Manage/Admin';
import AdminPanelCategoriesIndexPage from './Account/Manage/Admin/Categories'
import AdminPanelCategoriesCreatePage from './Account/Manage/Admin/Categories/create';
import AdminPanelCategoriesDeletePage from './Account/Manage/Admin/Categories/delete';
import AdminPanelCategoriesEditPage from './Account/Manage/Admin/Categories/edit';
import AdminPanelProductsIndexPage from './Account/Manage/Admin/Products';
import AdminPanelProductsCreatePage from './Account/Manage/Admin/Products/create';
import AdminPanelProductsEditPage from './Account/Manage/Admin/Products/edit';
import AdminPanelProductsDeletePage from './Account/Manage/Admin/Products/delete';
import AdminPanelProductsDetailsPage from './Account/Manage/Admin/Products/details';
import AdminPanelDeleteConcreteCommentPage from './Account/Manage/Admin/Comments/delete';
import ErrorHandler from './errorHandler';
import AboutPage from './about';
import PrivacyPage from './privacy';
export default function RoutesProvider(){
    return(
        <>
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
                <Route path='/About' element={<AboutPage/>}/>
                <Route path='/Privacy' element={<PrivacyPage/>}/>
            </Routes> 
        </>
    )
}