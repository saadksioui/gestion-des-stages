import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RequestPasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/request-password-reset', { email });

      if (response.data.message === 'Password reset email sent') {
        setMessage('Password reset email sent successfully');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('Failed to send reset email. Please try again.');
    }
  }

  return (
    <section className="flex h-screen justify-center gap-10 items-center font-poppins">
      <div className="flex justify-center items-center w-1/2 h-full bg-black">
        <img src="/path/to/your/image.jpg" alt="Hero Img" />
      </div>
      <div className="w-1/2 h-full">
        {message && (
          <p className="bg-red-500 text-white mb-3 p-3">
            {message}
          </p>
        )}
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <div className="head text-center">
            <h1 className="text-[40px] text-center font-extrabold mb-1">Forgot Password?</h1>
            <p className="font-normal text-gray-500">Enter your email to receive a password reset link.</p>
          </div>
          <div className="form mt-5 w-3/4">
            <form onSubmit={handleRequestReset}>
              <div className="email flex flex-col mb-8">
                <label htmlFor="email" className="text-[#6B778C] mb-1 ml-4 font-medium">Email</label>
                <input type="email" name="email" className="border border-[#C4C4C4] text-gray-600 py-2 px-4 rounded-lg outline-none" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="w-full py-2 bg-black text-white rounded-xl font-medium">Send Reset Link</button>
              <p className='text-center mt-4 font-medium'>Remember your password? <Link to={'/login'} className='underline text-gray-500'>Login!</Link></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default RequestPasswordResetPage;
