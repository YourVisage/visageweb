"use client";

import { useEffect } from "react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage.getItem("access_token") !== "undefined") {
      const tokenString = localStorage.getItem("access_token");
      const token = tokenString !== null ? JSON.parse(tokenString) : null;

      if (token == null) {
          router.push("/login");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Spin fullscreen tip="Loading" size="large" />
    </main>
  );
}