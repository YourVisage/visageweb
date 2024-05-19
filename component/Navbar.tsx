// Navbar.tsx
'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Dropdown, MenuProps } from 'antd';
import { useAuth } from '../context/auth-context'

export default function Navbar() {
  const { token, name, setToken, setName } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    setToken(null);
    setName(null);
    window.location.href = '/login';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          log out
        </a>
      ),
    },
  ];

  return (
    <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between">
      <div className="flex gap-2 h-full">
        <Link href="/">
          <h2 className="font-bold">Visage AI</h2>
        </Link>
      </div>
      {token && (
        <div className="hidden lg:flex flex-row gap-2">
          <Link href="/faceswap">
            <Button variant="ghost">Царай солих</Button>
          </Link>
        </div>
      )}
      {token && (
        <div className="hidden lg:flex flex-row gap-2">
          <Link href="/detect">
            <Button variant="ghost">Нүүр танилт</Button>
          </Link>
        </div>
      )}
      <div className="flex gap-4 lg:ml-auto"></div>
      {token ? (
        <div className="hidden lg:flex flex-row gap-2">
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <Button>{name}</Button>
          </Dropdown>
        </div>
      ) : (
        <div className="hidden lg:flex flex-row gap-2">
          <div className="relative inline-block text-left">
            <div>
              <button className="bg-white rounded-md px-4 py-2 shadow-md focus:outline-none" onClick={handleLogin}>
                Нэвтрэх/ Бүртгүүлэх
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
