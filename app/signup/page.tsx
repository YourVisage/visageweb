// login.tsx
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useAuth } from '@/context/auth-context';

const SignUpPage = () => {
  const router = useRouter();
  const { setToken, setName } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setNamed] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('http://192.168.1.141:8000/register', { email, name }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log(response.data.uid)
        const userdata = await axios.get(`http://192.168.1.141:8000/user/${response.data.uid}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (userdata.status === 200) {
          localStorage.setItem('access_token', response.data.uid);
          localStorage.setItem('name', userdata.data.name);
          setToken(response.data.uid);
          setName(userdata.data.name);
          router.push('/');
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col flex-1'>
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col gap-4 bg-neutral-50 border border-neutral-200 p-4 rounded-xl max-w-sm w-full">
          <h1 className="text-xl">Бүртгэл</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setNamed(e.target.value)}
              value={name}
              prefix={<UserOutlined />}
              placeholder="Нэр"
              className={styles.input}
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              prefix={<UserOutlined />}
              placeholder=" email хаягаа оруулна уу"
              className={styles.input}
            />
            <Button type="default" htmlType="submit" color='blue'>
              <p className="text-black">Бүртгүүлэх</p>
            </Button>
          </form>
          {loading && (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
