import React from 'react';
import './Auth.css';
import AuthForm from './AuthForm';


const AuthPage = () => {
  return (
    <div className="authPage">
      <div className="authContainer">
        <div className="imgGroup">
          <img src="./image1.png" alt="Phone Frame" className="img" />
        </div>

        <div className="formContainer">
          <img src="./image2.png" alt="Instagram Logo" className="img2" />
          <AuthForm /> 
        </div>
      </div>
      
    </div>
  );
};

export default AuthPage;





