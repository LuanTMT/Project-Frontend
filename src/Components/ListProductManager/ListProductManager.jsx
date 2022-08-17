
import { useState } from "react";
import ProductCart from "../ProdcutCartManager/ProductCartManager";
import AddBoxIcon from '@mui/icons-material/AddBox';
import './listProductManager.css';
import CloseIcon from '@mui/icons-material/Close';
import FormAddProduct from "../FormAddProduct/FormAddProduct";
import Pagination from "../Pagination/Pagination";
import UpdateProduct from "../UpdateProduct/UpdateProduct";

const ListProduct = (props) => {
    const {categories, listProduct, count, limit, setListProduct, isAction, setIsAction } = props;
    const [appendFormAdd, setAppenForm] = useState(false);
    const [appendFormUpdate, setAppendFormUpdate] = useState(false)
    const [idProduct, setIdProduct] = useState(0);

    const addProduct = () => {
        setAppenForm(true)
    }

    const handleCLoseForm = () => {
        setAppenForm(false);
        setAppendFormUpdate(false);
    }

    return ( 
        <div className="list-product-container"> 
            {(appendFormAdd || appendFormUpdate) ? (
                <>
                    {appendFormAdd ? (
                        <>
                        <CloseIcon className="close-form" onClick={handleCLoseForm}/>
                        <FormAddProduct  
                            categories={categories} 
                            setAppenForm={setAppenForm} 
                            setIsAction={setIsAction}
                            isAction={isAction}
                        />
                        </>
                    ) : (
                       <>
                         <CloseIcon className="close-form" onClick={handleCLoseForm}/>
                        <UpdateProduct 
                            categories={categories} 
                            setAppendFormUpdate={setAppendFormUpdate} 
                            idProduct={idProduct}
                            setIsAction={setIsAction}
                            isAction={isAction}
                        />
                       </>
                    )}   
                </>
            ) : (
                <>
                    <div className="add-product">
                        <AddBoxIcon className="add-icon" onClick={addProduct}/>
                        <p className="add-title">ADD PRODUCT</p>
                    </div>
                    {listProduct.map((product) => {
                        return (
                            <div key={product.id}>
                                <ProductCart 
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    size={product.size}
                                    setAppendFormUpdate={setAppendFormUpdate}
                                    setIdProduct={setIdProduct}
                                    setIsAction={setIsAction}
                                    isAction={isAction}
                                />
                            </div>
                        )
                    })}
                 <Pagination count={count} limit={limit} setListProduct={setListProduct}/>
                </>
            )}
            
        </div>
     );
}
 
export default ListProduct;