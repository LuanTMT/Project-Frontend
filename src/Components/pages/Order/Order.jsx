import axios from "axios";
import { useEffect, useState } from "react";
import { OrderAPI, OrderDetailAPI, PaymentAPI } from "../../../API/API";
import './order.css';

const Order = () => {

    const idUser = localStorage.getItem('idUser')
    const [listOrder, setListOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState([]);
    const [payment, setPayment] = useState([]);

    useEffect(() => {
        axios.get(
            `${OrderAPI.ORDER_API}/${idUser}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setListOrder(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handleDetail = (id) => {
        axios.get(
            `${OrderDetailAPI.ORDERDETAIL_API}/${id}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setOrderDetail(res.data)
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(
            `${PaymentAPI.PAYMENT_API}/${id}`,{
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setPayment(res.data);
        })
        .catch(err => {
            console.log(err);
        })

    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

    return ( 
        <>
            {(listOrder === []) ? (
                <>
                    <h2>You not have order!</h2>
                </>
            ) : (
                <div className="order-container">
                    {listOrder.map((order,index) => {
                        return (
                            <div className="order-item" key={index}>
                                <div className="order-id">
                                    <strong>ID: </strong><span>{order.id}</span>
                                </div>
                                <div className="order-time">
                                    <strong>Time Order: </strong><span>{formatDate(order.createdAt)}</span>
                                </div>
                                <button 
                                        type="button" 
                                        className="btn btn-primary detail-btn" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal"
                                        onClick={() => handleDetail(order.id)}
                                    >
                                        Detail
                                    </button>
                            </div>
                        )
                    })}  
                </div>
            )}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Order Detail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {orderDetail.map((item, index) => {
                                return (
                                    <div className="detail-container" key={index}>
                                        <div className="detail-image">
                                            <img src={`http://127.0.0.1:5000/public/images/${item.image}`} alt="product" />
                                        </div>
                                        <div className="detail-title">
                                            <h6>Title</h6>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="detail-price">
                                            <h6>Price</h6>
                                            <p>$ {item.price}</p>
                                        </div>
                                        <div className="detail-size">
                                            <h6>Size</h6>
                                            <p>{item.size}</p>
                                        </div>
                                        <div className="detail-quantity">
                                            <h6>Quantity</h6>
                                            <p>{item.quantityProduct}</p>
                                        </div>
                                        <div className="detail-quantity">
                                            <h6>Method</h6>
                                            <p>{payment.method}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="detail-total">
                                <h3>Total: {payment.total} $</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
        </>
     );
}
 
export default Order;