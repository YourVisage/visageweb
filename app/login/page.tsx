'use client'
import { useRouter } from 'next/navigation';
import React, {useState } from 'react'
import axios from 'axios';
import { Button } from '@/component/ui/button';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation for email field
    if (!email) {
      setError("Email is required");
      return;
    }

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
        localStorage.setItem('access_token', response.data.access_token);
        // Redirect to dashboard page or store token in state/storage as needed
        router.push('/faceswap'); // Redirect to dashboard page
      }
    } catch (error) {
      // Handle error responses from the server
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
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
    </div>
  );
};

export default LoginPage;
