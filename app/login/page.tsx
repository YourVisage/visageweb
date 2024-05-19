'use client'
import { useRouter } from 'next/navigation';
import React, {CSSProperties, useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { Loader } from 'lucide-react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Image from 'next/image';
import home from "/public/home.png";
import login from "/public/login.png";


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
          router.push('/dashboard'); // Redirect to dashboard page
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
    <div className='container'>
      <div className='imageContainer'>
        <Image src={login} alt="Device 1" width={250} height={500} className='deviceImage' layout="intrinsic" quality={80} />
        <Image src={home} alt="Device 2" width={290} height={550} className='deviceImage2' layout="intrinsic" quality={80} />
      </div>
      <Form
        name="login"
        className='loginForm'
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          prefix={<UserOutlined />} placeholder="Phone number, user name, or email address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className='loginButton'>
          Нэвтрэх
          </Button>
        </Form.Item>
        <Form.Item>
          <a href="/signup" className='signupLink'>Бүртгүүлэх</a>
        </Form.Item>
      </Form>
      
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <style jsx>{`
     .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    
    .imageContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 50px;
      justify-content: space-around;
      padding: 50px;
    }
    
    .deviceImage {
      width: 250px;
      height: auto;

    } .deviceImage2 {
      margin-bottom: 20px;
      width: 250px;
      height: auto;
      margin-left: 20px;
    }
    
    .loginForm {
      max-width: 300px;
      width: 100%;
    }
    
    .loginButton {
      width: 100%;
    }
    
    .signupLink {
      display: block;
      text-align: center;
    }
    
      
      .animated-text span {
        opacity: 0;
        animation: fadeIn 2s forwards;
      }
      
      .animated-text span:nth-child(1) {
        animation-delay: 0s;
      }
      
      .animated-text span:nth-child(2) {
        animation-delay: 0.5s;
      }
      
      .animated-text span:nth-child(3) {
        animation-delay: 1s;
      }
      
      .animated-text span:nth-child(4) {
        animation-delay: 1.5s;
      }
      
      .animated-text span:nth-child(5) {
        animation-delay: 2s;
      }
      
      .animated-text span:nth-child(6) {
        animation-delay: 2.5s;
      }
      
      .animated-text span:nth-child(7) {
        animation-delay: 3s;
      }
      
      .animated-text span:nth-child(8) {
        animation-delay: 3.5s;
      }
      
      .animated-text span:nth-child(9) {
        animation-delay: 4s;
      }
      
      .animated-text span:nth-child(10) {
        animation-delay: 4.5s;
      }
      
      .animated-text span:nth-child(11) {
        animation-delay: 5s;
      }
      
      .animated-text span:nth-child(12) {
        animation-delay: 5.5s;
      }
      
      .animated-text span:nth-child(13) {
        animation-delay: 6s;
      }
      
      .animated-text span:nth-child(14) {
        animation-delay: 6.5s;
      }
      
      .animated-text span:nth-child(15) {
        animation-delay: 7s;
      }
      
      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
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
const container: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'row',
  backgroundColor: '#f0f2f5 '
};

const center: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const input: CSSProperties = {
  width: '380px',
  marginBottom: '10px',
}
const bottom: CSSProperties = {
 display: 'flex',
 justifyContent: 'center',
}
export default LoginPage;
