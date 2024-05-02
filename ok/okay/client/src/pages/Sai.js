
// import React, { useRef,useEffect,useState } from 'react'
// // import axios from 'axios'
// import './assets/CSS/auth.scss'
// import {Link, useNavigate} from 'react-router-dom'
// import LoginImg from './assets/images/green.avif'
// import { toast } from 'react-toastify'
// import { validateEmail } from '../../utils'
// import {useDispatch, useSelector} from "react-redux";
// import { register,RESET_AUTH } from '../../redux/features/auth/authSlice'
// import Loader from '../../components/loader/Loader'


// export function Register() {
//     const nameRef = useRef();
//     const emailRef = useRef();
//     const passwordRef = useRef();
//     const phonenumberRef = useRef();
//     const roleRef = useRef(); 
//     const addressRef = useRef();
//     const stateRef = useRef();
//     const pincodeRef = useRef();
//     const [showPassword, setShowPassword] = useState(false);
//     // const sportRef=useRef();
//     const dispatch=useDispatch()
//     const {isLoading,isLoggedIn,isSuccess}=useSelector((state)=>state.auth)
//     const navigate =useNavigate();
//     //!GEOLOCATION API
//     const [userLocation, setUserLocation] = useState(null);
//     const [isLocationShared, setIsLocationShared] = useState(false);
//     const handleLocationShare = () => {
//         setIsLocationShared(true);
//         getUserLocation();
//     };
//     const registerUser = async(event) => {
//         // event.preventDefault();
//         // const name = nameRef.current.value;
//         // const email = emailRef.current.value;
//         // const password = passwordRef.current.value;
//         // const phonenumber = phonenumberRef.current.value;
//         // const role = roleRef.current.value; // !Retrieve the selected role
//         // const address = addressRef.current.value;
//         // const state = stateRef.current.value;
//         // const pincode = pincodeRef.current.value;

//         // if(!email||!password){
//         //     return toast.error("All fields are required")
//         // }
//         // if(password.length<6){
//         //     return toast.error("Password must be atleast 6 characters")
//         // }
//         // if(phonenumber.length<10){
//         //     return toast.error("Please provide valid phone Number")
//         // }
//         // if(!validateEmail(email)){
//         //     return toast.error("Please enter a valid email")
//         // }

        
//         //     const userData={
//         //     name,
//         //     email,
//         //     password,
//         //     phonenumber,
//         //     role,
//         //     address,
//         //     state,
//         //     pincode
//         //     }
//         //     await dispatch(register(userData))
   
//         // };
        
//         event.preventDefault();
//         const name = nameRef.current.value;
//         const email = emailRef.current.value;
//         const password = passwordRef.current.value;
//         const phonenumber = phonenumberRef.current.value;
//         const role = roleRef.current.value;
//         const address = isLocationShared ? '' : addressRef.current.value;
//         const state = isLocationShared ? '' : stateRef.current.value;
//         const pincode = isLocationShared ? '' : pincodeRef.current.value;

//         if (!email || !password) {
//             return toast.error('All fields are required');
//         }
//         // Additional validation checks based on your requirements...

//         const userData = {
//             name,
//             email,
//             password,
//             phonenumber,
//             role,
//             address,
//             state,
//             pincode,
//             location: userLocation
//         };

//         await dispatch(register(userData));
//     }
//         const togglePasswordVisibility = () => {
//             setShowPassword((prevShowPassword) => !prevShowPassword);
//           };
//           //!GEOLOCATION API
//         useEffect(()=>{
//             if(isSuccess && isLoggedIn){
//                 navigate("/profile")
//             }
//             dispatch(RESET_AUTH())
//         },[isSuccess,isLoggedIn,dispatch,navigate])
//         const getUserLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         setUserLocation({
//                             latitude: position.coords.latitude,
//                             longitude: position.coords.longitude
//                         });
//                     },
//                     (error) => {
//                         console.error('Error getting user location:', error);
//                         toast.error('Failed to retrieve user location.');
//                     }
//                 );
//             } else {
//                 toast.error('Geolocation is not supported by this browser.');
//             }
//         };

//     return (
//     <>
//     {isLoading && <Loader/>}
//     <section className="signInContainer">
//             <div className="form">
//                 <h2>SIGNUP</h2>
//                 <form onSubmit={registerUser} id="form1">
//                     <input ref={nameRef} type="text" placeholder="Name" id="name" /><br />
//                     <input ref={phonenumberRef} type='text' placeholder='Phone Number' id='phone'/><br/>
//                     <label>Role:</label>
//             <select ref={roleRef} id="role">
//               <option value="Customer">Customer</option>
//               <option value="Admin">Admin</option>
//               <option value="Sales Agent">Sales Agent</option>
//             </select>
//             <br />
//             <input ref={emailRef} type="email" placeholder="Email" id="email" /><br />
//             <input ref={passwordRef} type={showPassword ? 'text' : 'password'} autoComplete="false" placeholder="Password" id="password"
//             />
//             <span className="password-toggle" onClick={togglePasswordVisibility}>
//               {showPassword ? '😐' : '😑'}
//             </span><br/>                 
//             <input ref={addressRef} type="text" placeholder="Address" id="address" /><br />
//             <input ref={stateRef} type="text" placeholder="State" id="state" /><br />
//             <input ref={pincodeRef} type="text" placeholder="pincode" id="pincode" /><br />
//             {/!GEOLOCATION API/}
//             <button className="geolocation" onClick={handleLocationShare}>Share Location</button>
//                     <button className="formsub" type="submit">Submit</button>
//                 </form>
//                 {/* <p>Already have an account? <a className='other' href="/login">Login</a></p> */}
//             </div>
//             <div className="img">
//             <img src={LoginImg} alt="Login"/>
//             <div className="overlayContainer">
//             <div className="overlay">
//                 <div className="overlayPanel">
//                     <h1>Registered?</h1>
//                     <p>Let's get you logged in! </p>
//                     <button className="ghost" id="signIn"><span><Link to="/login" style={{textDecoration:"none",color:"white"}}>LOGIN</Link></span></button>
//                 </div>

//             </div>
//         </div>
//         </div>
       
//     </section>
//         </>
//         )
// }