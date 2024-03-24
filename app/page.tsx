'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Dropzone from "@/component/Dropzone";
import Generate from "@/component/Generate";
import Link from "next/link";
import hero from "/public/hero.png";
// import { Button } from "@radix-ui/themes";
import ExplainerSection from "@/component/ExplainerSection";
import { Button } from "@/component/ui/button";


function useHover() {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => setIsHovering(false);

  return { isHovering, onMouseEnter, onMouseLeave };
}

export default function Home() {
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
          <Link href="/faceswap">
            <Button className="w-full lg:w-1/2 bg-blue-600 text-white rounded-xl">Зураг үүсгэх</Button>
          </Link>
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
