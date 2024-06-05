import { useState } from 'react';
import { Link } from 'react-router-dom';
import images from '../../constants/images';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', userData);

      if (response.data.token) {
        const user = response.data;
        console.log(user);
        localStorage.setItem('sessionToken', [response.data.token, user._id, user.role]);
        if (user.role === 'admin') {
          window.location.replace(`http://localhost:5173/admin/liste-des-stagiaires`);
        } else {
          window.location.replace(`http://localhost:5173/liste-stages`);
        }
      } else {
        setMessage(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <section className="flex flex-col lg:flex-row h-screen mx-5 lg:mx-10 justify-center gap-5 lg:gap-10 items-center font-poppins">
      <div className="hidden lg:flex lg:justify-center lg:items-center w-full lg:w-1/2 h-1/3 lg:h-full">
        <img src={images.LoginImg} alt="Hero Img" className="object-contain" />
      </div>
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
        {message && (
          <p className="bg-red-500 text-white mb-3 p-3 w-3/4 text-center">
            {message}
          </p>
        )}
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <div className="head text-center">
            <h1 className="text-[32px] lg:text-[40px] font-extrabold mb-1">Welcome back</h1>
            <p className="font-normal text-gray-500">Welcome back! Please enter your details.</p>
          </div>
          <div className="form mt-5 w-full px-5 lg:w-3/4 lg:px-0">
            <form onSubmit={handleLogin}>
              <div className="email flex flex-col mb-6 lg:mb-8">
                <label htmlFor="email" className="text-[#6B778C] mb-1 ml-1 lg:ml-4 font-medium">Email</label>
                <input type="email" name="email" className="border border-[#C4C4C4] text-gray-600 py-2 px-3 lg:px-4 rounded-lg outline-none" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="password flex flex-col mb-6 lg:mb-8">
                <label htmlFor="password" className="text-[#6B778C] mb-1 ml-1 lg:ml-4 font-medium">Password</label>
                <div className="flex justify-between px-3 lg:px-4 items-center rounded-lg border border-[#C4C4C4]">
                  <input type={showPassword ? "text" : "password"} name="password" className="text-gray-600 py-2 outline-none rounded-lg flex-1" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                  <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <span className='flex justify-end mt-2 underline font-semibold cursor-pointer'>Forget password?</span>
              </div>
              <button type="submit" className="w-full py-2 bg-black text-white rounded-xl font-medium">Login</button>
              <p className='text-center mt-4 font-medium'>Don't have an account? <Link to='/register' className='underline text-gray-500'>Sign up!</Link></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
