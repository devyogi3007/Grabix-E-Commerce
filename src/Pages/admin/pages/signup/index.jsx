import React from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoginIcon from '@mui/icons-material/Login';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const initialState = {
  storeName: '',
  storeAddress: ''
};
const Signup = ({ mode = 1 }) => {
  const [form, setForm] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState({
    pass: false,
    cnf: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, ...rest } = form;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      if (uid) {
        console.log(uid);
        const docRef = await setDoc(doc(db, 'users', uid), {
          ...rest,
          email,
          role: {
            id: 2,
            name: 'Vendor'
          }
        });
        console.log('Document written with ID: ', docRef);
      }
      // Clear fields after successful submission
      //   setProduct(initialProduct);
      if (mode === 2) {
        navigate('/panel/users');
      } else {
        navigate('/panel/login');
      }
      setForm(initialState);
      console.log('Signed Up:', user);
    } catch (error) {
      //   setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className='bg-gray-50 dark:bg-gray-800  rounded-lg  px-20 py-10 flex flex-col items-center'>
      <h1 className='text-4xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8'>
        Store Application
      </h1>
      <div className='w-full shadow-lg rounded-lg bg-white p-10 my-4'>
        <div className='py-2 w-full flex items-center justify-start'>
          <p className=' w-fit pr-5 flex items-center gap-3 py-2 text-xl font-bold mb-5'>
            <StorefrontIcon /> Store Details
          </p>
        </div>
        <div className='w-full grid grid-cols-2 gap-4'>
          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='storeName'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Store Name:
            </label>
            <input
              type='text'
              id='storeName'
              name='storeName'
              value={form.storeName}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='storeAddress'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Store Address:
            </label>
            <input
              type='text'
              id='storeAddress'
              name='storeAddress'
              value={form.storeAddress}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='locationLink'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Google Maps Location Link:
            </label>
            <input
              type='text'
              id='locationLink'
              name='locationLink'
              value={form.locationlink}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='city'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              City:
            </label>
            <input
              type='text'
              id='city'
              name='city'
              value={form.city}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='pincode'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Pincode:
            </label>
            <input
              type='text'
              id='pincode'
              name='pincode'
              value={form.pincode}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
      <div className='w-full shadow-lg rounded-lg bg-white p-10 my-4'>
        <div className='py-2 w-full flex items-center justify-start'>
          <p className=' w-fit pr-5 flex items-center gap-3 py-2 text-xl font-bold mb-5'>
            <PersonIcon /> Owner Details
          </p>
        </div>
        <div className='w-full grid grid-cols-2 gap-4'>
          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='firstName'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              First Name:
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='lastName'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Last Name:
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='phoneNo'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Phone no:
            </label>
            <input
              type='tel'
              id='phoneNo'
              name='phoneNo'
              value={form.phoneNo}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      <div className='w-full shadow-lg rounded-lg bg-white p-10 my-4'>
        <div className='py-2 w-full flex items-center justify-start'>
          <p className=' w-fit pr-5 flex items-center gap-3 py-2 text-xl font-bold mb-5'>
            <AssuredWorkloadIcon /> Bank Details
          </p>
        </div>
        <div className='w-full grid grid-cols-2 gap-4'>
          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='accountNumber'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Account Number:
            </label>
            <input
              type='text'
              id='accountNumber'
              name='accountNumber'
              value={form.accountNumber}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='panCard'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              PAN Card Number:
            </label>
            <input
              type='text'
              id='panCard'
              name='panCard'
              value={form.panCard}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='bankName'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Name of Bank:
            </label>
            <input
              type='text'
              id='bankName'
              name='bankName'
              value={form.bankName}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='branch'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Branch:
            </label>
            <input
              type='text'
              id='branch'
              name='branch'
              value={form.branch}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='ifscCode'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              IFSC Code:
            </label>
            <input
              type='text'
              id='ifscCode'
              name='ifscCode'
              value={form.ifscCode}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
      <div className='w-full shadow-lg rounded-lg bg-white p-10 my-4'>
        <div className='py-2 w-full flex items-center justify-start'>
          <p className=' w-fit pr-5 flex items-center gap-3 py-2 text-xl font-bold mb-5'>
            <AccountBalanceIcon /> GST Details
          </p>
        </div>
        <div className='w-full grid grid-cols-2 gap-4'>
          <div className='flex items-start flex-col justify-start'>
            <label
              htmlFor='firstName'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              GST Number:
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
      <div className='w-full shadow-lg rounded-lg bg-white p-10 my-4'>
        <div className='py-2 w-full flex items-center justify-start'>
          <p className=' w-fit pr-5 flex items-center gap-3 py-2 text-xl font-bold mb-5'>
            <LoginIcon /> Login Details
          </p>
        </div>
        <div className='w-full grid grid-cols-2 gap-4'>
          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='email'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>
          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='userName'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Username:
            </label>
            <input
              type='text'
              id='userName'
              name='userName'
              value={form.userName}
              onChange={handleChange}
              className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
            />
          </div>

          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='password'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Password:
            </label>
            <div className='w-full'>
              <input
                type={showPassword?.pass ? 'text' : 'password'}
                id='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
              <button
                type='button'
                id='togglePassword'
                className='focus:outline-none -ml-8'
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, pass: !prev.pass }))
                }
              >
                <img
                  src='https://media.geeksforgeeks.org/wp-content/uploads/20240227164304/visible.png'
                  alt=''
                  className='w-4'
                />
              </button>
            </div>
          </div>

          <div className='flex items-start flex-col justify-start mt-4'>
            <label
              htmlFor='confirmPassword'
              className='text-sm text-gray-700 dark:text-gray-200 mr-2'
            >
              Confirm Password:
            </label>
            <div className='w-full'>
              <input
                type={showPassword?.cnf ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={form.confirmPassword}
                onChange={handleChange}
                className='w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500'
              />
              <button
                type='button'
                id='togglePassword'
                className='focus:outline-none -ml-8'
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, cnf: !prev.cnf }))
                }
              >
                <img
                  src='https://media.geeksforgeeks.org/wp-content/uploads/20240227164304/visible.png'
                  alt=''
                  className='w-4'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex items-center justify-end'>
        <button
          type='button'
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm my-3'
        >
          Register
        </button>
      </div>

      {/* <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
        </span>
        <a href="#" className="text-blue-500 hover:text-blue-600">
          Login
        </a>
      </div> */}
    </div>
  );
};

export default Signup;
