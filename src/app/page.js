"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) {
      router.replace("/overview");
    } else {
      router.push(`/login`);
    }
  }, [router]);

  return null;
}
