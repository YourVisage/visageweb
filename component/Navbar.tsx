'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const [tokend, setTokend] = useState('');
  const [named, setNamed] = useState('');

  const updateUserData = () => {
    const token = localStorage.getItem('access_token');
    const name = localStorage.getItem('name');
    setTokend(token ?? '');
    setNamed(name ?? '');
  };

  useEffect(() => {
    updateUserData();
    window.addEventListener('storage', updateUserData);

    return () => {
      window.removeEventListener('storage', updateUserData);
    };
  }, []);
  useEffect(() => {
    tokend
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    setTokend('');
    setNamed('');
    window.location.href = '/login';
  };

  return (
    <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between">
      <div className="flex gap-2 h-full">
        <Link href="/">
          <h2 className="font-bold">Visage AI</h2>
        </Link>
      </div>
      {tokend && (
        <div className="hidden lg:flex flex-row gap-2">
          <Link href="/faceswap">
            <Button variant="ghost">Царай солих</Button>
          </Link>
        </div>
      )}
      {tokend && (
        <div className="hidden lg:flex flex-row gap-2">
          <Link href="/detect">
            <Button variant="ghost">Нүүр танилт</Button>
          </Link>
        </div>
      )}
      <div className="flex gap-4 lg:ml-auto"></div>
      {tokend && (
        <div className="hidden lg:flex flex-row gap-2">
          <div className="relative inline-block text-left">
            <div>
              <button className="bg-white rounded-md px-4 py-2 shadow-md focus:outline-none">
                {named}
              </button>
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
