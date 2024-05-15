'use client'
import { useRouter } from 'next/navigation';
import React, {CSSProperties, useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@/component/ui/button';
import { Loader } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation for email field
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);

    try {
      // Make API request to login endpoint using Axios
      const response = await axios.post('http://172.20.10.4:8000/login', {
        email: email
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      // Assuming successful login redirects to dashboard page
      if (response.status === 200) {
        // Handle the response data (access_token) here
        console.log("Access Token:", response.data.access_token);
        const userdata = await axios.get(`http://172.20.10.4:8000/user/${response.data.access_token}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (userdata.status === 200){
          router.push('/faceswap'); // Redirect to dashboard page
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('name', userdata.data.name);
        }
      }
    } catch (error) {
      // Handle error responses from the server
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className='px-2 py-2' />
        <Button  className='bg-blue-600 text-white rounded-xl' type="submit"> нэвтрэх</Button>
      </form>
      </ul>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
        }
        .loader {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          position: relative;
          background: black;
        }
        .loader:before, .loader:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: black;
          animation: slide 1s infinite linear alternate;
          opacity: 0.5;
        }
        .loader:after {
          animation: slide2 1s infinite linear alternate;
          opacity: 1;
        }
        @keyframes slide {
          0%, 20% { transform: translate(0, 0); }
          80%, 100% { transform: translate(15px, 15px); }
        }
        @keyframes slide2 {
          0%, 20% { transform: translate(0, 0); }
          80%, 100% { transform: translate(-15px, -15px); }
        }
      `}</style>
    </div>
  );
};
const loaderContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'black',
};

const loaderStyle: CSSProperties = {
  border: '16px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '16px solid #3498db',
  width: '120px',
  height: '120px',
  animation: 'spin 2s linear infinite',
};
export default LoginPage;
