import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LoginForm () {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const loginStyle = {
    width:"350px",
    borderRadius: "10px",
    // border: "2px solid",
    margin:"50px auto",
    marginTop: "100px",
    boxShadow: "5px 5px 8px 3px #888888"
  }
  const styleBottom = {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "15px",
    color:"#032697c0",
    fontSize: "15px",
    // marginTop: "50px",
    textDecoration: "underline"
  }

  const fieldsStyle = {
    borderRadius: "5px",
    padding: "10px",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  }

  // JSX function that generates the error message
  // const renderErrorMessage = (name) => {
  //   name === errorMessage.name && (
  //     <div className='error'>{errorMessage.message}</div>
  //   );
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo.email);
    console.log(userInfo.password);
    console.log(userName);
    console.log(passWord);

    if (userName === userInfo.email) {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/loginForm/accountPage');
      }, 3000);
    }
    else setIsSubmitted(false);
    
  }

  const handleAccount = () => {
    navigate ('../accountPage')
    // if (userName === userInfo.email && passWord === userInfo.passWord) {
    //   navigate('../accountPage');
    // } else <div>wrong email or password</div>
  }

  return (
    <div style={loginStyle}className='bg-gray-300'>
      <form >
        <h1 className='py-1 text-center'><b>Login to account</b></h1>
        <hr style={{width: "90%", margin: "10px auto"}}></hr>
        <div style={fieldsStyle}>
          <label for="name">
            Login:
            <input type='text' placeholder='Email' name='userName' value={userName} onChange={(e) => setUserName(e.target.value)} className='ml-3' required/>
          </label>
          {/* {renderErrorMessage("userName")} */}
                  
          <label for="name">
            password:
            <input type='password' name='password' value={passWord} onChange={(e) => setPassWord(e.target.value)} className='ml-2' required/>
          </label>
          {/* {renderErrorMessage("password")} */}

          <label>
            <input
              type="checkbox"
              // checked={checked}
            />
            Remember me
          </label>
          
          {isSubmitted ? <div style={{color: "green"}}>Welcome {userInfo.firstName}</div> : <div style={{color: "red", fontStyle:"italic"}}>wrong authentication</div>}

          <button
            type='submit'
            className='mt-2 bg-green-300 rounded-md'
            onClick={handleSubmit}
          >
            Login
          </button>
          <div style={styleBottom}>
            <p>Forgot <a href='#'>password?</a></p>
            <p><Link to="../loginForm/signup">Create account</Link></p>

          </div>
        </div>
      </form>
    </div>
    
  )
}