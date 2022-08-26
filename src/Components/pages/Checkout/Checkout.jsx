import Axios from 'axios';
import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PaymentAPI, UserAPI } from '../../../API/API';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './checkout.css';
import axios from 'axios';

const Checkout = ({setIsAddCart, isAddCart}) => {
    const navigate = useNavigate();
    const initialValues = { fullName: "", phone: "", address: "" };
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    let [method, setMethod] = useState('CASH');
    const [open, setOpen] = useState(false);
    const idUser = localStorage.getItem('idUser');
    const checkout = JSON.parse(localStorage.getItem('checkout'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const newDataCheckout = {
        fullName: formValues.fullName,
        phone: formValues.phone,
        address: formValues.address,
        email: checkout.userEmail,
        listItems: checkout.listItem,
        totalBill: checkout.totalBill,
        totalItems: checkout.totalItems,
        idUser: idUser,
        method: method
    }

    const handleCheckout = () => {
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if( method === 'VISA' ){
            return navigate("/card")
        }
    };
    

    useEffect(() => {

        axios.get(
            `${UserAPI.USER_API}/${idUser}`,{
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }
        )
        .then(res => {
            setFormValues({
                fullName: res.data.fullName,
                phone: res.data.phone,
                address: res.data.address
            })
        })

        if (Object.keys(formErrors).length === 0 && isSubmit){
            setOpen(true);
            Axios.post(`${PaymentAPI.PAYMENT_API}`,newDataCheckout,{
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                }
            })
            .then(res => {
                toast.success('Checkout successfully! Please check email to see payment details',{
                    position: toast.POSITION.TOP_CENTER
                  });
                setIsAddCart(!isAddCart)
                localStorage.removeItem('checkout');
                return navigate('/')
            })
            .catch(err => console.log(err))
        }
      
    }, [formErrors])

  
    const validate = (values) => {
        const errors = {};
        if (!values.fullName) {
            errors.fullName = "* Full Name is required!"
        }
        if (!values.phone) {
            errors.phone = "* Phone is required!"
        }
        if (!values.address) {
            errors.address = "* address is required!"
        }
        return errors;
    }

    const handleBackToCart = () => {
        return navigate('/cart');
    }

    
    return ( 
        <div className='checkout-container'>
            <Form className='form-checkout'>
                <h4>Infomation Customer</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="fullName"
                        placeholder="Enter your fullname" 
                        value={formValues.fullName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <p className="error-form">{ formErrors.fullName }</p>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="phone"
                        placeholder="Enter your phone" 
                        value={formValues.phone}
                        onChange={handleChange}
                    />
                </Form.Group>
                <p className="error-form">{ formErrors.phone }</p>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="address"
                        placeholder="Enter your address" 
                        value={formValues.address}
                        onChange={handleChange}    
                    />
                </Form.Group>
                <p className="error-form">{ formErrors.address }</p>
            </Form>
            <div className='payment-method'>
                <h4>Method</h4>
                <div className='select-method'>
                    <div className='form-radio-group'>
                        <input type="radio" id="cash" name="method" value="CASH" onChange={(e) => setMethod(e.target.value)}/>
                        <label htmlFor="cash">CASH</label>
                    </div>
                    <div className='form-radio-group'>
                        <input type="radio" id="visa" name="method" value="VISA" onChange={(e) => setMethod(e.target.value)}/>
                        <label htmlFor="visa">VISA</label>
                    </div>
                    <div className='form-radio-group'>
                        <input type="radio" id="vnpay" name="method" value="VNPAY" onChange={(e) => setMethod(e.target.value)}/>
                        <label htmlFor="vnpay">VNPAY</label>
                    </div>
                </div>
            </div>
            <div className='list-cart-detail'>
                <h4>Payment Detail</h4>
                <div className='total-item'>
                    <h5>Quantity Items: {checkout.totalItems}</h5>
                </div>
                <div className='total-bill'>
                    <h5>Total Cost: $ {checkout.totalBill}</h5>
                </div>
                <div className='checkout-action'>
                    <button type="button" className='checkout-btn' onClick={handleCheckout}>
                        CHECKOUT
                    </button>
                    <button type="button" className='back-to-cart' onClick={handleBackToCart}>
                        BACK TO CART
                    </button>
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
     );
}
 
export default Checkout;