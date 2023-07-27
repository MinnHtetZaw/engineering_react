import React, { useRef } from 'react'
import { Email, Lock } from '../Icons'
import { api } from '../../api/apiResource'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux'
import { storeUser } from '../../redux/userRedux'
import { useNavigate } from 'react-router-dom'

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

<div className="d-flex align-items-center justify-content-center vh-100">
  
  <div className="card">
    <div className="card-body">
      <p className='text-center'>Sign in to start your session</p>

      <form onSubmit={handleLogin} >
        <div className="input-group mb-3">
          <input type="email" ref={emailRef} className="form-control" name="email" placeholder="Email"/>
      
          <span className="input-group-text" id="basic-addon1"> <Email/></span>   
        
        </div>
        <div className="input-group mb-3">
          <input type="password" ref={passwordRef} className="form-control" name="password" placeholder="Password"/>
          <span className="input-group-text" id="basic-addon1"> <Lock/></span>   
       
        </div>
        <div className="row">
          <div className="col-8">
          </div>
   
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </div>
    
        </div>
      </form>

    </div>

  </div>
</div>


    </>
  )
}

export default Login