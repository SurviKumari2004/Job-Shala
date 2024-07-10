import React,{useState,useContext} from 'react'
import {Context} from '../../main'
import axios from "axios"
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context);
 const handleRegister = async (e) => {
  e.preventDefault();
  try{
    const{data} = await axios.post(
      "http://localhost:4000/api/v1/user/register",
      {name, email, password, phone, role},
      {
        withCredentials:true,
        headers: {
          "Content-type":"application/json",
        },
      }
    );
    toast.success(data.message);
    setName("");
    setEmail("");
    setPhone("");
    setRole("");
    setPassword("");
    setIsAuthorized(true);
  } catch(error){
    toast.error(error.response.data.message);
  }
 };
if(isAuthorized){
  return <Navigate to={"/"}/>;
}
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/jobshala_logo(dark).png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter your full name"value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Valid Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter your current phone no."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Use a Strong Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login"}>Already have an account? Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png.png" alt="login" />
        </div>
      </section>
    </>
  )
}

export default Register
