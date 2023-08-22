import React, { useRef } from 'react'
import { Email, Lock } from '../../components/Icons'
import { api } from '../../utilities/api/apiResource'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import { storeUser } from '../../utilities/redux/userRedux'
import { useNavigate } from 'react-router-dom'
import background from "../../assets/images/background.jpg"
import styled from 'styled-components'


const Background = styled.div`
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
`


const Login = () => {

    const emailRef =useRef()
    const passwordRef = useRef()
    const dispatch = useDispatch()
    const nav = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault()
   
    try{
        const res = await api.post('login',{
        email: emailRef.current.value,
        password: passwordRef.current.value 
        })
 
      dispatch(storeUser(res.data.employee))
      
      swal(
        'Good',
        'GoodJob',
        'success'
        )
       
        nav('/')
      }
    catch(error) 
    {
             swal(
              'Oops...',
                error.response.data,
              'error'
              )
    }
 
  }
  return (
    <>
<Background >

<div className="d-flex align-items-center justify-content-center vh-100" >
  
  <div className="card col-3">
    <div className="card-body">
      <h5 className='text-center p-3 fst-italic'>Sign in to start your session</h5>

      <form onSubmit={handleLogin} >
        <div className="input-group my-3">
          <input type="email" ref={emailRef} className="form-control" name="email" placeholder="Email"/>
      
          <span className="input-group-text" id="basic-addon1"> <Email/></span>   
        
        </div>
        <div className="input-group mb-3">
          <input type="password" ref={passwordRef} className="form-control" name="password" placeholder="Password"/>
          <span className="input-group-text" id="basic-addon1"> <Lock/></span>   
       
        </div>
       
            <button type="submit" className="btn btn-primary btn-block float-end">Sign In</button>
          
      </form>

    </div>

  </div>
</div>

</Background>
    </>
  )
}

export default Login