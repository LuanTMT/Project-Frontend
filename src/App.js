import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from './Components/pages/Home/Home';
import Login from './Components/pages/Login/Login';
import Register from './Components/pages/Register/Register';
import Footer from './Components/Footer/Footer';
import ProductManager from "./Components/pages/ProductManager/ProductManager";
import UserContext from './Contexts/UserContext';
import { useState } from "react";
import HeaderAdmin from "./Components/HeaderAdmin/HeaderAdmin";
import Header from "./Components/Header/Header";
import NavbarAdmin from "./Components/NavbarAdmin/NavbarAdmin";
import ManagerAccount from "./Components/pages/ManagerAccount/ManagerAccount";
import Reset from "./Components/pages/Reset/Reset";
import SearchProduct from "./Components/pages/SearchProduct/SearchProduct";
import ProductCate from "./Components/pages/ProductCate/ProductCate";
import CategoryManager from "./Components/pages/CategoryManager/CategoryManager";
import CustomerManager from "./Components/pages/CustomerManager/CustomerManager";
import ProductDetail from "./Components/pages/ProductDetail/ProductDetail";
import Cart from "./Components/pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./Components/pages/Checkout/Checkout";
import OrderManager from "./Components/pages/OrderManager/OrderManager";
import Order from "./Components/pages/Order/Order";
// Payment method components.
import Card from './Components/pages/checkoutCard/Card';
import './App.css';


//social login
import { useEffect } from "react";

const App = () => {
    const [user, setUser] = useState({});
    const [idCategory, setIdCategory] = useState(0);
    const [searchKey, setSearchKey] = useState('');
    const isAdmin = localStorage.getItem('role');
    const [userCheckout, setUserCheckout] = useState({})
    const [isAddCart, setIsAddCart] = useState(false)
    const [user1, setUser1] = useState();

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:5000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) {

                        return response.json();

                    };
                    throw new Error("authentication has been failed!");
                })               
                .then((resObject) => {
                    setUser1(resObject.user);    
                    const token = resObject.accessToken; 
                    const role = resObject.role ;
                    const username = resObject.username;
                    const idUser = resObject.id;
                    if (token != undefined) {
                        localStorage.setItem("token", token );
                        localStorage.setItem("role", role );
                        localStorage.setItem("username", username);
                        localStorage.setItem("idUser", idUser);
                        setUser(resObject) 
                        setIsAddCart(!isAddCart)  
                    }
                   
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []); 


    return (
        <UserContext.Provider value={{ setUser, isAdmin, user }}>
            <Router>
                {(isAdmin === 'admin') ? (
                    <>
                        <HeaderAdmin />
                        <NavbarAdmin />
                    </>
                ) : (
                    <>
                        <Header user={user1} setIdCategory={setIdCategory} setSearchKey={setSearchKey} isAddCart={isAddCart} />
                    </>
                )}

                <Routes>
                    <Route path='/' element={<Home setIsAddCart={setIsAddCart} isAddCart={isAddCart} />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login setIsAddCart={setIsAddCart} isAddCart={isAddCart} />}></Route>
                    <Route path='/product-manager' element={<ProductManager />}></Route>
                    <Route path='/category/product' element={<ProductCate idCategory={idCategory} />}></Route>
                    <Route path='/account-manager' element={<ManagerAccount setIsAddCart={setIsAddCart} isAddCart={isAddCart} />}></Route>
                    <Route path='/reset/:tempToken' element={<Reset />}></Route>
                    <Route path='/search' element={<SearchProduct searchKey={searchKey} />}></Route>
                    <Route path='/category-manager' element={<CategoryManager />}></Route>
                    <Route path='/customer-manager' element={<CustomerManager />}></Route>
                    <Route path='/cart' element={<Cart setUserCheckout={setUserCheckout} setIsAddCart={setIsAddCart} isAddCart={isAddCart} />}></Route>
                    <Route path='/checkout' element={<Checkout userCheckout={userCheckout} setIsAddCart={setIsAddCart} isAddCart={isAddCart} />}></Route>
                    <Route path='/product-detail/:id' element={<ProductDetail setIsAddCart={setIsAddCart} isAddCart={isAddCart} />}></Route>
                    <Route path='/order-manager' element={<OrderManager />}></Route>
                    <Route path='/order' element={<Order />}></Route>
                    <Route path="/card" element={<Card setIsAddCart={setIsAddCart} isAddCart={isAddCart} />} />
                </Routes>
                <Footer />
            </Router>
            <ToastContainer autoClose={1000} pauseOnFocusLoss={false} width={500} />
        </UserContext.Provider>
    );
}

export default App;