'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

 export default function Navbar () {
  // if (typeof window !== 'undefined') {
    // Perform localStorage action
  // }

  let token: string | null = "";

  useEffect(() => {
    token = localStorage.getItem('access_token');
   setTokend(token ?? '')
  },[]);

  const [tokend, setTokend] = useState(token ?? '');

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
      <div className="flex gap-4 lg:ml-auto">
      </div>
     </div>
  );
}