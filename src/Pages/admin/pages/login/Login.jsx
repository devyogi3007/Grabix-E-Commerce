import React, { useState } from 'react';
import './login.scss';
// import { auth } from "../../firebase";
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { encryptPassword } from "../../../../Utils/encryptuserPassword";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== '' && password !== '') {
      auth.loginAction({ email, password });
      return;
    }
    toast.error('Pleae provide a valid input');
  };

  React.useEffect(() => {
    if (auth?.token?.id) {
      navigate('/panel/dashboard');
    }
  }, [auth?.token?.id, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-[rgba(236,232,255,0.99)] dark:bg-gray-950'>
      <div className='bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-4 dark:text-gray-200'>
          Welcome Back!
        </h1>
        <div>
          <div className='mb-4'>
            <label
              for='email'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              className='min-w-[20rem] shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='your@email.com'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4 w-full'>
            <label
              for='password'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              className='min-w-[20rem] shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='button'
              id='togglePassword'
              className='focus:outline-none -ml-8'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src='https://media.geeksforgeeks.org/wp-content/uploads/20240227164304/visible.png'
                alt=''
                className='w-4'
              />
            </button>
            {/* <a
              href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot Password?
            </a> */}
          </div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember'
                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none'
                checked
              />
              <label
                for='remember'
                className='ml-2 block text-sm text-gray-700 dark:text-gray-300'
              >
                Remember me
              </label>
            </div>
            {/* <p className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Account
            </p> */}
          </div>
          <button
            type='button'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7451f8] hover:bg-[#6747da] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
