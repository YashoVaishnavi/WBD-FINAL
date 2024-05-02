import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import { FaCartShopping } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/loader/Loader"
import { ImStatsBars } from "react-icons/im";

// import { Link } from 'react-router-dom';


function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        setProductData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSelect = (productId) => {
    setLoading(true);
    const updatedProducts = productData.map((product) => {
      if (product._id === productId) {
        return { ...product, selected: "1" };
      }
      return product;
    });

    axios
      .put(`http://localhost:5000/api/selecteditem/${productId}`,{selected:"1"})
      .then((res) => {
        setProductData(updatedProducts);
        // setLoading(true)

        setTimeout(() => {
          setLoading(false); 
        }, 500);
        toast.success('Product Successfully Uploaded');
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false); // Set loading state to false after the request is complete
      });
  };

  const handleReject = (productId) => {
    setLoading(true);

    axios
      .delete(`http://localhost:5000/api/rejectitem/${productId}`)
      .then(() => {
        const updatedProducts = productData.filter((product) => product._id !== productId);
        setProductData(updatedProducts);
        setTimeout(() => {
          setLoading(false); 
        }, 500);
        toast.error('Product Rejected');
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const countAcceptedProducts = () => {
    const acceptedProducts = productData.filter(product => product.selected === '0');
    return acceptedProducts.length;
  };

  const acceptedProductsCount = countAcceptedProducts();




  const filteredProducts = productData.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortBySelected = (a, b) => {
    if (a.selected === '0' && b.selected === '1') {
      return -1; // '0' comes before '1', so '0' should appear first
    } else if (a.selected === '1' && b.selected === '0') {
      return 1; // '1' comes after '0', so '1' should appear after '0'
    } else {
      return 0; // Maintain the existing order for other cases
    }
  };


  const sortedProducts = [...filteredProducts].sort(sortBySelected);

  return (
    <div className='products_1'>
        
<div className="sidebar_1">
<a href="/">  <h1>Dashboard</h1> </a>

        <ul>
        <li> <Link to={'/admin'}><IoMdHome /> Home</Link></li>
      <li> <Link to={"/admin/users"}><FaUsers /> Users</Link></li>
      <li><Link to={"/admin/product"}> <SiProducthunt /> Products   </Link></li>
      {/* <span className='countp'>{acceptedProductsCount}</span>  */}
      <li><Link to={"/admin/feedbacks"}> <VscFeedback />Complaints</Link></li>
      <li><Link to={"/admin/cartdata"}> <FaCartShopping /> Cart Data</Link></li>
      <li><Link to={"/productstas"}> <ImStatsBars /> Statistics</Link></li>
      

      <li><Link to={"/"}><CiLogout /> Logout</Link></li>
        </ul>
      </div>
      <h1 className='searchbar'>Product Details</h1>
      <input className='search_2'
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />




      <h2>Products</h2>
      <div className="product_cards">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <p className='str'><strong>Name:</strong> {product.product_name}</p>
            
            <p style={{ cursor: 'pointer' }} className='str'><strong>Image:</strong>
                          {product && product.product_img ? (
                            
                            <Link to={product.product_img} target="_blank">Click here</Link>
                              
                             
                          
                          ) : product && product.product_images && product.product_images.length > 0 ? (
                           
                            <Link to={ `data:image/png;base64,${product.product_images[0].data}`} target="_blank">Click here</Link>
                             
                              
                           
                          ) : (
                            <span>No Image</span>
                          )}
            </p>
          
            <p className='str'><strong>Price:</strong> {parseFloat(product.product_mrp).toFixed(2)}</p>
            <p className='str'><strong>Selling Price:</strong> {parseFloat((product.product_mrp * (1 - product.offer / 100)).toFixed(2)).toFixed(2)}</p>
            <p className='str'><strong>Quantity:</strong> {product.quantity}</p>
            <p className='str'><strong>Offer: </strong> {parseFloat(product.offer).toFixed(2)}%</p>
            {product.selected === "1" ? (
              <button  className='btse' >Selected</button>
            ) : (
              <>
                <button className='btse' onClick={() => handleSelect(product._id)}>Accept</button>
                <button className='btre' onClick={() => handleReject(product._id)}>Reject</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className='Footer'>
         
         &copy; {} All Rights Reserved
        
     </div>
     <div className='loader_in'>{loading && <Loader />}</div>

    </div>
  );
}

export default Products;
