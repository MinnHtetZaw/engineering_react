import React from 'react'

const Login = () => {
  return (
    <>

<div className="login-box">

  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg"><i className="fas fa-warehouse"></i>&nbsp;&nbsp;Sign in to start your session&nbsp;&nbsp;<i className="fas fa-warehouse"></i></p>

      <form >
   
        <div className="input-group mb-3">
          <input type="email" className="form-control" name="email" placeholder="Email"/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" name="password" placeholder="Password"/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
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