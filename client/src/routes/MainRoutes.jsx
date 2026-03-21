import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Account from '../pages/Account'
import UserProfile from '../pages/UserProfile'
import Wishlist from '../pages/Wishlist'
import Orders from '../pages/Orders'
import ForgotPass from '../pages/ForgotPass'
import OTPVerification from '../pages/OtpVerification'
import ResetPassword from '../components/ResetPassword'
const MainRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/forgot-password' element={<ForgotPass />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path='/profile' element={<UserProfile />}></Route>
            <Route path='/verify-otp' element={<OTPVerification/>} ></Route>
            <Route path='/reset-password' element={<ResetPassword />} ></Route>
            
            <Route path='/wishlist' element={<Wishlist />}></Route>
            <Route path='/orders' element={<Orders />}></Route>


         </Routes>
    )
}

export default MainRoutes;