import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/reset-password', { token, newPassword });

      if (response.data.message === 'Password has been reset') {
        setMessage('Password reset successfully');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage("Password reset failed. Please try again.");
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
            <h1 className="text-[40px] text-center font-extrabold mb-1">Reset Password</h1>
            <p className="font-normal text-gray-500">Please enter your new password.</p>
          </div>
          <div className="form mt-5 w-3/4">
            <form onSubmit={handleResetPassword}>
              <div className="password flex flex-col mb-8">
                <label htmlFor="newPassword" className="text-[#6B778C] mb-1 ml-4 font-medium">New Password</label>
                <input type="password" name="newPassword" className="border border-[#C4C4C4] text-gray-600 py-2 px-4 rounded-lg outline-none" placeholder="Enter your new password" onChange={e => setNewPassword(e.target.value)} />
              </div>
              <div className="password flex flex-col mb-8">
                <label htmlFor="confirmPassword" className="text-[#6B778C] mb-1 ml-4 font-medium">Confirm Password</label>
                <input type="password" name="confirmPassword" className="border border-[#C4C4C4] text-gray-600 py-2 px-4 rounded-lg outline-none" placeholder="Confirm your new password" onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full py-2 bg-black text-white rounded-xl font-medium">Reset Password</button>
              <p className='text-center mt-4 font-medium'>Remembered your password? <Link to={'/login'} className='underline text-gray-500'>Login!</Link></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default ResetPassword;
