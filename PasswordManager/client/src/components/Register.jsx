import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handle_submit = async() => {
        const response = await axios.post('http://localhost:3000/register',{
            email:email,
            password:password,
        })

        if(response.data == 'Email ID is already used'){
          setError("Email ID is already used")
        }else{
          navigate('/Home',{state:{email:email}})
        }
    }

  return (
    <div className='register'>
        <h1>Register</h1>
        <input type="text" placeholder='Enter your Email ID' onChange={(e) => setEmail(e.target.value)}/><br />
        <input type="text" placeholder='Enter your Password'onChange={(e) => setPassword(e.target.value)} /><br />
        <p style={{color:'red'}}>{error}</p>
        <p>Already have an account ? <a href="/login">Login</a></p>
        <button onClick={handle_submit}>Register</button>
    </div>
  )
}

export default Register