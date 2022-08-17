import { Link } from "react-router-dom";
import './navbarAdmin.css';

const NavbarAdmin = () => {
    return ( 
        <div className="navbar-container">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">DashBoad</Link></li>
                <li className="navbar-item"><Link to="/product-manager">Product</Link></li>
                <li className="navbar-item"><Link to="/customer-manager">Customer</Link></li>
                <li className="navbar-item"><Link to="/category-manager">Category</Link></li>
                <li className="navbar-item"><Link to="/order-manager">Order</Link></li>
            </ul>
        </div>
     );
}
 
export default NavbarAdmin;