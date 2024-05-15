'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import hero from "/public/hero.png";
import ExplainerSection from "@/component/ExplainerSection";
import { Button } from "@/component/ui/button";

export default function Home() {
  const router = useRouter();
  let token : string | null = '';
  console.log(localStorage.getItem('access_token'))
  useEffect(() => {
    token = localStorage.getItem('access_token')
    setToken(token ?? '')
    if(!token){
      router.push('/login');
    } else {
      

    }
  }, [router]);
  const [ userToken, setToken ] = useState(token ?? '')

  return (
    <div className="flex flex-col items-center pt-1">
    <div className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl w-full">
      <div className="flex flex-col space-y-4 lg:w-1/2 w-full">
        <h1 className="text-5xl font-bold">
        Мэргэжлийн түвшинд хиймэл оюун ухаанар таны зурагыг үүсгэнэ
        </h1>
        <p className="text-gray-600 text-lg">
        Хаана ч ашиглаж болох зурагаа үүсгэж цаг зав мөнгөө хэмнэ!
        </p>
        <div className="flex flex-col space-y-2">
        {userToken != null ? (
              <Link href="/faceswap">
                <Button className="w-full lg:w-1/2 bg-blue-600 text-white rounded-xl">Зураг үүсгэх</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="w-full lg:w-1/2 bg-blue-600 text-white rounded-xl">Нэвтрэх</Button>
              </Link>
            )}
        </div>
      </div>
      <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
        <img
          src={hero.src}
          alt="AI Headshot Illustration"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
    </div>
     <ExplainerSection />
    {/* <PricingSection />  */}
  </div>
  );
}
