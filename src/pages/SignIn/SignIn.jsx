import React, { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import './SignIn.css';

const SignIn = () => {
  const { login, loginWithCredentials, registerWithCredentials } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());
        
        login({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    },
    onError: errorResponse => console.error(errorResponse),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        await registerWithCredentials(name, email, password);
      } else {
        await loginWithCredentials(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <h1 className="signin-logo">Board.</h1>
      </div>
      <div className="signin-right">
        <div className="signin-content">
          <div className="signin-header">
            <h2>{isRegistering ? 'Create Account' : 'Sign In'}</h2>
            <p>{isRegistering ? 'Sign up to create an account' : 'Sign in to your account'}</p>
          </div>
          
          <div className="auth-buttons">
            <button type="button" className="btn-auth google" onClick={() => googleLogin()}>
              <FcGoogle size={18} /> {isRegistering ? 'Sign up with Google' : 'Sign in with Google'}
            </button>
            <button type="button" className="btn-auth">
              <FaApple size={18} /> {isRegistering ? 'Sign up with Apple' : 'Sign in with Apple'}
            </button>
          </div>

          <div className="signin-card">
            <form onSubmit={handleSubmit}>
              {error && <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
              
              {isRegistering && (
                <div className="input-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="input-group">
                <label>Email address</label>
                <input 
                  type="email" 
                  placeholder="johndoe@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {!isRegistering && <a href="#" className="forgot-password">Forgot password?</a>}
              
              <button type="submit" className="btn-submit">
                {isRegistering ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
          </div>
          
          <p className="register-link">
            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setIsRegistering(!isRegistering);
                setError('');
              }}
            >
              {isRegistering ? 'Sign in here' : 'Register here'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
