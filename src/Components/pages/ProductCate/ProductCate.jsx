import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ProductAPI } from "../../../API/API";
import ListProduct from "../../ListProduct/ListProduct";

const ProductCate = (props) => {
    const { idCategory } = props;
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        axios.get(
            `${ProductAPI.PRODUCT_API}/category/${idCategory}`
        )
        .then(res => {
            setListProduct(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[idCategory])
    return ( 
        <>
            <ListProduct listProduct={listProduct} />
        </>
     );
}
 
export default ProductCate;
