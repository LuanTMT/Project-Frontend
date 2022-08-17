
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ProductAPI } from '../../../API/API';
import UserContext from '../../../Contexts/UserContext';
import Banner from '../../commons/Banner/Banner';
import ListProduct from '../../ListProduct/ListProduct';
import Pagination from '../../Pagination/Pagination';
import Slider from '../../../Slider/Slider';
    

const Home = ({setIsAddCart, isAddCart}) => {

    const { isAdmin } = useContext(UserContext);
    const [listProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);

    const [listProduct2, setListProduct2] = useState([]);
    const [count2, setCount2] = useState(1);
    const [limit2, setLimit2] = useState(1);


    useEffect( () => {
        axios.get(
            `${ProductAPI.PRODUCT_API}?offset=0&limit=8`,{
        })
        .then(res => {
            setListProduct(res.data.rows);
            setCount(res.data.count);
            setLimit(res.data.limit);
        })
        .catch(err => console.log(err));
    }, [])

    useEffect( () => {
        axios.get(
            `${ProductAPI.PRODUCT_API}?offset=4&limit=4`,{
        })
        .then(res => {
            setListProduct2(res.data.rows);
            setCount2(res.data.count);
            setLimit2(res.data.limit);
        })
        .catch(err => console.log(err));
    }, [])

  

    return ( 
        <>
            <Slider />
            {(isAdmin === 'admin') ? (<></>) : (
                <>  
                    <p></p>                      
                    <div style= {{fontSize:25, marginLeft: 45, fontWeight: 600}} > TÌM KIẾM HÀNG ĐẦU </div>
                    <ListProduct listProduct={listProduct2} setIsAddCart={setIsAddCart} isAddCart={isAddCart}/>
                    <div style= {{fontSize:25, marginLeft: 45, fontWeight: 600}} > CÓ THỂ BẠN QUAN TÂM </div>
                    <ListProduct listProduct={listProduct} setIsAddCart={setIsAddCart} isAddCart={isAddCart}/>
                    <Pagination limit={limit} count={count} setListProduct={setListProduct}/>
                </>
            )}
        </>
     );
}
 
export default Home;