import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handle_submit = async() => {
      const r = await axios.post('http://localhost:3000/login',{
          email:email,
          password:password,
      })
      if (r.data == 'success'){
        navigate('/Home',{state:{email:email}})
      }else{
        setError(r.data)
      }
    }


  return (
    <div className='login'>
        <h1>Login</h1>
        <input type="text" placeholder='Enter your Email ID' onChange={(e) => setEmail(e.target.value)}/><br />
        <p style={{color:'red'}}>{error}</p>
        <input type="text" placeholder='Enter your Password' onChange={(e) => setPassword(e.target.value)}/><br />
        <p>Don't have an account ? <a href="/">Register</a></p>
        <button onClick={handle_submit}>Login</button>
    </div>
  )
}

export default Login