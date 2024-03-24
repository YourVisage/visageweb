'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '@/component/ui/button';
import { Row } from '@radix-ui/themes/src/components/table.jsx';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    const formData = new FormData();
    formData.append('email', email);
    const localUrl = "http://127.0.0.1:8000/login";

    try {
      const response = await axios.post(localUrl, formData);
      console.log(response.data)
      router.push("/faceswap"); // Redirect to dashboard after successful login
    } catch (error) {
      alert('An error occurred while swapping images. Please try again.');
      console.error('Model Error: ', error);
    }
  };

  const validateEmail = (email: string) => {
    // Basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <ul>
      <form onSubmit={submit}>
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
